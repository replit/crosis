import { api } from '@replit/protocol';
import { Channel } from './channel';
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
interface ConnectArgs<Ctx> extends Partial<Omit<ConnectOptions<Ctx>, 'fetchToken'>> {
  fetchToken: ConnectOptions<Ctx>['fetchToken'];
  context: Ctx;
}

type CloseResult =
  | {
      closeReason: ClientCloseReason.Intentional;
    }
  | {
      closeReason: ClientCloseReason.Disconnected;
      wsEvent: CloseEvent | ErrorEvent;
    }
  | {
      closeReason: ClientCloseReason.Error;
      error: Error;
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
    };

type DebugFunc = (log: DebugLog) => void;

type OnCloseFn = void | ((reason: ChannelCloseReason) => void);

type OpenChannelRes<Ctx> =
  | { error: null; channel: Channel; context: Ctx }
  | { error: Error; channel: null; context: Ctx };

type OpenChannelCb<Ctx> = (res: OpenChannelRes<Ctx>) => OnCloseFn;

type ChannelRequest<Ctx> =
  | {
      options: ChannelOptions<Ctx>;
      openChannelCb: OpenChannelCb<Ctx>;
      isOpen: true;
      closeRequested: boolean;
      channelId: number;
      cleanupCb: ReturnType<OpenChannelCb<Ctx>>;
    }
  | {
      options: ChannelOptions<Ctx>;
      openChannelCb: OpenChannelCb<Ctx>;
      isOpen: false;
      closeRequested: boolean;
      channelId: null;
      cleanupCb: null;
    };

export class Client<Ctx extends unknown = null> {
  public static ClientCloseReason = ClientCloseReason;

  public connectionState: ConnectionState;

  private ws: WebSocket | null;

  private connectOptions: ConnectOptions<Ctx> | null;

  private chan0Cb: OpenChannelCb<Ctx> | null;

  private chan0CleanupCb: ReturnType<OpenChannelCb<Ctx>> | null;

  private channelRequests: Array<ChannelRequest<Ctx>>;

  private channels: {
    [id: number]: Channel;
  };

  private debug: DebugFunc;

  private userUnrecoverableErrorHandler: ((e: Error) => void) | null;

  private retryTimeoutId: ReturnType<typeof setTimeout> | null;

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

  constructor() {
    this.ws = null;
    this.channels = {};
    this.connectOptions = null;
    this.chan0Cb = null;
    this.chan0CleanupCb = null;
    this.connectionState = ConnectionState.DISCONNECTED;
    this.debug = () => {};
    this.userUnrecoverableErrorHandler = null;
    this.channelRequests = [];
    this.retryTimeoutId = null;
    this.fetchTokenAbortController = null;

    this.debug({ type: 'breadcrumb', message: 'constructor' });
  }

