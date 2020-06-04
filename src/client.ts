/* global WebSocket */

import { EventEmitter } from 'events';
import { api } from '@replit/protocol';
import { Channel, ChannelOptions, ChanReqFn, RequestResult } from './channel';
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
  token: () => Promise<string>;
  urlOptions: UrlOptions;
  polling: boolean;
  timeout: number | null;
  reconnect: boolean;
  WebSocketClass?: typeof WebSocket;
  maxConnectRetries?: number;
}

interface ConnectArgs extends Partial<Omit<ConnectOptions, 'token'>> {
  token: () => Promise<string>;
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

  private chan0Req: ChanReqFn | null;

  private pendingChannels: Array<Channel>;

  private channels: {
    [id: number]: Channel;
  };

  private debug: DebugFunc;

  private retryTimer: ReturnType<typeof setTimeout> | null;

  private connectTrys: number;

  private connectToken: string | null;

  private isOpenningChan0: boolean;

  static getConnectionStr(token: string, urlOptions: UrlOptions) {
    const { secure, host, port } = urlOptions;

    return `ws${secure ? 's' : ''}://${host}:${port}/wsv2/${token}`;
  }

  constructor(debug: DebugFunc = () => {}) {
    super();

    this.ws = null;
    this.channels = {};
    this.connectOptions = null;
    this.chan0Req = null;
    this.connectionState = ConnectionState.DISCONNECTED;
    this.debug = debug;
    this.pendingChannels = [];
    this.connectTrys = 0;
    this.retryTimer = null;
    this.connectToken = null;
    this.isOpenningChan0 = false;

    this.debug({ type: 'breadcrumb', message: 'constructor' });
  }

  public isConnected = () => this.connectionState === ConnectionState.CONNECTED;

  /**
   * Connects to the server and and opens channel 0
   *
   * Every client automatically "has" channel 0 and can use it to open more channels.
   * See http://protodoc.turbio.repl.co/protov2 from more info
   */
  public connect = (options: ConnectArgs, chanReq: ChanReqFn) => {
    this.connectTrys += 1;
    this.debug({ type: 'breadcrumb', message: 'connect', data: { polling: options.polling } });

    if (this.connectionState !== ConnectionState.DISCONNECTED) {
      const error = new Error('Client must be disconnected to connect');

      this.debug({ type: 'breadcrumb', message: 'error', data: error.message });
      throw error;
    }

    if (!options.token) {
      const error = new Error('You must provide a token function');

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
      maxConnectRetries: 2,
      urlOptions: {
        secure: false,
        host: 'eval.repl.it',
        port: '80',
      },
      ...options,
    };

    this.connectOptions = connectOptions;
    this.chan0Req = chanReq;

    this.connectionState = ConnectionState.CONNECTING;

    const chan0 = new Channel({ chanReq });
    this.channels[0] = chan0;

    const WebSocketClass = connectOptions.polling ? EIOCompat : getWebSocketClass(connectOptions);

    connectOptions.token().then((token) => {
      if (this.connectionState !== ConnectionState.CONNECTING) {
        this.handleConnectError(new Error('Client was closed before connecting'));

        return;
      }

      const connStr = Client.getConnectionStr(token, connectOptions.urlOptions);
      const ws = new WebSocketClass(connStr);

      ws.binaryType = 'arraybuffer';
      ws.onmessage = this.onSocketMessage;
      this.ws = ws;

      /**
       * Failure can happen due to a number of reasons
       * 1- Abrupt socket closure
       * 2- Timedout connection request
       * 3- ContainerState.SLEEP command
       * 4- User calling `close` before we connect
       */
      let onFailed: (err: Error) => void;

      // eslint-disable-next-line
      // @ts-ignore
      ws.onerror = ({ error }: { error: Error }) => {
        onFailed(error);
      };

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

      /** Listen to incoming commands
       * Every time we get a message we reset the connection timeout (if it exists)
       * this is because it signifies that the connection will eventually work.
       *
       * If we ever get a ContainterState READY we can officially
       * say that the connection is successful and we open chan0 and other `chanReq`s
       *
       * If we ever get ContainterState SLEEP it means that something went wrong
       * and connection should be dropped
       */
      const dispose = chan0.onCommand((cmd: api.Command) => {
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
            // Once we're READY we can stop listening to incoming commands
            dispose();

            if (this.retryTimer) {
              clearTimeout(this.retryTimer);
            }
            cancelTimeout();

            // To
            this.isOpenningChan0 = true;

            chan0.handleOpen({
              id: 0,
              state: api.OpenChannelRes.State.CREATED,
              send: this.send,
            });

            this.isOpenningChan0 = false;

            this.connectToken = token;

            this.handleConnect();

            break;

          case StateEnum.SLEEP:
            onFailed(new Error('Got SLEEP as container state'));

            break;

          default:
        }
      });

      onFailed = (error: Error) => {
        // TODO: Details
        // Should this also handle a fall back to polling?
        if (this.connectTrys <= connectOptions.maxConnectRetries) {
          this.retryTimer = setTimeout(() => {
            this.connectionState = ConnectionState.DISCONNECTED;
            this.connect(connectOptions, chanReq);
          }, getNextRetryDelay(this.connectTrys));

          return;
        }

        cancelTimeout();
        dispose();

        this.handleConnectError(error);
      };
    });
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

    if (this.isOpenningChan0) {
      throw new Error('Cannot call close while connecting');
    }

    // TODO: wrap in `setTimeout` to make async? Would need to do this
    // to support calling `close` synchronously in `connect` callback
    // This is only an issue with channel 0 since it never closes. Other
    // channels close asynchronously so calling close inside `openChannel`
    // is fine sice the callback function exits.
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
    return this.connectToken;
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
  private handleConnect = () => {
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
    // eslint-disable-next-line
    // @ts-ignore seems like a type issue related to browser/node env
    this.ws.onerror = onClose;

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

    this.connectToken = null;

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

    if (closeResult.closeReason === ClientCloseReason.Intentional) {
      // Client is done being used
      this.removeAllListeners();
      return;
    }

    if (!this.connectOptions) {
      throw new Error('Expected connectOptions');
    }

    if (!this.chan0Req) {
      throw new Error('Expected chan0Req');
    }

    if (this.connectOptions.reconnect) {
      this.debug({
        type: 'breadcrumb',
        message: 'reconnecting',
      });

      this.connect(this.connectOptions, this.chan0Req);
    }
  };

  private handleConnectError = (err: Error) => {
    this.connectToken = null;

    [...this.pendingChannels, ...Object.values(this.channels)].forEach((channel) => {
      channel.handleError(err);
    });

    this.connectionState = ConnectionState.DISCONNECTED;
    this.cleanupSocket();

    this.debug({ type: 'breadcrumb', message: 'connect failed', data: err.message });
  };

  private cleanupSocket = () => {
    const { ws } = this;

    if (!ws) {
      return;
    }

    this.ws = null;

    if (ws.readyState === 0 || ws.readyState === 1) {
      this.debug({
        type: 'breadcrumb',
        message: 'wsclose',
      });

      ws.close();
    }

    ws.onmessage = null;
    ws.onclose = null;
    ws.onerror = null;
  };
}
