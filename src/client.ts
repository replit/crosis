import { api } from '@replit/protocol';
import { Channel } from './channel';
import { getWebSocketClass, getNextRetryDelay, getConnectionStr } from './util/helpers';
import { EIOCompat } from './util/EIOCompat';
import { FetchConnectionMetadataError, ConnectionState } from './types';
import type {
  ConnectOptions,
  GovalMetadata,
  OpenChannelCb,
  ChannelOptions,
  DebugLog,
  OpenOptions,
} from './types';

enum ClientCloseReason {
  /**
   * called `client.close`
   */
  Intentional = 'Intentional',
  /**
   * The websocket connection died
   */
  Disconnected = 'Disconnected',
  /**
   * The client encountered an unrecoverable/invariant error
   */
  Error = 'Error',
}

type CloseResult =
  | {
      closeReason: ClientCloseReason.Intentional;
    }
  | {
      closeReason: ClientCloseReason.Disconnected;
      wsEvent: CloseEvent | Event;
    }
  | {
      closeReason: ClientCloseReason.Error;
      error: Error;
    };

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
  /**
   * Indicates the current state of the connection with the container.
   * This will only be DISCONNECTED if `open` has not been called
   * or the client closed permanently. Otherwise it'll be
   * CONNECTED or CONNECTING
   */
  public connectionState: ConnectionState;

  /**
   * The websocket used for communication with the container.
   *
   * @hidden
   */
  private ws: WebSocket | null;

  /**
   * Supplied to us as the first argument when calling `client.open`.
   * The most important option is the connection metadata getter
   *
   * @hidden
   */
  private connectOptions: ConnectOptions<Ctx> | null;

  /**
   * Supplied to us as the second argument when calling `client.open`.
   * Any time we connect we will call this callback with the control channel.
   * If we disconnect before ever connecting and we won't retry;
   * i.e. user called `client.close` or an unrecoverable error occured,
   * we will call this function with an error.
   * This has the same api as the second argument to openChannel.
   *
   * @hidden
   */
  private chan0Cb: OpenChannelCb<Ctx> | null;

  /**
   * This is the return value from chan0Cb. This will be null as long as we
   * haven't connected. Once connected, we call this anytime a connection ends
   * it will be passed a `willReconnect` boolean indicating whether we're reconnecting or
   * not, depending on the closure reason
   *
   * @hidden
   */
  private chan0CleanupCb: ReturnType<OpenChannelCb<Ctx>> | null;

  /**
   * Anytime `openChannel` is called, we throw the request in here. This is used to maintain
   * the `openChannel` calls accross reconnects and use to orchestrate channel opening and closing
   *
   * @hidden
   */
  private channelRequests: Array<ChannelRequest<Ctx>>;

  /**
   * This is purely for optimization reasons, we don't wanna look through the channelRequests
   * array to find the channel everytime. Instead we pull it out quickly from this map.
   * Any channel here (except for channel 0) should have a corresponding `channelRequest`
   * and the request should be in an `isOpen` true state with a corresponding channel id
   *
   * @hidden
   */
  private channels: {
    [id: number]: Channel;
  };

  /**
   * Called for breadcrumbs and other debug reasons
   *
   * @hidden
   */
  private debug: (log: DebugLog) => void;

  /**
   * A function supplied to us by the user of the client. Will be called
   * any time we have an unrecoverable error, usually an invariance
   *
   * @hidden
   */
  private userUnrecoverableErrorHandler: ((e: Error) => void) | null;

  /**
   * The connection might require multiple retries to be established.
   * Anytime we need to retry, we should also add an incremental backoff,
   * we do that using `setTimeout`. When the client closes before our
   * retry is initiated, we clear this timeout.
   *
   * @hidden
   */
  private retryTimeoutId: ReturnType<typeof setTimeout> | null;

  /**
   * Abort controller is used so that when the user calls client.close while
   * we're fetching connection metadata, we can be sure that we don't have a
   * `connect` call lingering around waiting for connection metadata and
   * eventually continue on as if we still want to connect
   *
   * @hidden
   */
  private fetchTokenAbortController: AbortController | null;

  /**
   * Was the client destroyed? A destroyed client is a client that cannot
   * be used ever again.
   *
   * @hidden
   */
  private destroyed: boolean;

  /**
   * The metadata for the current connection.
   *
   * @hidden
   */
  private connectionMetadata: GovalMetadata | null;

  /**
   * @typeParam Ctx  context, passed to various callbacks, specified when calling {@link Client.open | open}
   */
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
    this.destroyed = false;
    this.connectionMetadata = null;

    this.debug({ type: 'breadcrumb', message: 'constructor' });
  }

  /**
   * Starts connecting to the server and and opens channel 0
   *
   * See https://protodoc.turbio.repl.co/protov2 from more protocol specific info.
   *
   * Every client connected automatically "has" {@link Channel | channel} 0 listen to global events.
   * Any time the client connects it will call callback with channel 0 so you can use it.
   * Please refrain from using channel 0 to open channels and use [[Client.openChannel]] instead.
   *
   * This function follows similar semantics to [[Client.openChannel]]. The only
   * difference is the first parameter which specifies options around the connection
   * in addition to a context that is passed to various callbacks. It also does not
   * return a close function, instead you can use [[Client.close]].
   *
   * Usage:
   * ```typescript
   * client.open({ context, fetchConnectionMetadata }, function onOpen({
   *   channel,
   *   context,
   * }) {
   *   if (!channel) {
   *     // Closed before ever connecting. Due to `client.close` being called
   *     // or an unrecoverable, that can be handled by setting `client.setUnrecoverableError`
   *     return;
   *   }
   *
   *   //  The client is now connected (or reconnected in the event that it encountered an unexpected disconnect)
   *   // `channel` here is channel0 (more info at http://protodoc.turbio.repl.co/protov2)
   *   // - send commands using `channel.send`
   *   // - listen for commands using `channel.onCommand(cmd => ...)`
   *
   *   return function cleanup({ willReconnect }) {
   *     // The client was closed and might reconnect if it was closed unexpectedly
   *   };
   * });
   * ```
   */
  public open = (options: OpenOptions<Ctx>, cb: OpenChannelCb<Ctx>): void => {
    if (this.chan0Cb) {
      const error = new Error('You must call `close` before opening the client again');
      this.onUnrecoverableError(error);

      // throw to stop the execution of the caller
      throw error;
    }

    if (this.destroyed) {
      const error = new Error('Client has been destroyed and cannot be re-used');
      this.onUnrecoverableError(error);

      // throw to stop the execution of the caller
      throw error;
    }

    this.connectOptions = {
      timeout: 10000,
      ...options,
    };

    this.debug({
      type: 'breadcrumb',
      message: 'open',
      data: { polling: false },
    });

    this.chan0Cb = cb;
    this.connect({ tryCount: 0, websocketFailureCount: 0 });
  };

  /**
   *
   * Opens a {@link Channel | channel} for a [service](https://protodoc.turbio.repl.co/services)
   * and returns a function to close the channel.
   *
   * Read [opening channels](https://protodoc.turbio.repl.co/protov2#opening-channels)
   * section in the protocol documentation for protocol specific information.
   *
   * When the client connects, and the channel opens, the open callback is called with the channel.
   * As you should already know, you can use the channel to {@link Channel.send | send commands}
   * and {@link Channel.onCommand | listen on incoming commands}. Once the client disconnects
   * the channel is closed and is rendered un-usable (using it will throw an error) and you must
   * wait for a new channel to be passed to the callback upon reconnection.
   *
   * The channel will keep reopening upon client reconnects so long as you don't call the close
   * channel function.
   *
   * You can return an optional clean up function from the open callback to be used as a signal
   * for the channel closing, regardless of whether it is going to reconnect or not. The cleanup
   * function will be called with [[ChannelCloseReason]] which contians some useful information
   * about reconnection and why we closed.
   *
   * If [[Client.close]] is called, it will close all channels and they won't reconnect. However,
   * if you [[Client.open]] again in the future, all previously opened channels will re-open, unless
   * the returned close channel function was called. [[Client.destroy]] will free up all `openChannel`
   * calls but the client is unusable going forward.
   *
   * @param options  Options for the channel
   * @param cb  The open callback
   *
   * @returns A function to close the channel
   *
   * Usage:
   * ```typescript
   * // See docs for exec service here https://protodoc.turbio.repl.co/services#exec
   * const closeChannel = client.openChannel({ service: 'exec' }, function open({
   *   error,
   *   channel,
   *   context,
   * }) {
   *   if (error) {
   *     return;
   *   }
   *
   *   channel.onCommand((cmd) => {
   *     if (cmd.output) {
   *       terminal.write(cmd.output);
   *     }
   *   });
   *
   *   const intervalId = setInterval(() => {
   *     channel.send({
   *       exec: { args: ['echo', 'hello', context.user.name] }
   *       blocking: true,
   *     });
   *   }, 100);
   *
   *   return function cleanup() {
   *     clearInterval(intervalId);
   *   };
   * });
   *```
   */
  public openChannel = (options: ChannelOptions<Ctx>, cb: OpenChannelCb<Ctx>): (() => void) => {
    const sameNameChanRequests = this.channelRequests.filter(
      (cr) => cr.options.name === options.name,
    );

    if (options.name && sameNameChanRequests.some((cr) => !cr.closeRequested)) {
      // The protocol forbids opening a channel with the same name, so we're gonna prevent that early
      // so that we can give the caller a good stack trace to work with.
      // If the channel is queued for closure or is closing then we allow it.
      const error = new Error(`Channel with name ${options.name} already opened`);
      this.onUnrecoverableError(error);

      // throw to stop the execution of the caller
      throw error;
    }

    if (this.destroyed) {
      const error = new Error('Client has been destroyed and is unusable');
      this.onUnrecoverableError(error);

      // throw to stop the execution of the caller
      throw error;
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

    if (this.connectionState === ConnectionState.CONNECTED && !sameNameChanRequests.length) {
      // If we're not connected, then the request to open will go out once we're connected.
      // If there are channels with the same name then this request is queued after the other
      // channel(s) with the same name is done closing
      this.requestOpenChannel(channelRequest);
    }

    const closeChannel = () => {
      if (channelRequest.closeRequested) {
        return;
      }

      channelRequest.closeRequested = true;

      if (!channelRequest.isOpen) {
        // Channel is not open and we're not connected, let's just remove it from our list.
        // If we're connected, it means there's an inflight open request
        // then we'll be sending a close request right after it's done opening
        // so that we can use the channel ID when closing
        if (this.connectionState !== ConnectionState.CONNECTED) {
          this.channelRequests = this.channelRequests.filter((cr) => cr !== channelRequest);

          channelRequest.openChannelCb({
            error: new Error('Channel closed before opening'),
            channel: null,
            context: this.connectOptions ? this.connectOptions.context : null,
          });
        }

        return;
      }

      this.requestCloseChannel(channelRequest);
    };

    return closeChannel;
  };

  /** @hidden */
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

    const service =
      typeof options.service === 'string'
        ? options.service
        : options.service(this.connectOptions.context);

    this.debug({
      type: 'breadcrumb',
      message: 'requestOpenChannel',
      data: {
        name: options.name,
        service,
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
        service,
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
        onUnrecoverableError: this.onUnrecoverableError,
        send: this.send,
      });
      this.channels[id] = channel;
      // TODO we should stop relying on mutating the same channelrequest
      (channelRequest as ChannelRequest<Ctx>).channelId = id;
      (channelRequest as ChannelRequest<Ctx>).isOpen = true;

      // Make sure to save this value as the user can call closeChannel within openChannelCb
      // we want to avoid making the call to requestCloseChannel twice, once from within
      // openChannelCb and once here.
      const { closeRequested } = channelRequest;

      if (closeRequested) {
        // While we're opening the channel, we got a request to close this channel
        // let's take care of that and request a close.
        // The reason we call it before `openChannelCb`
        // is just to make sure that channel has a status
        // of `closing`
        this.requestCloseChannel(channelRequest);
      }

      (channelRequest as ChannelRequest<Ctx>).cleanupCb = openChannelCb({
        channel,
        error: null,
        context: this.connectOptions.context,
      });
    });
  };

  /** @hidden */
  private requestCloseChannel = async (channelRequest: ChannelRequest<Ctx>) => {
    if (!channelRequest.isOpen) {
      this.onUnrecoverableError(new Error('Tried to request a channel close before opening'));

      return;
    }

    const { channelId } = channelRequest;

    const chan = this.getChannel(channelRequest.channelId);
    chan.status = 'closing';

    const chan0 = this.getChannel(0);

    if (!chan0) {
      this.onUnrecoverableError(
        new Error('Tried to request a channel close but there was no chan0'),
      );

      return;
    }

    this.debug({
      type: 'breadcrumb',
      message: 'requestChannelClose',
      data: {
        id: channelId,
        name: channelRequest.options.name,
        service: channelRequest.options.service,
      },
    });

    const res = await chan0.request({
      closeChan: {
        action: api.CloseChannel.Action.TRY_CLOSE,
        id: channelRequest.channelId,
      },
    });

    if (res.channelClosed) {
      this.debug({
        type: 'breadcrumb',
        message: 'requestChannelClose:chan0Closed',
        data: {
          id: channelId,
          name: channelRequest.options.name,
          service: channelRequest.options.service,
        },
      });
    } else {
      if (res.closeChanRes == null) {
        this.onUnrecoverableError(new Error('Expected closeChanRes'));

        return;
      }

      const { id } = res.closeChanRes;

      if (id == null) {
        this.onUnrecoverableError(new Error(`Expected id, got ${id}`));

        return;
      }

      if (id !== channelId) {
        this.onUnrecoverableError(
          new Error(`Expected id from closeChanRes to be ${channelId} got ${id}`),
        );

        return;
      }

      this.debug({
        type: 'breadcrumb',
        message: 'requestChannelClose:closeChanRes',
        data: {
          id: channelId,
          name: channelRequest.options.name,
          service: channelRequest.options.service,
          closeStatus: res.closeChanRes.status,
        },
      });
    }

    this.channelRequests = this.channelRequests.filter((cr) => cr !== channelRequest);
    delete this.channels[channelId];

    chan.handleClose({ initiator: 'channel', willReconnect: false });
    if (channelRequest.cleanupCb) {
      channelRequest.cleanupCb({ initiator: 'channel', willReconnect: false });
    }

    // Next up: we will check if there are any channels with the same name
    // that are queued up for opening. We have defered the opening of the channel
    // until after the current open one closes (see `openChannel`) because the
    // protocol doesn't allow opening multiple channels with the same name.

    if (!channelRequest.options.name || this.connectionState === ConnectionState.CONNECTED) {
      return;
    }

    const nextRequest = this.channelRequests.find(
      (cr) => cr.options.name === channelRequest.options.name,
    );

    if (!nextRequest) {
      return;
    }

    this.requestOpenChannel(nextRequest);
  };

  /**
   * Closes the connection.
   * - `open` must have been called before calling this method
   * - If we haven't connected yet, open callback will be called with an error
   * - If there's an open WebSocket connection it will be closed
   * - Any open channels will be closed
   *   - Does not clear openChannel requests
   *   - If a channel never opened, its {@link OpenChannelCb | open channel callback}
   *     will be called with an error
   *   - Otherwise returned cleanup callback is called
   */
  public close = (): void => {
    this.debug({ type: 'breadcrumb', message: 'user close' });

    if (!this.chan0Cb || !this.connectOptions) {
      const error = new Error('Must call client.open before closing');
      this.onUnrecoverableError(error);

      // throw to stop the execution of the caller
      throw error;
    }

    if (this.fetchTokenAbortController) {
      this.fetchTokenAbortController.abort();
      this.fetchTokenAbortController = null;
    }

    this.handleClose({ closeReason: ClientCloseReason.Intentional });
  };

  /**
   * Destroy closes the connection, so all the rules of `close` apply here.
   * The only difference is that `destroy` renders the client unsuable afterwards.
   * It will also cleanup all saved `openChannel` calls freeing the callbacks and
   * avoiding leaks.
   */
  public destroy = (): void => {
    this.destroyed = true;
    this.debug({ type: 'breadcrumb', message: 'destroy' });

    if (this.connectionState !== ConnectionState.DISCONNECTED) {
      this.close();
    }

    this.debug = () => {};
    this.userUnrecoverableErrorHandler = null;
    this.channelRequests = [];
    this.destroyed = true;
  };

  /**
   * @hidden
   * Gets a channel by Id
   * */
  public getChannel = (id: number): Channel => {
    const chan = this.channels[id];

    // this.debug({
    //   type: 'breadcrumb',
    //   message: 'getChannel',
    //   data: {
    //     id,
    //   },
    // });

    if (!chan) {
      const error = new Error(`No channel with number ${id}`);

      this.onUnrecoverableError(error);

      throw error;
    }

    return chan;
  };

  /** Sets a logging/debugging function */
  public setDebugFunc = (debugFunc: (log: DebugLog) => void): void => {
    this.debug = debugFunc;
  };

  /**
   * Set a function to handle unrecoverable error
   *
   * Unrecoverable errors are internal errors or invariance errors
   * caused by the user mis-using the client.
   */
  public setUnrecoverableErrorHandler = (onUnrecoverableError: (e: Error) => void): void => {
    this.userUnrecoverableErrorHandler = onUnrecoverableError;
  };

  /**
   * Gets the current connection metadata used by the WebSocket, or null if the
   * WebSocket is not present.
   */
  public getConnectionMetadata = (): GovalMetadata | null => this.connectionMetadata;

  /** @hidden */
  private connect = async ({
    tryCount,
    websocketFailureCount,
  }: {
    tryCount: number;
    websocketFailureCount: number;
  }) => {
    this.debug({
      type: 'breadcrumb',
      message: 'connecting',
      data: {
        connectionState: this.connectionState,
        connectTries: tryCount,
        websocketFailureCount,
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

    if (!this.chan0Cb) {
      this.onUnrecoverableError(new Error('Expected chan0Cb'));

      return;
    }

    if (this.chan0CleanupCb) {
      this.onUnrecoverableError(new Error('Unexpected chan0CleanupCb, are you sure you closed'));

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

    this.connectionState = ConnectionState.CONNECTING;

    const chan0 = new Channel({
      id: 0,
      onUnrecoverableError: this.onUnrecoverableError,
      send: this.send,
    });
    this.channels[0] = chan0;

    if (this.connectionMetadata === null) {
      if (this.fetchTokenAbortController) {
        this.onUnrecoverableError(new Error('Expected fetchTokenAbortController to be null'));

        return;
      }

      const abortController = new AbortController();
      this.fetchTokenAbortController = abortController;

      let connectionMetadataFetchResult;
      try {
        connectionMetadataFetchResult = await this.connectOptions.fetchConnectionMetadata(
          abortController.signal,
        );
      } catch (e) {
        this.onUnrecoverableError(e);

        return;
      }

      this.fetchTokenAbortController = null;

      const connectionMetadata = connectionMetadataFetchResult;
      const aborted = connectionMetadata.error === FetchConnectionMetadataError.Aborted;

      if (abortController.signal.aborted !== aborted) {
        // the aborted return value and the abort signal should be equivalent
        if (abortController.signal.aborted) {
          // In cases where our abort signal has been called means `client.close` was called
          // that means we shouldn't be calling `handleConnectError` because chan0Cb is null!
          this.onUnrecoverableError(
            new Error(
              'Expected abort returned from fetchConnectionMetadata to be truthy when the controller aborts',
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

      if (connectionMetadata.error === FetchConnectionMetadataError.Aborted) {
        // Just return. The user called `client.close leading to a connectionMetadata abort
        // chan0Cb will be called with with an error Channel close, no need to do anything here.
        return;
      }

      if (connectionMetadata.error === FetchConnectionMetadataError.Retriable) {
        this.retryConnect({
          tryCount: tryCount + 1,
          websocketFailureCount,
          chan0,
          error: new Error('Retriable error'),
        });

        return;
      }

      if (this.connectionState !== ConnectionState.CONNECTING) {
        this.onUnrecoverableError(new Error('Client was closed before connecting'));

        return;
      }

      if (connectionMetadata.error) {
        this.onUnrecoverableError(connectionMetadata.error);

        return;
      }

      this.connectionMetadata = connectionMetadata;
    }

    if (websocketFailureCount === 3) {
      // Report that we fellback to polling
      this.debug({
        type: 'breadcrumb',
        message: 'polling fallback',
      });
    }

    const isPolling = websocketFailureCount >= 3;
    const WebSocketClass = isPolling
      ? EIOCompat
      : getWebSocketClass(this.connectOptions.WebSocketClass);
    const connStr = getConnectionStr(this.connectionMetadata, isPolling);
    const ws = new WebSocketClass(connStr);

    ws.binaryType = 'arraybuffer';
    ws.onmessage = this.onSocketMessage;
    this.ws = ws;

    // We'll use this to determine whether or not we should consider the next
    // failure a websocket failure and fallback to polling. If we were able to
    // pass the handshake phase at some point, then websockets work fine.
    let didWebsocketsWork = false;

    // We'll use this to determine whether or not we should consider the next
    // polling implementation failure to require a fresh metadata. If we were
    // able to receive any messages on channel 0, then the current metadata
    // should still be valid.
    let didReceiveAnyCommand = false;

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
    ws.onclose = (event: CloseEvent | Event) => {
      if (!onFailed) {
        this.onUnrecoverableError(new Error('Got websocket closure but no `onFailed` cb'));

        return;
      }

      if (WebSocketClass === EIOCompat) {
        if (!didReceiveAnyCommand) {
          // The polling implementation doesn't convey the Websocket close
          // event. Let's assume that we need to request a new token.
          this.connectionMetadata = null;
        }
      } else if ('code' in event) {
        const closeEvent = <CloseEvent>event;
        const closeCodePolicyViolation = 1008;
        if (closeEvent.code === closeCodePolicyViolation) {
          // This means that the token was rejected. We need to fetch another one.
          this.connectionMetadata = null;
        }
      }

      onFailed(new Error('WebSocket closed before we got READY'));
    };

    ws.onopen = () => {
      if (WebSocketClass === EIOCompat) {
        return;
      }

      // From this point on, we count this connection as successful.
      didWebsocketsWork = true;
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

      cancelTimeout = () => {
        this.debug({ type: 'breadcrumb', message: 'cancel timeout' });

        clearTimeout(timeoutId);
      };

      resetTimeout = () => {
        this.debug({ type: 'breadcrumb', message: 'reset timeout' });

        clearTimeout(timeoutId);

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

      resetTimeout();
    }

    /**
     * Listen to incoming commands
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
      didReceiveAnyCommand = true;
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
          this.close = () =>
            setTimeout(() => {
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

      this.retryConnect({
        tryCount: tryCount + 1,
        websocketFailureCount: didWebsocketsWork ? 0 : websocketFailureCount + 1,
        chan0,
        error,
      });
    };
  };

  /**
   * Attempt to reconnect after a short delay.
   *
   * @hidden
   */
  private retryConnect = ({
    tryCount,
    websocketFailureCount,
    chan0,
    error,
  }: {
    tryCount: number;
    websocketFailureCount: number;
    chan0: Channel;
    error: Error;
  }) => {
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
          websocketFailureCount,
          error,
          wsReadyState: this.ws ? this.ws.readyState : undefined,
        },
      });
      chan0.handleClose({ initiator: 'client', willReconnect: true });
      delete this.channels[0];
      this.connectionState = ConnectionState.DISCONNECTED;
      this.connect({ tryCount, websocketFailureCount });
    }, getNextRetryDelay(tryCount));
  };

  /** @hidden */
  private send = (cmd: api.Command) => {
    this.debug({ type: 'log', log: { direction: 'out', cmd } });

    const cmdBuf = api.Command.encode(cmd).finish();
    const buffer = cmdBuf.buffer.slice(cmdBuf.byteOffset, cmdBuf.byteOffset + cmdBuf.length);

    if (this.ws == null) {
      this.onUnrecoverableError(new Error('Calling send on a closed client'));

      return;
    }

    this.ws.send(buffer);
  };

  /** @hidden */
  private onSocketMessage = ({ data }: MessageEvent) => {
    const d = new Uint8Array(data);
    const cmd = api.Command.decode(d);

    this.debug({ type: 'log', log: { direction: 'in', cmd } });

    // Pass it to the right channel
    this.getChannel(cmd.channel).handleCommand(cmd);
  };

  /**
   * Called when chan0 connects. Opens all other required channels
   *
   * @hidden
   */
  private handleConnect = () => {
    this.connectionState = ConnectionState.CONNECTED;

    this.debug({ type: 'breadcrumb', message: 'connected!' });

    if (!this.ws) {
      this.onUnrecoverableError(new Error('Expected Websocket instance'));

      return;
    }

    // Update socket closure to do something else
    const onClose = (event: CloseEvent | Event) => {
      if (this.connectionState === ConnectionState.DISCONNECTED) {
        this.onUnrecoverableError(
          new Error('Got a close event on socket but client is in disconnected state'),
        );

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

  /** @hidden */
  private handleClose = (closeResult: CloseResult) => {
    if (closeResult.closeReason !== ClientCloseReason.Error) {
      // If we got here as a result of an error we'll ignore these assertions to avoid
      // infinite recursion in onUnrecoverableError
      if (this.connectionState === ConnectionState.DISCONNECTED) {
        this.onUnrecoverableError(
          new Error('handleClose is called but client already disconnected'),
        );

        return;
      }

      if (this.ws && this.fetchTokenAbortController) {
        // Fetching connection metadata is required prior to initializing a
        // websocket, we can't have both at the same time as the abort
        // controller is unset after we fetch the connection metadata.
        this.onUnrecoverableError(
          new Error('fetchTokenAbortController and websocket exist simultaneously'),
        );

        return;
      }
    }

    this.cleanupSocket();

    if (this.retryTimeoutId) {
      // Client was closed while reconnecting
      clearTimeout(this.retryTimeoutId);
    }

    const willClientReconnect = closeResult.closeReason === ClientCloseReason.Disconnected;

    this.channelRequests.forEach((channelRequest) => {
      const willChannelReconnect: boolean = willClientReconnect && !channelRequest.closeRequested;

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
        channelRequest.openChannelCb({
          channel: null,
          error: new Error('Failed to open'),
          context: this.connectOptions ? this.connectOptions.context : null,
        });
      }

      const { cleanupCb, closeRequested } = channelRequest;

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

      if (closeRequested || channelRequest.closeRequested) {
        // Channel closed earlier but we couldn't process the close request
        // or closed during cleanupCb that we just called
        this.channelRequests = this.channelRequests.filter((cr) => cr !== channelRequest);
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
      if (closeResult.closeReason !== ClientCloseReason.Error) {
        // if we got here as a result of an error we're not gonna call onUnrecoverableError again
        this.onUnrecoverableError(
          new Error('channels object should be empty after channelRequests and chan0 cleanup'),
        );

        return;
      }
    }

    if (this.chan0CleanupCb) {
      // Client successfully connected once
      this.chan0CleanupCb({
        initiator: 'client',
        willReconnect: willClientReconnect,
      });
      this.chan0CleanupCb = null;
    } else if (!willClientReconnect) {
      if (this.chan0Cb) {
        this.chan0Cb({
          channel: null,
          error: new Error('Failed to open'),
          context: this.connectOptions ? this.connectOptions.context : null,
        });
      } else if (closeResult.closeReason !== ClientCloseReason.Error) {
        // if we got here as a result of an error we're not gonna call onUnrecoverableError again
        this.onUnrecoverableError(new Error('open should have been called before `handleClose`'));

        return;
      }
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

    this.connect({ tryCount: 0, websocketFailureCount: 0 });
  };

  /** @hidden */
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
    ws.onopen = null;

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

  /** @hidden */
  private onUnrecoverableError = (e: Error) => {
    this.debug({
      type: 'breadcrumb',
      message: 'unrecoverable error',
      data: {
        message: e.message,
      },
    });

    if (this.connectionState !== ConnectionState.DISCONNECTED) {
      try {
        this.handleClose({
          closeReason: ClientCloseReason.Error,
          error: e,
        });
      } catch (handleCloseErr) {
        // We tried our best to clean up. But we need to keep going and report
        // unrecoverable error regardless of what happens inside handleClose
        // eslint-disable-next-line no-console
        console.error('handleClose errored during unrecoverable error');
        // eslint-disable-next-line no-console
        console.error(handleCloseErr);
      }
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
