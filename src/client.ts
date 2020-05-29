/* global WebSocket */

import { EventEmitter } from 'events';
import { api } from '@replit/protocol';
import { Channel, ChannelOptions, ChanReqFn, ChanReqRes, RequestResult } from './channel';
import { EIOCompat } from './EIOCompat';
import { ClientCloseReason } from './closeReasons';

type CloseResult =
  | {
      closeReason: ClientCloseReason.Intentional;
    }
  | {
      closeReason: ClientCloseReason.Disconnected;
      wsEvent: CloseEvent | ErrorEvent;
    };

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
  urlOptions: UrlOptions;
  polling: boolean;
  timeout: number | null;
  reconnect: boolean;
  WebSocketClass?: typeof WebSocket;
}

interface ConnectArgs extends Partial<Omit<ConnectOptions, 'token'>> {
  token: string;
}

const backoffFactor = 1.7;
const maxBackoff = 15000;
function getNextRetryDelay(retryNumber: number) {
  const randomMs = Math.floor(Math.random() * 500);
  // TODO: why no Math.pow?
  // eslint-disable-next-line no-restricted-properties
  const backoff = Math.pow(backoffFactor, retryNumber) * 1000;

  return Math.min(backoff, maxBackoff) + randomMs;
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

  private ws: WebSocket | null;

  private connectOptions: ConnectOptions | null;

  private pendingChannels: Array<Channel>;

  private channels: {
    [id: number]: Channel;
  };

  private debug: DebugFunc;

  private retryTimer: ReturnType<typeof setTimeout> | null;

  private connectTrys: number;

  static getConnectionStr(token: string, urlOptions: UrlOptions) {
    const { secure, host, port } = urlOptions;

    return `ws${secure ? 's' : ''}://${host}:${port}/wsv2/${token}`;
  }

  constructor(debug: DebugFunc = () => {}) {
    super();

    this.ws = null;
    this.channels = {
      // Every client automatically "has" channel 0 and can use it to open more channels.
      // See http://protodoc.turbio.repl.co/protov2 from more info
      0: new Channel({
        // Once thi channel connects the client is connected
        chanReq: this.handleConnect,
      }),
    };
    this.connectOptions = null;
    this.connectionState = ConnectionState.DISCONNECTED;
    this.debug = debug;
    this.pendingChannels = [];
    this.connectTrys = 0;
    this.retryTimer = null;

    this.debug({ type: 'breadcrumb', message: 'constructor' });
  }

  public isConnected = () => this.connectionState === ConnectionState.CONNECTED;

  /**
   * `listener` is called every time client connects
   */
  public onConnect = (listener: (chan0: Channel) => void) => {
    this.on('connect', listener);

    return () => this.removeListener('connect', listener);
  };

  /**
   * `listener` is called every time client disconnects
   */
  public onClose = (listener: (closeResult: CloseResult) => void) => {
    this.on('close', listener);

    return () => this.removeListener('close', listener);
  };

  /**
   * `listener` is called every time client has an error connecting
   */
  public onError = (listener: (error: Error) => void) => {
    this.on('error', listener);

    return () => this.removeListener('error', listener);
  };

  /**
   * Connects to the server and primes the client to start sending data
   * - Calls `onConnect` with open chan0 once connected
   * -
   */
  public connect = (options: ConnectArgs) => {
    this.connectTrys += 1;
    this.debug({ type: 'breadcrumb', message: 'connect', data: { polling: options.polling } });

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

    const connectOptions = {
      polling: false,
      timeout: 10000,
      reconnect: false,
      urlOptions: {
        secure: false,
        host: 'eval.repl.it',
        port: '80',
      },
      ...options,
    };

    this.connectOptions = connectOptions;

    this.connectionState = ConnectionState.CONNECTING;

    const WebSocketClass = connectOptions.polling ? EIOCompat : getWebSocketClass(connectOptions);

    const connStr = Client.getConnectionStr(connectOptions.token, connectOptions.urlOptions);
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
     * 4- User calling `close` before we connect
     */
    let onFailed: (err: Error) => void;

    /**
     * Abrupt socket closures should report failed
     */
    ws.onclose = () => {
      onFailed(new Error('WebSocket closed before we got READY'));
    };

    ws.onerror = () => {
      onFailed(new Error('WebSocket errored before we got READY'));
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
    if (options.timeout) {
      const { timeout } = options;
      let timeoutId: ReturnType<typeof setTimeout>; // Can also be of type `number` in the browser

      cancelTimeout = () => clearTimeout(timeoutId);

      resetTimeout = () => {
        cancelTimeout();

        timeoutId = setTimeout(() => {
          this.debug({ type: 'breadcrumb', message: 'connect timeout' });

          onFailed(new Error('timeout'));
        }, timeout);
      };
    }

    const chan0 = this.getChannel(0);

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

          chan0.handleOpen({
            id: 0,
            state: api.OpenChannelRes.State.CREATED,
            send: this.send,
          });

          break;

        case StateEnum.SLEEP:
          onFailed(new Error('Got SLEEP as container state'));

          break;

        default:
      }
    };

    const dispose = chan0.onCommand(onCommand);

    onSuccess = () => {
      if (this.retryTimer) {
        clearTimeout(this.retryTimer);
      }
      cancelTimeout();
      dispose();
    };

    onFailed = (error: Error) => {
      // TODO: Details
      // What should max retries be?
      // Should it be configurable?
      // Should this also handle a fall back to polling?
      if (this.connectTrys < 2) {
        this.retryTimer = setTimeout(() => {
          this.connectionState = ConnectionState.DISCONNECTED;
          this.connect(connectOptions);
        }, getNextRetryDelay(this.connectTrys));

        return;
      }

      cancelTimeout();
      dispose();

      this.handleConnectError(error);
    };
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
   * @param an optional existing channel to reconnect (used internally)
   */
  public openChannel = (options: ChannelOptions, chanReq: ChanReqFn) => {
    const chan0 = this.getChannel(0);
    const channel = new Channel({ chanReq, options });

    if (chan0.isOpen) {
      // We're connected, open channel
      this.handleOpenChannel(channel);
    } else {
      this.pendingChannels.push(channel);
    }

    return () => channel.close();
  };

  private handleOpenChannel = (channel: Channel) => {
    if (!channel.options) {
      throw new Error('Expected options');
    }

    const { options } = channel;

    let { action } = options;
    if (!action) {
      action =
        options.name == null
          ? api.OpenChannel.Action.CREATE
          : api.OpenChannel.Action.ATTACH_OR_CREATE;
    }

    this.debug({
      type: 'breadcrumb',
      message: 'handleOpenChannel',
      data: {
        name: options.name,
        service: options.service,
        action,
      },
    });

    const chan0 = this.getChannel(0);

    chan0
      .request({
        openChan: {
          name: options.name,
          service: options.service,
          action,
        },
      })
      .then((res: RequestResult) => {
        if (this.connectionState !== ConnectionState.CONNECTED) {
          channel.handleError(new Error('Client not connected'));
        }

        if (res.channelClosed) {
          channel.handleError(new Error('Channel closed'));

          return;
        }

        if (res.openChanRes == null) {
          throw new Error('Expected openChanRes on command');
        }

        const { id, state, error } = res.openChanRes;
        this.debug({ type: 'breadcrumb', message: 'openChanres' });

        if (state === api.OpenChannelRes.State.ERROR) {
          this.debug({ type: 'breadcrumb', message: 'error', data: error });
          channel.handleError(new Error(error || 'Something went wrong'));

          return;
        }

        if (id == null || state == null) {
          throw new Error('Expected state and channel id');
        }

        if (channel.id) {
          // Remove old channel from map. It gets added back with a new id right after this block
          // This happens when client reconnects
          delete this.channels[channel.id];
        }
        this.channels[Number(id)] = channel;

        channel.handleOpen({ id, state, send: this.send });
      })
      .catch((e) => channel.handleError(e));
  };

  /**
   * Closes the connection.
   * - If `connect` was called but we didn't connect yet treat it as a connection error
   * - If there's an open WebSocket connection it will be closed
   * - Any open channels or channel requests are closed
   */
  public close = () => {
    this.debug({ type: 'breadcrumb', message: 'user close' });

    if (!this.connectOptions) {
      throw new Error('Must call client.connect before closing');
    }

    this.handleClose({ closeReason: ClientCloseReason.Intentional });
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
    if (!this.connectOptions) {
      return null;
    }

    return this.connectOptions.token;
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
    this.getChannel(cmd.channel).handleCommand(cmd);

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

        this.debug({
          type: 'breadcrumb',
          message: 'handleCloseChannel',
          data: {
            id: cmd.closeChanRes.id,
            reason: cmd.closeChanRes.status,
          },
        });

        this.channels[Number(cmd.closeChanRes.id)].handleClose({
          initiator: 'channel',
          closeStatus: cmd.closeChanRes.status,
        });

        break;
      default:
    }
  };

  /**
   * Called when chan0 connects. Opens all other required channels
   */
  private handleConnect = (res: ChanReqRes) => {
    if (res.error) {
      /**
       * This should never happen since we either
       * 1. successfully opon chan0 once READY
       * 2. treat an error as a client disconnect
       */
      throw res.error;
    }

    /**
     * Set back to 0 for the next time the client connects
     */
    this.connectTrys = 0;

    this.connectionState = ConnectionState.CONNECTED;

    this.debug({ type: 'breadcrumb', message: 'connected!' });

    if (!this.ws) {
      throw new Error('Expected Websocket instance');
    }

    // Update socket closure to do something else
    const onClose = (event: CloseEvent | ErrorEvent) => {
      this.debug({
        type: 'breadcrumb',
        message: 'wsclose',
        data: {
          event,
        },
      });

      this.handleClose({
        closeReason: ClientCloseReason.Disconnected,
        wsEvent: event,
      });
    };

    this.ws.onclose = onClose;

    // Once connected treat any future error as a close event
    // @ts-ignore seems like a type issue related to browser/node env
    this.ws.onerror = onClose;

    this.emit('connect', res.channel);

    // Pending channels exists if `openChannel` was called before client connects
    while (this.pendingChannels.length) {
      const channel = this.pendingChannels.shift();

      if (!channel) {
        throw new Error('Expected channel');
      }

      if (channel.options) {
        this.handleOpenChannel(channel);
      }
    }

    // Open existing channels when we connect
    Object.values(this.channels).forEach((channel) => {
      if (channel.options) {
        this.handleOpenChannel(channel);
      }
    });
  };

  private handleClose = (closeResult: CloseResult) => {
    this.cleanupSocket();

    if (this.retryTimer) {
      // Client was closed while reconnecting
      clearTimeout(this.retryTimer);
    }

    Object.values(this.channels).forEach((channel) => {
      if (channel.isOpen) {
        channel.handleClose({
          initiator: 'client',
          clientCloseReason: closeResult.closeReason,
        });
      }
    });

    if (this.connectionState !== ConnectionState.DISCONNECTED) {
      this.emit('close', closeResult);
    }

    this.connectionState = ConnectionState.DISCONNECTED;

    if (closeResult.closeReason == ClientCloseReason.Intentional) {
      // Client is done being used
      this.removeAllListeners();
      return;
    }

    if (!this.connectOptions) {
      throw new Error('Expected connectOptions');
    }

    if (this.connectOptions.reconnect) {
      this.debug({
        type: 'breadcrumb',
        message: 'reconnecting',
      });

      this.connect(this.connectOptions);
    }
  };

  private handleConnectError = (err: Error) => {
    Object.values(this.channels).forEach((channel) => {
      channel.handleError(err);
    });

    this.connectionState = ConnectionState.DISCONNECTED;
    this.cleanupSocket();

    this.emit('error', err);

    this.debug({ type: 'breadcrumb', message: 'connect failed', data: err.message });
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
}
