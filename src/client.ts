import { api } from '@replit/protocol';
import { Channel, OpenChannelCb } from './channel';
import { getWebSocketClass, getNextRetryDelay } from './util/helpers';
import {
  ConnectOptions,
  ClientCloseReason,
  ChannelCloseReason,
  ChannelOptions,
  UrlOptions,
} from './types';

/**
 * The only required option is `fetchToken`, all others are optional and will use defaults
 */
interface ConnectArgs<D> extends Partial<Omit<ConnectOptions<D>, 'fetchToken'>> {
  fetchToken: ConnectOptions<D>['fetchToken'];
}

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

interface ChannelRequest {
  options: ChannelOptions;
  currentChannel: Channel | null;
  openChannelCb: OpenChannelCb;
}

export class Client {
  public static ClientCloseReason = ClientCloseReason;

  public connectionState: ConnectionState;

  private ws: WebSocket | null;

  private connectOptions: ConnectOptions;

  private chan0Cb: OpenChannelCb | null;

  private channelRequests: Array<ChannelRequest>;

  private channels: {
    [id: number]: Channel;
  };

  private debug: DebugFunc;

  private fatal: (e: Error) => void;

  private retryTimeoutId: ReturnType<typeof setTimeout> | null;

  private connectTries: number;

  private connectToken: string | null;

  /**
   * Abort controller is used so that when the user calls
   * client.close while we're fetching a token, we can be sure
   * that we don't have a `connect` call lingering around waiting
   * for a token and eventually continue on as if we still want to connect
   */
  private fetchTokenAbortController: AbortController | null;

  static getConnectionStr(token: string, urlOptions: UrlOptions) {
    const { secure, host, port } = urlOptions;

    return `ws${secure ? 's' : ''}://${host}:${port}/wsv2/${token}`;
  }

  constructor({ fatal }: { fatal: (e: Error) => void; }) {
    this.ws = null;
    this.channels = {};
    this.connectOptions = {
      polling: false,
      timeout: 10000,
      reconnect: true,
      maxConnectRetries: 2,
      urlOptions: {
        secure: false,
        host: 'eval.repl.it',
        port: '80',
      },
      fetchToken: () => Promise.reject(new Error('You must provide a fetchToken function')),
      context: null,
    };
    this.chan0Cb = null;
    this.connectionState = ConnectionState.DISCONNECTED;
    this.debug = () => {};
    this.fatal = fatal;
    this.channelRequests = [];
    this.connectTries = 0;
    this.retryTimeoutId = null;
    this.connectToken = null;
    this.fetchTokenAbortController = null;

    this.debug({ type: 'breadcrumb', message: 'constructor' });
  }

  /**
   * Starts connecting to the server and and opens channel 0
   *
   * Every client automatically "has" channel 0 and can use it to open more channels.
   * See http://protodoc.turbio.repl.co/protov2 from more info
   */
  public open = <D = any>(options: ConnectArgs<D>, cb: OpenChannelCb<D>) => {
    if (this.chan0Cb) {
      throw new Error('You must call `close` before opening the client again');
    }

    if (!options.fetchToken || typeof options.fetchToken !== 'function') {
      const error = new Error('You must provide a fetchToken function');

      this.debug({ type: 'breadcrumb', message: 'error', data: error.message });
      throw error;
    }

    this.connectOptions = {
      ...this.connectOptions,
      ...options,
    };

    this.debug({
      type: 'breadcrumb',
      message: 'open',
      data: { polling: this.connectOptions.polling },
    });

    this.chan0Cb = cb;
    this.connect();
  };

  /**
   * Opens a service channel.
   * If action is specified the action will be sent with the request
   * If action is not specfied it will:
   *    1- if name is specified, it will send a request with [[api.OpenChannel.Action.ATTACH_OR_CREATE]]
   *    2- if name is not specified, it will send a request with [[api.OpenChannel.Action.CREATE]]
   *
   * http://protodoc.turbio.repl.co/protov2#opening-channels
   */
  public openChannel = <D = any>(options: ChannelOptions, cb: OpenChannelCb<D>) => {
    const channelRequest: ChannelRequest = { options, openChannelCb: cb, currentChannel: null };
    this.channelRequests.push(channelRequest);

    if (this.connectionState === ConnectionState.CONNECTED) {
      // We're connected, open channel. Otherwise we'll open the channel once we connect
      this.handleOpenChannel(channelRequest);
    }

    return () => {
      if (channelRequest.currentChannel !== null && !channelRequest.currentChannel.closed) {
        channelRequest.currentChannel.close();
      }

      this.channelRequests = this.channelRequests.filter((cr) => cr !== channelRequest);
    };
  };

