/* global WebSocket */

import { EventEmitter } from 'events';
import { api } from '@replit/protocol';
import { Channel } from './channel';
import { createDeferred, Deferred } from './deferred';
import { EIOCompat } from './EIOCompat';

enum ConnectionState {
  CONNECTING = 0,
  CONNECTED = 1,
  DISCONNECTED = 2,
}

interface UrlOptions {
  secure: boolean;
  host: string;
  port: string;
}

interface TxRx {
  direction: 'in' | 'out';
  cmd: api.Command;
}
type DebugLog =
  | {
      type: 'breadcrumb';
      message: string;
      data?: unknown;
    }
  | {
      type: 'log';
      log: TxRx;
    }
  | {
      type: 'ping';
      latency: number;
    };
type DebugFunc = (log: DebugLog) => void;

interface ConnectOptions {
  token: string;
  urlOptions?: UrlOptions;
  polling?: boolean;
  timeout?: number | null;
  WebSocketClass?: typeof WebSocket;
}

/**
 * @hidden
 */
const isWebSocket = (w: typeof WebSocket | unknown) => {
  if (typeof w !== 'object' && typeof w !== 'function') {
    return false;
  }

  if (!w) {
    return false;
  }

  return 'OPEN' in w && (w as WebSocket).OPEN === 1;
};

/**
 * @hidden
 */
const getWebSocketClass = (options: ConnectOptions) => {
  if (options.WebSocketClass) {
    if (!isWebSocket(options.WebSocketClass)) {
      throw new Error('Passed in WebSocket does not look like a standard WebSocket');
    }

    return options.WebSocketClass;
  }

  if (typeof WebSocket !== 'undefined') {
    if (!isWebSocket(WebSocket)) {
      throw new Error('Global WebSocket does not look like a standard WebSocket');
    }

    return WebSocket;
  }

  throw new Error('Please pass in a WebSocket class, add it to global, or use the polling option');
};

export class Client extends EventEmitter {
  public containerState: api.ContainerState.State | null;

  public connectionState: ConnectionState;

  private token: string | null;

  private ws: WebSocket | null;

  private channels: {
    [id: number]: Channel;
  };

  private deferredReady: Deferred<void> | null;

  private debug: DebugFunc;

  private didConnect: boolean;

  static getConnectionStr(token: string, urlOptions: UrlOptions) {
    const { secure, host, port } = urlOptions;

    return `ws${secure ? 's' : ''}://${host}:${port}/wsv2/${token}`;
  }

  constructor(debug: DebugFunc = () => {}) {
    super();

    this.ws = null;
    this.channels = {
      0: new Channel(),
    };
    this.deferredReady = null;
    this.containerState = null;
    this.token = null;
    this.connectionState = ConnectionState.DISCONNECTED;
    this.debug = debug;
    this.didConnect = false;

    this.debug({ type: 'breadcrumb', message: 'constructor' });
  }

  public isConnected = () => this.connectionState === ConnectionState.CONNECTED;

  /**
   * Connects to the server and primes the client to start sending data
   * @returns it returns a promise that is resolved when the server is ready (sends cotainer state)
   */
  public connect = async (options: ConnectOptions): Promise<void> => {
    this.debug({ type: 'breadcrumb', message: 'connect', data: { polling: options.polling } });

    if (this.didConnect) {
      // We don't want to allow connections if we ever connected
      const error = new Error(
        'Reconnecting using the same client after it connected once is not allowed',
      );

      this.debug({ type: 'breadcrumb', message: 'error', data: error.message });
      throw error;
    }

    if (this.connectionState !== ConnectionState.DISCONNECTED) {
      const error = new Error('Client must be disconnected to connect');

      this.debug({ type: 'breadcrumb', message: 'error', data: error.message });
      throw error;
    }

    if (!options.token) {
      const error = new Error('You must provide a token');

      this.debug({ type: 'breadcrumb', message: 'error', data: error.message });

      throw error;
    }

    this.connectionState = ConnectionState.CONNECTING;

    if (this.ws && (this.ws.readyState === 0 || this.ws.readyState === 1)) {
      const error = new Error('Client already connected to an active websocket connection');

      this.debug({ type: 'breadcrumb', message: 'error', data: error.message });
      throw error;
    }

    const completeOptions: Required<ConnectOptions> = {
      token: options.token,
      urlOptions: options.urlOptions || { secure: false, host: 'eval.repl.it', port: '80' },
      timeout: options.timeout || null,
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore: EIOCompat is compatible with the WebSocket api but
      // lib.dom.d.ts defines WebSockets in a weird way that is causing errors
      WebSocketClass: options.polling ? EIOCompat : getWebSocketClass(options),
      polling: !!options.polling,
    };

    try {
      await this.tryConnect(completeOptions);
    } catch (e) {
      this.connectionState = ConnectionState.DISCONNECTED;

      this.debug({ type: 'breadcrumb', message: 'error', data: e.message });
      throw e;
    }

    this.connectionState = ConnectionState.CONNECTED;
    this.didConnect = true;
  };

