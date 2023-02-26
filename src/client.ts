import { api } from '@replit/protocol';
import { Channel } from './channel';
import { getWebSocketClass, defaultGetNextRetryDelay, getConnectionStr } from './util/helpers';
import { EIOCompat } from './util/EIOCompat';
import {
  FetchConnectionMetadataError,
  ConnectionState,
  FetchConnectionMetadataResult,
  CloseCode,
} from './types';
import type {
  ConnectOptions,
  GovalMetadata,
  OpenChannelCb,
  ChannelOptions,
  DebugLog,
  OpenOptions,
} from './types';

// Maximum amount of retries before connecting back to the
// redirect initiator (only effective after a redirect)
const MAX_RETRY_COUNT = 10;

enum ClientCloseReason {
  /**
   * Called `client.close`, expected to stay closed.
   */
  Intentional = 'Intentional',
  /**
   * Called `client.close`, but we're going to try to reconnect.
   */
  Temporary = 'Temporary',
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
      closeReason: ClientCloseReason.Temporary;
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

export class Client<Ctx = null> {
  /**
   * Indicates the current state of the connection with the container.
   * This will only be DISCONNECTED if `open` has not been called
   * or the client closed permanently. Otherwise it'll be
   * CONNECTED or CONNECTING
   */
  private connectionState: ConnectionState;

  /**
   * A list of listeners for connection state changes.
   *
   * @hidden
   */
  private connectionStateChangeFuncs: Array<(state: ConnectionState) => void>;

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
   * i.e. user called `client.close` or an unrecoverable error occurred,
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
   * the `openChannel` calls across reconnects and use to orchestrate channel opening and closing
   *
   * @hidden
   */
  private channelRequests: Array<ChannelRequest<Ctx>>;

  /**
   * This is purely for optimization reasons, we don't wanna look through the channelRequests
   * array to find the channel every time. Instead we pull it out quickly from this map.
   * Any channel here (except for channel 0) should have a corresponding `channelRequest`
   * and the request should be in an `isOpen` true state with a corresponding channel id
   *
   * @hidden
   */
  private channels: {
    [id: number]: Channel;
  };

  /**
   * Listeners to be called for breadcrumbs and other debug reasons
   *
   * @hidden
   */
  private debugFuncs: Array<(log: DebugLog<Ctx>) => void>;

  /**
   * Listeners to be called for BootStatus messages
   *
   * @hidden
   */
  private bootStatusFuncs: Array<(cmd: api.BootStatus) => void>;

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
   * Users can provide a timeout for how long the client should
   * wait for a successful connection to the server. When the client
   * closes while we're waiting for the timeout, we clear this
   * timeout.
   *
   * @hidden
   */
  private connectTimeoutId: ReturnType<typeof setTimeout> | null;

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
   * URL of the origin of the previous redirect message.
   * This is used to restore the connection in case we get a failure after a redirect.
   * Example:
   * In case we get a redirect message from server 1 pointing us to server 2,
   * and then connection to server 2 fails, we try to reconnect to server 1.
   * This is used in cases where a server provides load balancing through redirect
   * messages.
   */
  private redirectInitiatorURL: string | null;

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
    this.connectionStateChangeFuncs = [];
    this.debugFuncs = [];
    this.bootStatusFuncs = [];
    this.userUnrecoverableErrorHandler = null;
    this.channelRequests = [];
    this.retryTimeoutId = null;
    this.connectTimeoutId = null;
    this.fetchTokenAbortController = null;
    this.destroyed = false;
    this.connectionMetadata = null;
    this.redirectInitiatorURL = null;

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
      reuseConnectionMetadata: false,
      getNextRetryDelayMs: defaultGetNextRetryDelay,
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
   * function will be called with [[ChannelCloseReason]] which contains some useful information
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
    const sameNameChanRequests = options.name
      ? this.channelRequests.filter((cr) => cr.options.name === options.name)
      : [];

