/* global WebSocket */

import { EventEmitter } from 'events';
import { api } from '@replit/protocol';
import { Channel } from './channel';
import { EIOCompat } from './EIOCompat';
import { ClientCloseReason, ChannelCloseReason } from './closeReasons';

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
  public static ClientCloseReason = ClientCloseReason;

  public connectionState: ConnectionState;

  private token: string | null;

  private ws: WebSocket | null;

  private channels: {
    [id: number]: Channel;
  };

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

    if (this.ws && (this.ws.readyState === 0 || this.ws.readyState === 1)) {
      const error = new Error('Client already connected to an active websocket connection');

      this.debug({ type: 'breadcrumb', message: 'error', data: error.message });
      throw error;
    }

    const completeOptions: Required<ConnectOptions> = {
      token: options.token,
      urlOptions: options.urlOptions || {
        secure: false,
        host: 'eval.repl.it',
        port: '80',
      },
      timeout: options.timeout || null,
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore: EIOCompat is compatible with the WebSocket api but
      // lib.dom.d.ts defines WebSockets in a weird way that is causing errors
      WebSocketClass: options.polling ? EIOCompat : getWebSocketClass(options),
      polling: !!options.polling,
    };

    this.connectionState = ConnectionState.CONNECTING;

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

    const chan0 = this.getChannel(0);
    // avoid warnings on listener count
    chan0.setMaxListeners(chan0.getMaxListeners() + 1);
    // Not using Channel.request here because we want to
    // resolve the response synchronously. We can receive
    // openChanRes and a command on the requested channel
    // in a single tick, using promises here would causes us to
    // handle the incoming command before openChanRes, leading to errors
    chan0.send({
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

      chan0.setMaxListeners(chan0.getMaxListeners() - 1);
      chan0.off('command', onResponse);
    };

    chan0.on('command', onResponse);

    return channel;
  };

  /**
   * Closes the connection.
   * - If `connect` was called and not settled it will also reject the promise
   * - If there's an open WebSocket connection it will be closed
   * - Any open channels or channel requests are closed
   */
  public close = () => {
    this.debug({ type: 'breadcrumb', message: 'user close' });

    this.onClose({ closeReason: ClientCloseReason.Intentional });
  };

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

  /** Start a ping<>pong for debugging and latency stats */
  public startPing = () => {
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
      case 'closeChanRes':
        if (cmd.closeChanRes == null) {
          throw new Error('Expected closeChanRes');
        }

        if (cmd.closeChanRes.id == null || cmd.closeChanRes.status == null) {
          throw new Error(
            `Expected id and status in closeChanRes, got ${cmd.closeChanRes.id} and ${cmd.closeChanRes.status}`,
          );
        }

        this.handleCloseChannel(cmd.closeChanRes.id, {
          initiator: 'channel',
          closeStatus: cmd.closeChanRes.status,
        });

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

  private handleCloseChannel = (id: number, reason: ChannelCloseReason) => {
    this.debug({
      type: 'breadcrumb',
      message: 'handleCloseChannel',
      data: { id, reason },
    });

    this.channels[id].onClose(reason);

    delete this.channels[id];
  };

  private onClose = (closeResult: CloseResult) => {
    this.cleanupSocket();

    Object.keys(this.channels).forEach((id) => {
      this.handleCloseChannel(Number(id), {
        initiator: 'client',
        clientCloseReason: closeResult.closeReason,
      });
    });

    if (this.connectionState !== ConnectionState.DISCONNECTED) {
      this.emit('close', closeResult);
    }

    this.connectionState = ConnectionState.DISCONNECTED;
  };

  private cleanupSocket = () => {
    const { ws } = this;

    if (!ws) {
      return;
    }

    this.ws = null;

    ws.onmessage = null;
    ws.onclose = null;

    if (ws.readyState === 0 || ws.readyState === 1) {
      this.debug({
        type: 'breadcrumb',
        message: 'wsclose',
      });

      ws.close();
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
    this.ws = ws;

    /**
     * success is only called when we get
     * ContainerState.READY command
     */
    let onSuccess: () => void;
    /**
     * Failure can happen due to a number of reasons
     * 1- Abrupt socket closure
     * 2- Timedout connection request
     * 3- ContainerState.SLEEP command
     * 4- Use calling `close` before we connect
     */
    let onFailed: (err: Error) => void;

    /**
     * Abrupt socket closures should report failed
     */
    ws.onclose = () => {
      onFailed(new Error('WebSocket closed before we got READY'));
    };

    /**
     * If the user specifies a timeout we will short circuit
     * the connection if we don't get READY from the container
     * within the specified timeout.
     *
     * Every time we get a message we reset the connection timeout
     * this is because it signifies that the connection will eventually work.
     */
    let resetTimeout = () => {};
    let cancelTimeout = () => {};
    if (timeout) {
      let timeoutId: NodeJS.Timer; // Can also be of type `number` in the browser

      cancelTimeout = () => clearTimeout(timeoutId);

      resetTimeout = () => {
        cancelTimeout();

        timeoutId = setTimeout(() => {
          this.debug({ type: 'breadcrumb', message: 'connect timeout' });

          onFailed(new Error('timeout'));
        }, timeout);
      };
    }

    /** Listen to incoming commands
     * Every time we get a message we reset the connection timeout (if it exists)
     * this is because it signifies that the connection will eventually work.
     *
     * If we ever get a ContainterState READY we can officially
     * say that the connection is successful and we resolve the returned promise.
     *
     * If we ever get ContainterState SLEEP it means that something went wrong
     * and connection should be dropped
     */
    const onCommand = (cmd: api.Command) => {
      // Everytime we get a message on channel0
      // we will reset the timeout
      resetTimeout();

      if (cmd.containerState == null) {
        return;
      }

      if (cmd.containerState.state == null) {
        onFailed(new Error('Got containterState but state was not defined'));

        return;
      }

      const { state } = cmd.containerState;

      this.debug({
        type: 'breadcrumb',
        message: 'containerState',
        data: state,
      });

      const StateEnum = api.ContainerState.State;

      switch (state) {
        case StateEnum.READY:
          onSuccess();

          if (this.getChannel(0).isOpen === false) {
            this.getChannel(0).onOpen(0, api.OpenChannelRes.State.CREATED, this.send);
          }

          break;

        case StateEnum.SLEEP:
          onFailed(new Error('Got SLEEP as container state'));

          break;

        default:
      }
    };
    const chan0 = this.getChannel(0);
    chan0.on('command', onCommand);

    /**
     * The user might call `close` before we even connect
     * we wanna make sure we reject the promise if that happens
     * so we monkey patch our own `close` function ;)
     */
    const originalClose = this.close;
    this.close = () => {
      this.debug({ type: 'breadcrumb', message: 'user close' });
      onFailed(new Error('You called `Client.close` before you connected'));
    };

    /**
     * We call this as a cleanup method after we settle the connection
     */
    const onFinally = () => {
      cancelTimeout();
      this.close = originalClose;
      chan0.off('command', onCommand);
    };

    return new Promise((_res, _rej) => {
      onSuccess = () => {
        onFinally();

        // Update socket closure to do something else
        ws.onclose = (closeEvent: CloseEvent) => {
          this.debug({
            type: 'breadcrumb',
            message: 'wsclose',
            data: {
              closeReason: closeEvent ? closeEvent.reason : undefined,
            },
          });

          this.onClose({
            closeReason: ClientCloseReason.Disconnected,
            wsCloseEvent: closeEvent,
          });
        };

        _res();

        this.debug({ type: 'breadcrumb', message: 'connected!' });
      };

      onFailed = (err) => {
        onFinally();

        _rej(err);

        this.cleanupSocket();

        this.debug({ type: 'breadcrumb', message: 'connect failed' });
      };
    });
  };
}

type CloseResult =
  | {
      closeReason: ClientCloseReason.Intentional;
    }
  | {
      closeReason: ClientCloseReason.Disconnected;
      wsCloseEvent: CloseEvent;
    };

/**
 * Emitted when there's an error while the channel is opening
 * @asMemberOf Channel
 * @event
 */
declare function close(c: CloseResult): void;

export declare interface Client extends EventEmitter {
  on(event: 'close', listener: typeof close): this;
  addListener(event: 'close', listener: typeof close): this;

  once(event: 'close', listener: typeof close): this;

  prependListener(event: 'close', listener: typeof close): this;

  prependOnceListener(event: 'close', listener: typeof close): this;

  off(event: 'close', listener: typeof close): this;
  removeListener(event: 'close', listener: typeof close): this;

  emit(event: 'close', ...args: Parameters<typeof close>): boolean;

  removeAllListeners(event?: 'close'): this;

  eventNames(): Array<'close'>;
}