  private handleOpenChannel = (channelRequest: ChannelRequest) => {
    const { options, openChannelCb } = channelRequest;

    const { skip } = options;
    if (skip && skip(this.connectOptions.context)) {
      return;
    }

    let { action } = options;
    if (!action) {
      action =
        options.name == null
          ? api.OpenChannel.Action.CREATE
          : api.OpenChannel.Action.ATTACH_OR_CREATE;
    }

    if (channelRequest.currentChannel) {
      this.fatal(new Error('Unexpected currentChannel'));

      return;
    }

    const channel = new Channel({ openChannelCb });
    channelRequest.currentChannel = channel;

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

    // Random base36 int
    const ref = Number(Math.random().toString().split('.')[1]).toString(36);

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
        name: options.name,
        service: options.service,
        action,
      },
    });

    const dispose = chan0.onCommand((cmd: api.Command) => {
      if (ref !== cmd.ref) {
        return;
      }

      dispose();

      if (cmd.openChanRes == null) {
        this.fatal(new Error('Expected openChanRes on command'));

        return;
      }

      const { id, state, error } = cmd.openChanRes;

      this.debug({ type: 'breadcrumb', message: 'openChanres' });

      if (state === api.OpenChannelRes.State.ERROR) {
        this.debug({ type: 'breadcrumb', message: 'error', data: error });
        channel.handleError(
          new Error(error || 'Something went wrong'),
          this.connectOptions.context,
        );

        return;
      }

      if (typeof id !== 'number' || typeof state !== 'number') {
        this.fatal(new Error('Expected state and channel id'));

        return;
      }

      this.channels[id] = channel;
      channelRequest.currentChannel = channel;

      channel.handleOpen({ id, state, send: this.send, context: this.connectOptions.context });
    });
  };

  /**
   * Closes the connection.
   * - If `open` was called but we didn't connect yet treat it as a connection error
   * - If there's an open WebSocket connection it will be closed
   * - Any open channels or channel requests are closed
   */
  public close = () => {
    this.debug({ type: 'breadcrumb', message: 'user close' });

    if (!this.chan0Cb) {
      throw new Error('Must call client.connect before closing');
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

    chan0.onCommand((cmd) => {
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

  private connect = async () => {
    this.debug({
      type: 'breadcrumb',
      message: 'connecting',
      data: {
        connectionState: this.connectionState,
        connectTries: this.connectTries,
        readyState: this.ws ? this.ws.readyState : undefined,
        chan0CbExists: Boolean(this.chan0Cb),
      },
    });

    if (this.connectionState !== ConnectionState.DISCONNECTED) {
      const error = new Error('Client must be disconnected to connect');

      this.debug({ type: 'breadcrumb', message: 'error', data: error.message });
      throw error;
    }

    if (this.ws && (this.ws.readyState === 0 || this.ws.readyState === 1)) {
      const error = new Error('Client already connected to an active websocket connection');

      this.debug({ type: 'breadcrumb', message: 'error', data: error.message });
      throw error;
    }

    this.connectTries += 1;
    this.connectionState = ConnectionState.CONNECTING;

    this.channels = {};
    this.channelRequests.forEach((cr) => {
      cr.currentChannel = null;
    });

    if (!this.chan0Cb) {
      this.fatal(new Error('Expected chan0Cb'));

      return;
    }

    const chan0 = new Channel({ openChannelCb: this.chan0Cb });
    this.channels[0] = chan0;

    const WebSocketClass = getWebSocketClass(this.connectOptions);

    if (this.fetchTokenAbortController) {
      this.fatal(new Error('Expected fetchTokenAbortController to be null'));

      return;
    }

    const abortController = new AbortController();
    this.fetchTokenAbortController = abortController;

    let tokenFetchResult;
    try {
      tokenFetchResult = await this.connectOptions.fetchToken(
        abortController.signal,
      );
    } catch (e) {
      this.fatal(e);

      return;
    }

    const { token, aborted } = tokenFetchResult;

    if (abortController.signal.aborted !== aborted) {
        // the aborted return value and the abort signal should be equivalent
      if (abortController.signal.aborted) {
        // In cases where our abort signal has been called means `client.close` was called
        // that means we shouldn't be calling `handleConnectError` because chan0Cb is null!
        this.fatal(new Error('Expected abort returned from fetchToken to be truthy when the controller aborts'));

        return;
      }

      // the user shouldn't return abort without the abort signal being called, if aborting is desired
      // client.close should be called
      this.fatal(new Error('Abort should only be truthy returned when the abort signal is triggered'));

      return;
    }

    this.fetchTokenAbortController = null;


    if (token && aborted) {
      this.fatal(new Error('Expected either aborted or a token'));
    }

    if (aborted) {
      this.handleConnectError(new Error('Called client.close during while connecting'));

      return;
    }


    if (!token) {
      this.fatal(new Error('Expected token to be a string or request to be aborted'));

      return;
    }

    if (this.connectionState !== ConnectionState.CONNECTING) {
      this.fatal(new Error('Client was closed before connecting'));

      return;
    }

    const connStr = Client.getConnectionStr(token, this.connectOptions.urlOptions);
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

    ws.onerror = () => {
      onFailed(new Error('WebSocket errored'));
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
    const { timeout } = this.connectOptions;
    if (timeout !== null) {
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
        this.fatal(new Error('Got containterState but state was not defined'));

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
        case StateEnum.READY: {
          // Once we're READY we can stop listening to incoming commands
          dispose();

          if (this.retryTimeoutId) {
            clearTimeout(this.retryTimeoutId);
          }
          cancelTimeout();

          let closedDuringConnect = false;
          const originalClose = this.close;

          this.close = () => {
            closedDuringConnect = true;

            // Cleanup in case user calls close inside open callback
            this.cleanupSocket();
            cancelTimeout();
            dispose();

            throw new Error('Cannot call close inside connect callback');
          };

          chan0.handleOpen({
            id: 0,
            state: api.OpenChannelRes.State.CREATED,
            send: this.send,
            context: this.connectOptions.context,
          });

          // If user called close inside open callback (throws a error) we should not continue connecting
          if (!closedDuringConnect) {
            this.close = originalClose;

            this.connectToken = token;

            this.handleConnect();
          }

          break;
        }
        case StateEnum.SLEEP:
          onFailed(new Error('Got SLEEP as container state'));

          break;

        default:
      }
    });

    onFailed = (error: Error) => {
      if (this.retryTimeoutId) {
        clearTimeout(this.retryTimeoutId);
      }

      // Cleanup related to this connection try. If we retry connecting a new `WebSocket` instance
      // will be used in additon to new `cancelTimeout` and `dispose` functions.
      this.cleanupSocket();
      cancelTimeout();
      dispose();

      if (this.connectTries <= this.connectOptions.maxConnectRetries) {
        this.retryTimeoutId = setTimeout(() => {
          this.debug({
            type: 'breadcrumb',
            message: 'retrying',
            data: {
              connectionState: this.connectionState,
              connectTries: this.connectTries,
              error,
              wsReadyState: this.ws ? this.ws.readyState : undefined,
            },
          });
          this.connectionState = ConnectionState.DISCONNECTED;
          this.connect();
        }, getNextRetryDelay(this.connectTries));

        return;
      }

      // Fall back to polling
      if (
        this.connectTries === this.connectOptions.maxConnectRetries + 1 &&
        !this.connectOptions.polling
      ) {
        this.retryTimeoutId = setTimeout(() => {
          this.connectionState = ConnectionState.DISCONNECTED;

          this.connectOptions.urlOptions.host = 'gp-v2.herokuapp.com';
          this.connectOptions.polling = true;

          this.debug({
            type: 'breadcrumb',
            message: 'falling back to polling',
            data: {
              connectionState: this.connectionState,
              connectTries: this.connectTries,
              error,
              wsReadyState: this.ws ? this.ws.readyState : undefined,
            },
          });

          this.connect();
        }, getNextRetryDelay(this.connectTries));

        return;
      }

      this.handleConnectError(error);
    };
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
      case 'closeChanRes': {
        if (cmd.closeChanRes == null) {
          this.fatal(new Error('Expected closeChanRes'));

          return;
        }

        if (cmd.closeChanRes.id == null || cmd.closeChanRes.status == null) {
          this.fatal(
            new Error(
              `Expected id and status in closeChanRes, got ${cmd.closeChanRes.id} and ${cmd.closeChanRes.status}`,
            ),
          );

          return;
        }

        this.debug({
          type: 'breadcrumb',
          message: 'handleCloseChannel',
          data: {
            id: cmd.closeChanRes.id,
            reason: cmd.closeChanRes.status,
          },
        });

        const channel = this.channels[cmd.closeChanRes.id];

        channel.handleClose(
          {
            initiator: 'channel',
            willReconnect: false,
          },
          this.connectOptions.context,
        );

        delete this.channels[cmd.closeChanRes.id];

        const channelRequest = this.channelRequests.find((cr) => cr.currentChannel === channel);

        if (channelRequest) {
          // If the user didn't close the channel directly we still need to remove the channelRequest
          this.channelRequests = this.channelRequests.filter((cr) => cr !== channelRequest);
        }

        break;
      }
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
    this.connectTries = 0;

    this.connectionState = ConnectionState.CONNECTED;

    this.debug({ type: 'breadcrumb', message: 'connected!' });

    if (!this.ws) {
      this.fatal(new Error('Expected Websocket instance'));

      return;
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

    this.channelRequests.forEach((channelRequest) => {
      this.handleOpenChannel(channelRequest);
    });
  };

  private handleClose = (closeResult: CloseResult) => {
    if (this.ws && this.fetchTokenAbortController) {
      // Fetching a token is required prior to initializing a websocket, we can't
      // have both at the same time as the abort controller is unset after we fetch the token
      this.fatal(new Error('fetchTokenAbortController and websocket exist simultaneously'));

      // Fallthrough to try to clean up
    }

    this.cleanupSocket();


    this.connectToken = null;

    if (this.retryTimeoutId) {
      // Client was closed while reconnecting
      clearTimeout(this.retryTimeoutId);
    }

    const willReconnect =
      closeResult.closeReason === ClientCloseReason.Disconnected &&
      Boolean(this.connectOptions.reconnect);

    const closeReason: ChannelCloseReason = {
      initiator: 'client',
      willReconnect,
    };

    Object.values(this.channels).forEach((channel) => {
      if (channel.closed) {
        // channel was closed by user but "closeChanRes' has not been received
        // `channel.handleClose` should be called once command is received
        return;
      }

      channel.handleClose(closeReason, this.connectOptions.context);
    });

    this.connectionState = ConnectionState.DISCONNECTED;

    if (!willReconnect) {
      // Client is done being used
      this.chan0Cb = null;
      return;
    }

    this.debug({
      type: 'breadcrumb',
      message: 'reconnecting',
    });

    this.connect();
  };

  /**
   * Called after the websocket connection fails to establish
   * the protocol handshake (get container state ready) and we run
   * out of retries
   */
  private handleConnectError = (error: Error) => {
    this.connectToken = null;

    if (this.retryTimeoutId) {
      // Client was closed while reconnecting
      clearTimeout(this.retryTimeoutId);
    }

    const chan0 = this.getChannel(0);
    const { context } = this.connectOptions;

    if (!chan0.closed) {
      chan0.handleError(error, context);
    }

    this.channelRequests.forEach(({ currentChannel, openChannelCb }) => {
      if (currentChannel && !currentChannel.closed) {
        currentChannel.handleError(error, context);
      } else {
        // Channel was never opened
        openChannelCb({ error, channel: null, context });
      }
    });

    this.connectionState = ConnectionState.DISCONNECTED;
    this.cleanupSocket();

    this.debug({ type: 'breadcrumb', message: 'connect failed', data: error.message });
  };

  private cleanupSocket = () => {
    const { ws } = this;

    this.debug({
      type: 'breadcrumb',
      message: 'cleanupSocket',
      data: {
        hasWs: Boolean(ws),
        readyState: ws ? ws.readyState : null,
        connectionState: this.connectionState,
      },
    });

    if (!ws) {
      return;
    }

    this.ws = null;

    ws.onmessage = null;
    ws.onclose = null;

    // Replace exististing error handler so an error doesn't get thrown.
    // We got here after either `handleConnectError` or `handleClose`
    // so it is safe to ignore any potential remaining errors
    ws.onerror = () => {};

    if (ws.readyState === 0 || ws.readyState === 1) {
      this.debug({
        type: 'breadcrumb',
        message: 'wsclose',
      });

      ws.close();
    }
  };
}