    if (sameNameChanRequests.some((cr) => !cr.closeRequested)) {
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

    if (this.getConnectionState() === ConnectionState.CONNECTED && !sameNameChanRequests.length) {
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
        if (this.getConnectionState() !== ConnectionState.CONNECTED) {
          this.channelRequests = this.channelRequests.filter((cr) => cr !== channelRequest);
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
        name: channelRequest.options.name,
        service,
        onUnrecoverableError: this.onUnrecoverableError,
        send: this.send,
      });
      this.channels[id] = channel;
      // TODO we should stop relying on mutating the same channelRequest
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
    // that are queued up for opening. We have deferred the opening of the channel
    // until after the current open one closes (see `openChannel`) because the
    // protocol doesn't allow opening multiple channels with the same name

    if (!channelRequest.options.name || this.connectionState !== ConnectionState.CONNECTED) {
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
   *
   *  - expectReconnect: if true, the client will expects to try to reconnect,
   *  e.g., a temporary network issue with an explicit reconnect handler.
   */
  public close = ({ expectReconnect } = { expectReconnect: false }): void => {
    this.debug({
      type: 'breadcrumb',
      message: expectReconnect ? 'user temporary close' : 'user close',
    });

    if (!this.chan0Cb || !this.connectOptions) {
      const error = new Error('Must call client.open before closing');
      this.onUnrecoverableError(error);

      // throw to stop the execution of the caller
      throw error;
    }

    // If the close is intentional, let's unset the metadata
    // the client may be re-used to connect to another repl.
    // If it is temporary, the client should reuse the metadata
    // when it reconnects.
    this.connectionMetadata = null;

    if (expectReconnect) {
      this.handleClose({
        closeReason: ClientCloseReason.Temporary,
      });
    } else {
      this.handleClose({ closeReason: ClientCloseReason.Intentional });
    }
  };

  /**
   * Destroy closes the connection, so all the rules of `close` apply here.
   * The only difference is that `destroy` renders the client unusable afterwards.
   * It will also cleanup all saved `openChannel` calls freeing the callbacks and
   * avoiding leaks.
   */
  public destroy = (): void => {
    this.destroyed = true;
    this.debug({ type: 'breadcrumb', message: 'destroy' });

    if (this.getConnectionState() !== ConnectionState.DISCONNECTED) {
      this.close({
        expectReconnect: false,
      });
    }

    this.debug = () => {};
    this.connectionStateChangeFuncs = [];
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

  /**
   * Calls all the registered logging/debugging functions
   *
   * @hidden
   */
  private debug = (log: DebugLog<Ctx>): void => {
    this.debugFuncs.forEach((func) => func(log));
  };

  /**
   * Adds a logging/debugging function. Returns a function that will remove
   * the callback
   */
  public onDebugLog = (debugFunc: (log: DebugLog<Ctx>) => void): (() => void) => {
    this.debugFuncs.push(debugFunc);

    return () => {
      const idx = this.debugFuncs.indexOf(debugFunc);
      if (idx > -1) {
        this.debugFuncs.splice(idx, 1);
      }
    };
  };

  /**
   * Calls all the listeners for connection state updates. All connection state
   * updates should go through this function.
   *
   * @hidden
   */
  private setConnectionState = (connectionState: ConnectionState): void => {
    this.connectionState = connectionState;
    this.connectionStateChangeFuncs.forEach((f) => f(connectionState));
  };

  /**
   * Sets a listener for connection state changes.
   *
   * @returns cleanup function that removes the listener
   */
  public onConnectionStateChange = (
    connectionStateChangeFunc: (connectionState: ConnectionState) => void,
  ): (() => void) => {
    this.connectionStateChangeFuncs.push(connectionStateChangeFunc);

    return () => {
      const idx = this.connectionStateChangeFuncs.indexOf(connectionStateChangeFunc);
      if (idx > -1) {
        this.connectionStateChangeFuncs.splice(idx, 1);
      }
    };
  };

  /**
   * Gets the current connection state.
   *
   * The listener functions are only called when the connection state changes.
   * This function can be used to get the current state ahead of setting up a
   * listener.
   *
   * @returns the current ConnectionState
   * */
  public getConnectionState = (): ConnectionState => this.connectionState;

  /**
   * Adds a listener for BootStatus messages coming in from the backend
   * before we acquire and connect to the container.
   */
  public onBootStatus = (bootStatusFunc: (command: api.BootStatus) => void): (() => void) => {
    this.bootStatusFuncs.push(bootStatusFunc);

    return () => {
      const idx = this.bootStatusFuncs.indexOf(bootStatusFunc);
      if (idx > -1) {
        this.bootStatusFuncs.splice(idx, 1);
      }
    };
  };

  /**
   * Adds a listener for the "firewall denied" condition, which occurs when
   * a user from firewalledreplit.com tries to connect to a repl which has
   * already been started in regular mode.
   * By default, throw an unrecoverable error, but this can be overridden if
   * clients want to do something different here.
   */
  public onFirewallDenied = () => {
    this.onUnrecoverableError(new Error("Can't connect to unfirewalled repl from firewall mode"));
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

    if (this.getConnectionState() !== ConnectionState.DISCONNECTED) {
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

    if (this.connectTimeoutId) {
      this.onUnrecoverableError(new Error('Unexpected connectTimeoutId'));

      return;
    }

    this.setConnectionState(ConnectionState.CONNECTING);

    const chan0 = new Channel({
      id: 0,
      name: 'chan0',
      onUnrecoverableError: this.onUnrecoverableError,
      send: this.send,
    });
    this.channels[0] = chan0;

    // We'll emit bootStatus throughout the lifetime of the channel
    // bootStatus messages may come in after container state is ready
    // and so we don't want to dispose this listener until the current
    // connection is completely disposed, which automatically disposes
    // this channel and attached listeners
    chan0.onCommand((cmd) => {
      const bootStatus = cmd.bootStatus;
      if (bootStatus != null) {
        this.bootStatusFuncs.forEach((cb) => cb(bootStatus));
      }
    });

    chan0.onCommand((cmd) => {
      const redirect = cmd.redirect;
      if (redirect != null) {
        return this.handleRedirect(redirect.url);
      }
    });

    if (!this.connectOptions.reuseConnectionMetadata || this.connectionMetadata === null) {
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
        let err: Error;
        if (e instanceof Error) {
          err = e;
        } else if (
          e &&
          typeof e === 'object' &&
          'message' in e &&
          typeof (e as Record<string, string>).message === 'string'
        ) {
          err = new Error((e as Record<string, string>).message);
        } else if (typeof e === 'string') {
          err = new Error(e);
        } else {
          err = new Error('Unknown error when fetching connection metadata');
        }

        this.onUnrecoverableError(err);

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

      if (this.getConnectionState() !== ConnectionState.CONNECTING) {
        this.onUnrecoverableError(new Error('Client was closed before connecting'));

        return;
      }

      if (connectionMetadata.error) {
        this.onUnrecoverableError(connectionMetadata.error);

        return;
      }

      this.connectionMetadata = connectionMetadata;
    }

    if (websocketFailureCount === 3 && this.connectOptions.pollingHost) {
      // Report that we fellback to polling
      this.debug({
        type: 'breadcrumb',
        message: 'polling fallback',
      });
    }

    const isPolling = websocketFailureCount >= 3 && this.connectOptions.pollingHost;
    const WebSocketClass = isPolling
      ? EIOCompat
      : getWebSocketClass(this.connectOptions.WebSocketClass);
    const connStr = getConnectionStr(
      this.connectionMetadata,
      isPolling ? this.connectOptions.pollingHost : undefined,
    );
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
     * 2- Timed out connection request
     * 3- ContainerState.SLEEP command
     * 4- User calling `close` before we connect
     */
    let onFailed: ((err: Error, retriable?: boolean) => void) | null = null;

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

      let retriable = true;
      let errorMessage = 'WebSocket closed before we got READY';

      if (WebSocketClass === EIOCompat) {
        if (!didReceiveAnyCommand) {
          // The polling implementation doesn't convey the Websocket close
          // event. Let's assume that we need to request a new token.
          this.connectionMetadata = null;
        }
      } else if ('code' in event) {
        const closeEvent = <CloseEvent>event;
        if (closeEvent.code === CloseCode.POLICY_VIOLATION) {
          // This means that the token was rejected. Even though this is a
          // permanent error from the perspective of the infrastructure, most
          // of the time it can be corrected by fetching a new token, since
          // this happens during cluster transfers most of the time (although
          // sometimes it also happens when a particular Repl is taken down).
          // TODO: Make the takedown case return an USER_ERROR to have more
          // clarity about why the Repl couldn't run.
          this.connectionMetadata = null;
        } else if (closeEvent.code === CloseCode.USER_ERROR) {
          errorMessage = 'Repl not allowed to run at this time. Please try again later.';
          retriable = false;
        } else if (closeEvent.code === CloseCode.FIREWALL_DENIED) {
          errorMessage = "Can't connect to unfirewalled repl from firewall mode";
          retriable = false;
        } else if (closeEvent.code === CloseCode.CONCURRENT_REPL_LIMIT) {
          errorMessage =
            'You have reached the concurrent Repl limit. Please shut down other Repls.';
          retriable = false;
        }
      }

      onFailed(new Error(errorMessage), retriable);
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
      cancelTimeout = () => {
        this.debug({ type: 'breadcrumb', message: 'cancel timeout' });

        if (this.connectTimeoutId) {
          clearTimeout(this.connectTimeoutId);
          this.connectTimeoutId = null;
        }
      };

      resetTimeout = () => {
        this.debug({ type: 'breadcrumb', message: 'reset timeout' });

        if (this.connectTimeoutId) {
          clearTimeout(this.connectTimeoutId);
        }

        this.connectTimeoutId = setTimeout(() => {
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
     * If we ever get a ContainerState READY we can officially
     * say that the connection is successful and we open chan0 and other `chanReq`s
     *
     * If we ever get ContainerState SLEEP it means that something went wrong
     * and connection should be dropped
     */
    const unlistenChan0 = chan0.onCommand((cmd: api.Command) => {
      didReceiveAnyCommand = true;
      // Every time we get a message on channel0
      // we will reset the timeout
      resetTimeout();

      if (cmd.firewallDenied != null) {
        this.onFirewallDenied();

        return;
      }

      if (cmd.containerState == null) {
        return;
      }

      if (cmd.containerState.state == null) {
        this.onUnrecoverableError(new Error('Got containerState but state was not defined'));

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

          this.handleConnect(chan0);

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

    const currentChan0 = this.getChannel(0);
    const currentConnectOptions = this.connectOptions;

    onFailed = (error: Error, retriable = true) => {
      // Make sure this function is not called multiple times.
      onFailed = null;

      // Cleanup related to this connection try. If we retry connecting a new `WebSocket` instance
      // will be used in addition to new `cancelTimeout` and `unlistenChan0` functions.
      this.cleanupSocket();
      cancelTimeout();
      unlistenChan0();

      if (this.connectOptions !== currentConnectOptions || this.getChannel(0) !== currentChan0) {
        this.onUnrecoverableError(
          new Error('onFailed got called but client is in a different connecting context'),
        );

        return;
      }

      if (!retriable) {
        this.onUnrecoverableError(error);
        return;
      }

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
      this.onUnrecoverableError(new Error('Unexpected existing retryTimeoutId'));

      return;
    }

    if (!this.chan0Cb) {
      this.onUnrecoverableError(new Error('Expected chan0Cb when scheduling a retry'));

      return;
    }

    if (!this.connectOptions) {
      this.onUnrecoverableError(new Error('Expected connectOptions when scheduling a retry'));

      return;
    }

    if (tryCount >= MAX_RETRY_COUNT && this.redirectInitiatorURL) {
      this.debug({
        type: 'breadcrumb',
        message: 'redirectInitiatorFallback',
        data: {
          connectionState: this.connectionState,
          connectTries: tryCount,
          websocketFailureCount,
          error,
          wsReadyState: this.ws ? this.ws.readyState : undefined,
        },
      });
      return this.redirectInitiatorFallback();
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

      this.setConnectionState(ConnectionState.DISCONNECTED);
      this.connect({ tryCount, websocketFailureCount });
    }, this.connectOptions.getNextRetryDelayMs(tryCount));
  };

  /** @hidden */
  private send = (cmd: api.Command) => {
    const channel = this.getChannel(cmd.channel);
    this.debug({
      type: 'log',
      log: {
        direction: 'out',
        channel: {
          id: cmd.channel,
          name: channel.name,
          service: channel.service,
        },
        cmd,
      },
    });

    const cmdBuf = api.Command.encode(cmd).finish();
    const buffer = cmdBuf.buffer.slice(cmdBuf.byteOffset, cmdBuf.byteOffset + cmdBuf.length);

    if (this.ws == null) {
      this.debug({
        type: 'breadcrumb',
        message: 'calling send on a closed client',
        data: {
          channelId: cmd.channel,
        },
      });

      this.onUnrecoverableError(new Error('Calling send on a closed client'));

      return;
    }

    this.ws.send(buffer);
  };

  /** @hidden */
  private onSocketMessage = ({ data }: MessageEvent) => {
    const d = new Uint8Array(data);
    const cmd = api.Command.decode(d);
    const channel = this.getChannel(cmd.channel);

    this.debug({
      type: 'log',
      log: {
        direction: 'in',
        channel: {
          id: cmd.channel,
          name: channel.name,
          service: channel.service,
        },
        cmd,
      },
    });

    // Pass it to the right channel
    channel.handleCommand(cmd);
  };

  /**
   * Called when chan0 connects. Opens all other required channels
   *
   * @hidden
   */
  private handleConnect = (chan0: Channel) => {
    if (!this.ws) {
      this.onUnrecoverableError(new Error('Expected Websocket instance'));

      return;
    }

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

    // Update socket closure to do something else
    const onClose = (event: CloseEvent | Event) => {
      if (this.getConnectionState() === ConnectionState.DISCONNECTED) {
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
    this.ws.onerror = onClose;

    // defer closing if the user decides to call client.close inside a callback.
    const originalClose = this.close;
    this.close = (args) =>
      setTimeout(() => {
        originalClose(args);
      }, 0);

    // connection state possibly has a listener, so it needs the deferred close.
    // note that CONNECTED fires _before_ the chan0Cb to match the
    // original behavior of state being CONNECTED inside the chan0Cb.
    this.setConnectionState(ConnectionState.CONNECTED);
    this.debug({ type: 'breadcrumb', message: 'connected!' });

    this.channelRequests.forEach((channelRequest) => {
      this.requestOpenChannel(channelRequest);
    });

    // chan0Cb definitely has a callback.
    this.chan0CleanupCb = this.chan0Cb({
      channel: chan0,
      context: this.connectOptions.context,
    });

    this.close = originalClose;
  };

  /** @hidden */
  private handleClose = (closeResult: CloseResult) => {
    if (closeResult.closeReason !== ClientCloseReason.Error) {
      // If we got here as a result of an error we'll ignore these assertions to avoid
      // infinite recursion in onUnrecoverableError
      if (this.getConnectionState() === ConnectionState.DISCONNECTED) {
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
      this.retryTimeoutId = null;
    }

    if (this.connectTimeoutId) {
      // Client was closed while waiting for connection
      clearTimeout(this.connectTimeoutId);
      this.connectTimeoutId = null;
    }

    if (this.fetchTokenAbortController) {
      this.fetchTokenAbortController.abort();
      this.fetchTokenAbortController = null;
    }

    const willClientReconnect =
      closeResult.closeReason === ClientCloseReason.Disconnected ||
      closeResult.closeReason === ClientCloseReason.Temporary;

    this.channelRequests.forEach((channelRequest) => {
      const willChannelReconnect: boolean = willClientReconnect && !channelRequest.closeRequested;

      this.debug({
        type: 'breadcrumb',
        message: 'handle channel close',
        data: {
          channelRequestIsOpen: channelRequest.isOpen,
          willChannelReconnect,
          hasWs: Boolean(this.ws),
          channelId: channelRequest.channelId,
        },
      });

      if (channelRequest.isOpen) {
        const channel = this.getChannel(channelRequest.channelId);
        channel.handleClose({
          initiator: 'client',
          willReconnect: willChannelReconnect,
        });
        delete this.channels[channelRequest.channelId];
      }

      const { cleanupCb, closeRequested } = channelRequest;

      // Re-set the channel request's state
      // TODO we should stop relying on mutating the same channelRequest
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
    } else if (!this.chan0Cb && closeResult.closeReason !== ClientCloseReason.Error) {
      // if we got here as a result of an error we're not gonna call onUnrecoverableError again
      this.onUnrecoverableError(
        new Error(
          '`open` should have been called before `handleClose` (no cleanup or callback function, ' +
            (willClientReconnect ? 'would reconnect' : 'would not reconnect') +
            ')',
        ),
      );

      return;
    }

    this.setConnectionState(ConnectionState.DISCONNECTED);

    if (!willClientReconnect) {
      // Client is done being used until the next `open` call.

      this.chan0Cb = null;
      this.connectOptions = null;

      this.debug({
        type: 'breadcrumb',
        message: 'client closed',
      });

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

    // Replace existing error handler so an error doesn't get thrown.
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

    this.redirectInitiatorURL = null;

    if (this.getConnectionState() !== ConnectionState.DISCONNECTED) {
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

  private redirectInitiatorFallback = () => {
    if (!this.connectionMetadata) {
      return this.onUnrecoverableError(
        new Error("client's connectionMetadata is null when redirecting to initiator"),
      );
    }
    if (!this.connectOptions) {
      return this.onUnrecoverableError(
        new Error("client's connectOptions is null when redirecting to initiator"),
      );
    }

    if (!this.chan0Cb) {
      return this.onUnrecoverableError(
        new Error("client's chan0Cb is null when redirecting to initiator"),
      );
    }
    const context = this.connectOptions.context;
    const chan0Cb = this.chan0Cb;
    const govalMetadata: GovalMetadata = {
      token: this.connectionMetadata.token,
      conmanURL: this.connectionMetadata.conmanURL,
      gurl: this.connectionMetadata.gurl,
    };
    this.redirectInitiatorURL = null;
    const fetchConnectionMetadataResult: FetchConnectionMetadataResult = {
      error: null,
      ...govalMetadata,
    };
    this.close();

    this.open(
      {
        fetchConnectionMetadata: () => Promise.resolve(fetchConnectionMetadataResult),
        WebSocketClass: WebSocket,
        context: context,
      },
      chan0Cb,
    );
  };

  private handleRedirect = (url: string) => {
    this.debug({
      type: 'breadcrumb',
      message: 'handling redirect',
      data: {
        connectionMetadata: this.connectionMetadata,
      },
    });
    if (!this.connectionMetadata) {
      return this.onUnrecoverableError(
        new Error("client's connectionMetadata is null when redirecting"),
      );
    }
    if (!this.connectOptions) {
      return this.onUnrecoverableError(
        new Error("client's connectOptions is null when redirecting"),
      );
    }

    if (!this.chan0Cb) {
      return this.onUnrecoverableError(new Error("client's chan0Cb is null when redirecting"));
    }
    const context = this.connectOptions.context;
    const chan0Cb = this.chan0Cb;
    const govalMetadata: GovalMetadata = {
      token: this.connectionMetadata.token,
      conmanURL: this.connectionMetadata.conmanURL,
      gurl: url,
    };
    this.redirectInitiatorURL = this.connectionMetadata.gurl;
    const fetchConnectionMetadataResult: FetchConnectionMetadataResult = {
      error: null,
      ...govalMetadata,
    };
    this.close();

    this.open(
      {
        fetchConnectionMetadata: () => Promise.resolve(fetchConnectionMetadataResult),
        WebSocketClass: WebSocket,
        context: context,
      },
      chan0Cb,
    );
  };
}