  /**
   * Opens a service channel.
   * If action is specified the action will be sent with the request
   * If action is not specfied it will:
   *    1- if name is specified, it will send a request with [[api.OpenChannel.Action.ATTACH_OR_CREATE]]
   *    2- if name is not specified, it will send a request with [[api.OpenChannel.Action.CREATE]]
   *
   * http://protodoc.turbio.repl.co/protov2#opening-channels
   * @param name Channel name (can be anything)
   * @param service One of goval's services
   * @param action [[api.OpenChannel.Action]]
   */
  public openChannel = ({
    name,
    service,
    action,
  }: {
    name?: string;
    service: string;
    action?: api.OpenChannel.Action;
  }): Channel => {
    let ac = action;
    if (!ac) {
      ac = name == null ? api.OpenChannel.Action.CREATE : api.OpenChannel.Action.ATTACH_OR_CREATE;
    }

    this.debug({
      type: 'breadcrumb',
      message: 'openChannel',
      data: {
        name,
        service,
        action: ac,
      },
    });

    const channel = new Channel();

    // Random base36 int
    const ref = Number(
      Math.random()
        .toString()
        .split('.')[1],
    ).toString(36);
    // Not using Channel.request here because we want to
    // resolve the response synchronously. We can receive
    // openChanRes and a command on the requested channel
    // in a single tick, using promises here would causes us to
    // handle the incoming command before openChanRes, leading to errors
    this.getChannel(0).send({
      ref,
      openChan: {
        name,
        service,
        action: ac,
      },
    });

    const onResponse = (cmd: api.Command) => {
      if (ref !== cmd.ref) {
        return;
      }

      if (cmd.openChanRes == null) {
        throw new Error('Expected openChanRes on command');
      }

      this.handleOpenChanRes(channel, cmd.openChanRes);

      this.getChannel(0).off('command', onResponse);
    };

    this.getChannel(0).on('command', onResponse);

    return channel;
  };

  /**
   * Closes the socket connection and handles cleanup
   */
  public close = () => this.onClose({ expected: true });

  /** Gets a channel by Id */
  public getChannel(id: number): Channel {
    const chan = this.channels[id];

    this.debug({
      type: 'breadcrumb',
      message: 'getChannel',
      data: {
        id,
      },
    });

    if (!chan) {
      const error = new Error(`No channel with number ${id}`);
      this.debug({ type: 'breadcrumb', message: 'error', data: error.message });

      throw error;
    }

    return chan;
  }

  /** Gets the token that was used to connect */
  public getToken(): string | null {
    if (!this.token) {
      return null;
    }

    return this.token;
  }

  /** Sets a logging/debugging function */
  public setDebugFunc(debugFunc: DebugFunc): void {
    this.debug = debugFunc;
  }

  private send = (cmd: api.Command) => {
    this.debug({ type: 'log', log: { direction: 'out', cmd } });

    const cmdBuf = api.Command.encode(cmd).finish();
    const buffer = cmdBuf.buffer.slice(cmdBuf.byteOffset, cmdBuf.byteOffset + cmdBuf.length);

    if (this.ws == null) {
      throw new Error('Calling send on a closed client');
    }

    this.ws.send(buffer);
  };

  private onSocketMessage = ({ data }: MessageEvent) => {
    const d = new Uint8Array(data);
    const cmd = api.Command.decode(d);

    this.debug({ type: 'log', log: { direction: 'in', cmd } });

    // Pass it to the right channel
    this.getChannel(cmd.channel).onCommand(cmd);

    switch (cmd.body) {
      case 'containerState':
        if (cmd.containerState == null || cmd.containerState.state == null) {
          const err = new Error('Expected container state to have state, got null or undefined');

          if (this.deferredReady) {
            this.deferredReady.reject(err);
            return;
          }

          this.debug({ type: 'breadcrumb', message: 'error', data: err.message });
          throw err;
        }

        this.debug({
          type: 'breadcrumb',
          message: 'containerState',
          data: this.containerState,
        });

        this.containerState = cmd.containerState.state;

        if (this.containerState === api.ContainerState.State.READY) {
          if (this.deferredReady) {
            this.deferredReady.resolve();
            this.deferredReady = null;
          }

          if (this.getChannel(0).isOpen === false) {
            this.getChannel(0).onOpen(0, api.OpenChannelRes.State.CREATED, this.send);
          }
        }

        if (this.containerState === api.ContainerState.State.SLEEP) {
          this.onClose({ expected: false });
        }

        break;

      case 'closeChanRes':
        if (cmd.closeChanRes == null) {
          throw new Error('Expected closeChanRes');
        }

        this.handleCloseChannel(cmd.closeChanRes);

        break;
      default:
    }
  };