  /**
   * Starts connecting to the server and and opens channel 0
   *
   * Every client automatically "has" channel 0 and can use it to open more channels.
   * See http://protodoc.turbio.repl.co/protov2 from more info
   */
  public open = (options: ConnectArgs<Ctx>, cb: OpenChannelCb<Ctx>) => {
    if (this.chan0Cb) {
      throw new Error('You must call `close` before opening the client again');
    }

    if (!options.fetchToken || typeof options.fetchToken !== 'function') {
      throw new Error('You must provide a fetchToken function');
    }

    this.connectOptions = {
      timeout: 10000,
      urlOptions: {
        secure: false,
        host: 'eval.repl.it',
        port: '80',
      },
      ...options,
    };

    this.debug({
      type: 'breadcrumb',
      message: 'open',
      data: { polling: false },
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
  public openChannel = (options: ChannelOptions<Ctx>, cb: OpenChannelCb<Ctx>) => {
    if (!this.chan0Cb) {
      throw new Error('You must call client.open before attempting to open any channels');
    }

    const channelRequest: ChannelRequest<Ctx> = {
      options,
      openChannelCb: cb,
      isOpen: false,
      channelId: null,
      cleanupCb: null,
      closeRequested: false,
    };

    this.channelRequests.push(channelRequest);

    if (this.connectionState === ConnectionState.CONNECTED) {
      // We're connected, open channel. Otherwise we'll open the channel once we connect
      this.requestOpenChannel(channelRequest);
    }

    const closeChannel = () => {
      channelRequest.closeRequested = true;

      if (!channelRequest.isOpen) {
        // Channel is not open, let's just remove it from our list.
        // If there's an inflight open request then we'll be sending a close
        // request right after it's done.
        this.channelRequests = this.channelRequests.filter((cr) => cr !== channelRequest);

        return;
      }

      this.requestCloseChannel(channelRequest);
    };

    return closeChannel;
  };

  private requestOpenChannel = (channelRequest: ChannelRequest<Ctx>) => {
    const { options, openChannelCb } = channelRequest;

    if (!this.connectOptions) {
      this.onUnrecoverableError(new Error('Expected connectionOptions'));

      return;
    }

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

    if (channelRequest.channelId) {
      this.onUnrecoverableError(new Error('Unexpected channelId'));

      return;
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

    // Random base36 int
    const ref = Number(Math.random().toString().split('.')[1]).toString(36);

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
        this.onUnrecoverableError(new Error('Expected openChanRes on command'));

        return;
      }

      const { id, state, error } = cmd.openChanRes;

      this.debug({ type: 'breadcrumb', message: 'openChanres' });

      if (!this.connectOptions) {
        this.onUnrecoverableError(new Error('Expected connectionOptions'));

        return;
      }

      if (state === api.OpenChannelRes.State.ERROR) {
        this.onUnrecoverableError(
          new Error(`Channel open resulted with an error: ${error || 'with no message'}`),
        );

        return;
      }

      if (typeof id !== 'number' || typeof state !== 'number') {
        this.onUnrecoverableError(new Error('Expected state and channel id'));

        return;
      }

      const channel = new Channel({
        id,
        name: options.name,
        service: options.service,
        onUnrecoverableError: this.onUnrecoverableError,
        send: this.send,
      });
      this.channels[id] = channel;
      // TODO we should stop relying on mutating the same channelrequest
      (channelRequest as ChannelRequest<Ctx>).channelId = id;
      (channelRequest as ChannelRequest<Ctx>).isOpen = true;
      (channelRequest as ChannelRequest<Ctx>).cleanupCb = openChannelCb({
        channel,
        error: null,
        context: this.connectOptions.context,
      });

      if (channelRequest.closeRequested) {
        // While we're opening the channel, we got a request to close this channel
        // let's take care of that and request a close
        this.requestCloseChannel(channelRequest);
      }
    });
  };

  private requestCloseChannel = async (channelRequest: ChannelRequest<Ctx>) => {
    if (!channelRequest.isOpen) {
      this.onUnrecoverableError(new Error('Tried to request a channel close before opening'));

      return;
    }

    const chan = this.getChannel(channelRequest.channelId);
    chan.status = 'closing';

    const chan0 = this.getChannel(0);

    if (!chan0) {
      this.onUnrecoverableError(
        new Error('Tried to request a channel close but there was no chan0'),
      );

      return;
    }

    const res = await chan0.request({
      closeChan: {
        action: api.CloseChannel.Action.TRY_CLOSE,
        id: channelRequest.channelId,
      },
    });

    if (res.channelClosed) {
      // channel0 is closed, which means all other channels are already closed
      return;
    }

    if (res.closeChanRes == null) {
      this.onUnrecoverableError(new Error('Expected closeChanRes'));

      return;
    }

    const { id } = res.closeChanRes;

    if (id == null) {
      this.onUnrecoverableError(new Error(`Expected id, got ${id}`));

      return;
    }

    this.debug({
      type: 'breadcrumb',
      message: 'handleCloseChannel',
      data: {
        id: res.closeChanRes.id,
        reason: res.closeChanRes.status,
      },
    });

    if (!this.connectOptions) {
      this.onUnrecoverableError(new Error('Expected connectionOptions'));

      return;
    }

    this.channelRequests = this.channelRequests.filter((cr) => cr !== channelRequest);
    delete this.channels[id];

    chan.handleClose({ initiator: 'channel', willReconnect: false });
    if (channelRequest.cleanupCb) {
      channelRequest.cleanupCb({ initiator: 'channel', willReconnect: false });
    }
  };

  /**
   * Closes the connection.
   * - If `open` was called but we didn't connect yet treat it as a connection error
   * - If there's an open WebSocket connection it will be closed
   * - Any open channels or channel requests are closed
   */
  public close = () => {
    this.debug({ type: 'breadcrumb', message: 'user close' });

    if (!this.chan0Cb || !this.connectOptions) {
      throw new Error('Must call client.connect before closing');
    }

    this.fetchTokenAbortController?.abort();

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

      this.onUnrecoverableError(error);

      throw error;
    }

    return chan;
  }

  /** Sets a logging/debugging function */
  public setDebugFunc(debugFunc: DebugFunc): void {
    this.debug = debugFunc;
  }

  /** Set a function to handle unrecoverable error
   * Unrecoverable errors are internal errors or invariance errors
   * caused by the user mis-using the client.
   */
  public setUnrecoverErrorHandler(onUnrecoverableError: (e: Error) => void) {
    this.userUnrecoverableErrorHandler = onUnrecoverableError;
  }

  private connect = async (n = 0) => {
    let tryCount = n;

    this.debug({
      type: 'breadcrumb',
      message: 'connecting',
      data: {
        connectionState: this.connectionState,
        connectTries: tryCount,
        readyState: this.ws ? this.ws.readyState : undefined,
        chan0CbExists: Boolean(this.chan0Cb),
      },
    });

    if (this.connectionState !== ConnectionState.DISCONNECTED) {
      const error = new Error('Client must be disconnected to connect');
      this.onUnrecoverableError(error);

      throw error;
    }

    if (this.ws) {
      const error = new Error('Unexpected existing websocket instance');
      this.onUnrecoverableError(error);

      throw error;
    }

    if (!this.connectOptions) {
      const error = new Error('Expected connectionOptions');
      this.onUnrecoverableError(error);

      throw error;
    }

    tryCount += 1;
    this.connectionState = ConnectionState.CONNECTING;

    if (!this.chan0Cb) {
      this.onUnrecoverableError(new Error('Expected chan0Cb'));

      return;
    }

    if (this.channelRequests.some((cr) => cr.isOpen)) {
      this.onUnrecoverableError(new Error('All channels should be closed when we connect'));

      return;
    }

    if (Object.keys(this.channels).length) {
      this.onUnrecoverableError(new Error('Found an an unexpected existing channels'));

      return;
    }

    const chan0 = new Channel({
      id: 0,
      name: '0',
      service: '0',
      onUnrecoverableError: this.onUnrecoverableError,
      send: this.send,
    });
    this.channels[0] = chan0;

    const WebSocketClass = getWebSocketClass(this.connectOptions);

    if (this.fetchTokenAbortController) {
      this.onUnrecoverableError(new Error('Expected fetchTokenAbortController to be null'));

      return;
    }

    const abortController = new AbortController();
    this.fetchTokenAbortController = abortController;

    let tokenFetchResult;
    try {
      tokenFetchResult = await this.connectOptions.fetchToken(abortController.signal);
    } catch (e) {
      this.onUnrecoverableError(e);

      return;
    }

    this.fetchTokenAbortController = null;

    const { token, aborted } = tokenFetchResult;

    if (abortController.signal.aborted !== aborted) {
      // the aborted return value and the abort signal should be equivalent
      if (abortController.signal.aborted) {
        // In cases where our abort signal has been called means `client.close` was called
        // that means we shouldn't be calling `handleConnectError` because chan0Cb is null!
        this.onUnrecoverableError(
          new Error(
            'Expected abort returned from fetchToken to be truthy when the controller aborts',
          ),
        );

        return;
      }

      // the user shouldn't return abort without the abort signal being called, if aborting is desired
      // client.close should be called
      this.onUnrecoverableError(
        new Error('Abort should only be truthy returned when the abort signal is triggered'),
      );

      return;
    }

    if (token && aborted) {
      this.onUnrecoverableError(new Error('Expected either aborted or a token'));

      return;
    }

    if (aborted) {
      // Just return. The user called `client.close leading to a token abort
      // chan0Cb will be called with with an error Channel close, no need to do anything here.
      return;
    }

    if (!token) {
      this.onUnrecoverableError(
        new Error('Expected token to be a string or request to be aborted'),
      );

      return;
    }

    if (this.connectionState !== ConnectionState.CONNECTING) {
      this.onUnrecoverableError(new Error('Client was closed before connecting'));

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
    let onFailed: ((err: Error) => void) | null = null;

    ws.onerror = () => {
      if (!onFailed) {
        this.onUnrecoverableError(new Error('Got websocket error but no `onFailed` cb'));

        return;
      }

      onFailed(new Error('WebSocket errored'));
    };

    /**
     * Abrupt socket closures should report failed
     */
    ws.onclose = () => {
      if (!onFailed) {
        this.onUnrecoverableError(new Error('Got websocket closure but no `onFailed` cb'));

        return;
      }

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

          if (!onFailed) {
            this.onUnrecoverableError(
              new Error('Connecting timed out but there was no `onFailed` cb'),
            );

            return;
          }

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
    const unlistenChan0 = chan0.onCommand((cmd: api.Command) => {
      // Everytime we get a message on channel0
      // we will reset the timeout
      resetTimeout();

      if (cmd.containerState == null) {
        return;
      }

      if (cmd.containerState.state == null) {
        this.onUnrecoverableError(new Error('Got containterState but state was not defined'));

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
          unlistenChan0();

          cancelTimeout();

          if (!this.connectOptions) {
            this.onUnrecoverableError(new Error('Expected connectionOptions'));

            return;
          }

          if (!chan0) {
            this.onUnrecoverableError(new Error('Expected chan0 to be truthy'));

            return;
          }

          if (!this.chan0Cb) {
            this.onUnrecoverableError(new Error('Expected chan0Cb to be truthy'));

            return;
          }

          this.handleConnect();

          // defer closing if the user decides to call client.close inside chan0Cb
          const originalClose = this.close;
          this.close = () => setTimeout(() => {
              originalClose();
            }, 0);

          this.chan0CleanupCb = this.chan0Cb({
            channel: chan0,
            error: null,
            context: this.connectOptions.context,
          });

          this.close = originalClose;

          break;
        }
        case StateEnum.SLEEP:
          if (!onFailed) {
            this.onUnrecoverableError(new Error('Got SLEEP but there was no `onFailed` cb'));

            return;
          }

          onFailed(new Error('Got SLEEP as container state'));

          break;

        default:
      }
    });

    onFailed = (error: Error) => {
      // Make sure this function is not called multiple times.
      onFailed = null;

      // Cleanup related to this connection try. If we retry connecting a new `WebSocket` instance
      // will be used in additon to new `cancelTimeout` and `unlistenChan0` functions.
      this.cleanupSocket();
      cancelTimeout();
      unlistenChan0();

      if (this.retryTimeoutId) {
        this.onUnrecoverableError(new Error('unexpected existing retryTimeoutId'));

        return;
      }

      if (!this.chan0Cb) {
        // User called close
        // TODO (masad-frost) something more explicit here
        // might be the way to go
        return;
      }

      this.retryTimeoutId = setTimeout(() => {
        if (!this.chan0Cb) {
          this.onUnrecoverableError(new Error('Scheduled retry is called after we closed?'));

          return;
        }

        this.retryTimeoutId = null;

        this.debug({
          type: 'breadcrumb',
          message: 'retrying',
          data: {
            connectionState: this.connectionState,
            connectTries: tryCount,
            error,
            wsReadyState: this.ws ? this.ws.readyState : undefined,
          },
        });
        chan0.handleClose({ initiator: 'client', willReconnect: true });
        delete this.channels[0];
        this.connectionState = ConnectionState.DISCONNECTED;
        this.connect(tryCount);
      }, getNextRetryDelay(tryCount));
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
  };

  /**
   * Called when chan0 connects. Opens all other required channels
   */
  private handleConnect = () => {
    this.connectionState = ConnectionState.CONNECTED;

    this.debug({ type: 'breadcrumb', message: 'connected!' });

    if (!this.ws) {
      this.onUnrecoverableError(new Error('Expected Websocket instance'));

      return;
    }

    // Update socket closure to do something else
    const onClose = (event: CloseEvent | ErrorEvent) => {
      if (this.connectionState === ConnectionState.DISCONNECTED) {
        this.onUnrecoverableError(new Error('Got a close event on socket but client is in disconnected state'));

        return;
      }

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
      this.requestOpenChannel(channelRequest);
    });
  };

  private handleClose = (closeResult: CloseResult) => {
    if (!this.chan0Cb || !this.connectOptions) {
      this.onUnrecoverableError(new Error('open should have been called before `handleClose`'));

      return;
    }

    if (this.connectionState === ConnectionState.DISCONNECTED) {
      this.onUnrecoverableError(new Error('handleClose is called but client already disconnected'));

      return;
    }

    if (this.ws && this.fetchTokenAbortController) {
      // Fetching a token is required prior to initializing a websocket, we can't
      // have both at the same time as the abort controller is unset after we fetch the token
      this.onUnrecoverableError(
        new Error('fetchTokenAbortController and websocket exist simultaneously'),
      );

      // Fallthrough to try to clean up
    }

    this.cleanupSocket();

    if (this.retryTimeoutId) {
      // Client was closed while reconnecting
      clearTimeout(this.retryTimeoutId);
    }

    const willClientReconnect = closeResult.closeReason === ClientCloseReason.Disconnected;

    this.channelRequests.forEach((channelRequest) => {
      const willChannelReconnect: boolean = willClientReconnect && !channelRequest.closeRequested;

      if (!willChannelReconnect) {
        // If the channel won't reconnect, make sure to remove it from channelRequests
        // so that in case the client reconnects in the future we don't try to open it
        this.channelRequests = this.channelRequests.filter((cr) => cr !== channelRequest);
      }

      if (channelRequest.isOpen) {
        const channel = this.getChannel(channelRequest.channelId);
        channel.handleClose({
          initiator: 'client',
          willReconnect: willChannelReconnect,
        });
        delete this.channels[channelRequest.channelId];
      } else if (!willChannelReconnect) {
        // channel won't reconnect and was never opened
        // we'll call the open channel callback with an error
        if (!this.connectOptions) {
          this.onUnrecoverableError(new Error('Expected connectionOptions'));

          return;
        }

        channelRequest.openChannelCb({
          channel: null,
          error: new Error('Failed to open'),
          context: this.connectOptions.context,
        });
      }

      const { cleanupCb } = channelRequest;

      // Re-set the channel request's state
      // TODO we should stop relying on mutating the same channelrequest
      (channelRequest as ChannelRequest<Ctx>).channelId = null;
      (channelRequest as ChannelRequest<Ctx>).isOpen = false;
      (channelRequest as ChannelRequest<Ctx>).cleanupCb = null;
      (channelRequest as ChannelRequest<Ctx>).closeRequested = false;

      if (cleanupCb) {
        // Call the cleanupCb after we update the values
        // on the channelRequest to make sure any cascading effects
        // have the right values for channelRequest
        cleanupCb({
          initiator: 'client',
          willReconnect: willChannelReconnect,
        });
      }
    });

    if (this.channels[0]) {
      this.channels[0].handleClose({
        initiator: 'client',
        willReconnect: willClientReconnect,
      });
      delete this.channels[0];
    }

    if (Object.keys(this.channels).length !== 0) {
      this.channels = {};
      this.onUnrecoverableError(
        new Error('channels object should be empty after channelRequests and chan0 cleanup'),
      );

      return;
    }

    if (this.chan0CleanupCb) {
      // Client successfully connected once
      this.chan0CleanupCb({
        initiator: 'client',
        willReconnect: willClientReconnect,
      });
      this.chan0CleanupCb = null;
    } else if (!willClientReconnect) {
      this.chan0Cb({
        channel: null,
        error: new Error('Failed to open'),
        context: this.connectOptions.context,
      });
    }

    this.connectionState = ConnectionState.DISCONNECTED;

    if (!willClientReconnect) {
      // Client is done being used until the next `open` call
      this.chan0Cb = null;
      this.connectOptions = null;

      return;
    }

    this.debug({
      type: 'breadcrumb',
      message: 'reconnecting',
    });

    this.connect();
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
    // We got here after either `handleClose` so it is safe to ignore
    //  any potential remaining errors
    ws.onerror = () => {};

    if (ws.readyState === 0 || ws.readyState === 1) {
      this.debug({
        type: 'breadcrumb',
        message: 'wsclose',
      });

      ws.close();
    }
  };

  private onUnrecoverableError = (e: Error) => {
    if (this.connectionState !== ConnectionState.DISCONNECTED) {
      this.handleClose({
        closeReason: ClientCloseReason.Error,
        error: e,
      });
    }

    if (this.userUnrecoverableErrorHandler) {
      this.userUnrecoverableErrorHandler(e);

      return;
    }

    // eslint-disable-next-line no-console
    console.error('Please supply your own unrecoverable error handling function');

    throw e;
  };
}