  private handleOpenChanRes = (channel: Channel, { id, state, error }: api.IOpenChannelRes) => {
    this.debug({ type: 'breadcrumb', message: 'openChanres' });

    if (state === api.OpenChannelRes.State.ERROR) {
      this.debug({ type: 'breadcrumb', message: 'error', data: error });

      channel.onOpenError({ error });

      return;
    }

    if (id == null || state == null) {
      throw new Error('Expected state and channel id');
    }

    this.channels[id] = channel;
    channel.onOpen(id, state, this.send);
  };

  private handleCloseChannel = ({ id, status }: api.ICloseChannelRes) => {
    this.debug({
      type: 'breadcrumb',
      message: 'handleCloseChannel',
      data: { id, status },
    });

    if (id == null) {
      throw new Error('Closing channel with no id?');
    }

    this.channels[id].onClose({ id, status });

    delete this.channels[id];
  };

  private onClose = ({ closeEvent, expected }: { closeEvent?: CloseEvent; expected: boolean }) => {
    this.connectionState = ConnectionState.DISCONNECTED;
    this.containerState = null;

    this.debug({
      type: 'breadcrumb',
      message: 'close',
      data: {
        expected,
        closeReason: closeEvent ? closeEvent.reason : undefined,
      },
    });

    if (this.ws) {
      this.ws.onmessage = null;
      this.ws.onclose = null;

      if (this.ws.readyState === 0 || this.ws.readyState === 1) {
        this.debug({
          type: 'breadcrumb',
          message: 'wsclose',
          data: {
            expected,
            closeReason: closeEvent ? closeEvent.reason : undefined,
          },
        });

        this.ws.close();
      }

      this.ws = null;
    }

    if (this.didConnect) {
      // Only close the channels if we ever connected
      // so that we can retry without losing queued up
      // messages.
      Object.keys(this.channels).forEach((id) => {
        this.handleCloseChannel({ id: Number(id) });
      });
    }

    if (this.deferredReady) {
      this.deferredReady.reject(new Error('Connection closed before the server was ready'));
      this.deferredReady = null;
    }

    this.emit('close', { closeEvent, expected });
  };

  private onSocketClose = (closeEvent: CloseEvent) => {
    if (this.connectionState !== ConnectionState.DISCONNECTED) {
      this.onClose({
        closeEvent,
        expected: false,
      });
    }
  };

  private tryConnect = async ({
    token,
    urlOptions,
    polling,
    timeout,
    WebSocketClass,
  }: Required<ConnectOptions>) => {
    this.debug({ type: 'breadcrumb', message: 'connect internal', data: { polling } });

    if (this.connectionState === ConnectionState.DISCONNECTED) {
      throw new Error('closed while connecting');
    }

    this.token = token;

    const connStr = Client.getConnectionStr(token, urlOptions);

    const ws = new WebSocketClass(connStr);

    ws.binaryType = 'arraybuffer';

    ws.onmessage = this.onSocketMessage;
    ws.onclose = this.onSocketClose;
    this.ws = ws;

    this.deferredReady = createDeferred();

    const rej = this.deferredReady.reject;

    let timeoutId: NodeJS.Timer;
    if (timeout != null) {
      timeoutId = setTimeout(() => {
        this.debug({ type: 'breadcrumb', message: 'timeout' });

        if (this.deferredReady) {
          rej(new Error('timeout'));
          this.deferredReady = null;
        }

        this.close();
      }, timeout);
    }

    this.deferredReady.reject = (reason) => {
      // Make sure we clear the timeout when rejecting
      clearTimeout(timeoutId);
      rej(reason);
    };

    const res = this.deferredReady.resolve;
    this.deferredReady.resolve = (v) => {
      this.debug({ type: 'breadcrumb', message: 'connected!' });
      this.startPing();

      clearTimeout(timeoutId);
      res(v);
    };

    return this.deferredReady.promise;
  };

  private startPing = () => {
    const chan0 = this.getChannel(0);
    let pingTime = Date.now();

    const ping = () => {
      if (chan0.closed) {
        return;
      }

      pingTime = Date.now();
      chan0.send({ ping: {} });
    };

    chan0.on('command', (cmd) => {
      if (cmd.body === 'pong') {
        const pongTime = Date.now();
        const latency = pongTime - pingTime;

        this.debug({ type: 'ping', latency });

        // Start next ping
        setTimeout(ping, 10 * 1000);
      }
    });

    // Kick off
    ping();
  };
}
