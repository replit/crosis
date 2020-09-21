import { EventEmitter } from 'events';
import { api } from '@replit/protocol';
import { ChannelCloseReason } from './types';

export interface RequestResult extends api.Command {
  channelClosed?: ChannelCloseReason;
}

/**
 * This function gets called when a channel opens or there is an error opening.
 * It can return a function that can be used to cleanup an logic when the channle closes.
 * If there is an error opening the channel the cleanup function is not called. You can
 * think of it as a stream of values that terminates if/when there is an error. A `skip`
 * function may be provided to skip opening the channel conditionally on every reconnection.
 *
 * Example:
 *
 * const closeChannel = client.openChannel({
 *   service: 'shell',
 *   skip: () => !something.supportsShell(),
 * }, ({ channel, error }) => {
 *   if (error) {
 *     // Bail, channel had an error connecting or reconnecting
 *     // Tihs callback will no longer be called
 *     return
 *   }
 *
 *   // Channel is open, setup `channel` logic
 *   // This could be the result of initial connection or a subsequent reconnect
 *
 *   return (reason) => {
 *     // Channel closed, cleanup relevant logic
 *     // We might reconnect after this
 *   }
 * })
 *
 * // Eventually when done using the channel you can close it
 * closeChannel() // Will call potential returned cleanup function
 *
 */
export type OpenChannelCb<Ctx> = (res: OpenChannelRes<Ctx>) => void | OnCloseFn;

type OnCloseFn = (reason: ChannelCloseReason) => void;

export type OpenChannelRes<Ctx> =
  | { error: null; channel: Channel<Ctx>; context: Ctx }
  | { error: Error; channel: null; context: Ctx };

export class Channel<Ctx> {
  public state: api.OpenChannelRes.State.CREATED | api.OpenChannelRes.State.ATTACHED | null;

  public id: number | null;

  public closed: boolean;

  private sendToClient: ((cmd: api.Command) => void) | null;

  private requestMap: { [ref: string]: (res: RequestResult) => void };

  private openChannelCb: OpenChannelCb<Ctx>;

  private emitter: EventEmitter;

  private openChannelCbClose: ReturnType<OpenChannelCb<Ctx>> | null;

  private onUnrecoverableError: (e: Error) => void;

  constructor(
    config: { openChannelCb: OpenChannelCb<Ctx> },
    onUnrecoverableError: (e: Error) => void,
  ) {
    this.id = null;
    this.sendToClient = null;
    this.state = null;
    this.closed = false;
    this.requestMap = {};
    this.openChannelCb = config.openChannelCb;
    this.openChannelCbClose = null;
    this.emitter = new EventEmitter();
    this.onUnrecoverableError = onUnrecoverableError;
  }

  public onCommand = (listener: (cmd: api.Command) => void) => {
    if (this.closed) {
      const e = new Error('Trying to listen to commands on a closed channel');
      this.onUnrecoverableError(e);

      throw e;
    }

    this.emitter.on('command', listener);

    return () => this.emitter.removeListener('command', listener);
  };

  /**
   * Closes the channel
   *
   * see http://protodoc.turbio.repl.co/protov2#closing-channels
   * @param action [[api.OpenChannel.Action]] specifies how you want to close the channel
   */
  public close = (action: api.CloseChannel.Action = api.CloseChannel.Action.TRY_CLOSE) => {
    if (this.closed === true) {
      const e = new Error('Channel already closed');
      this.onUnrecoverableError(e);

      throw e;
    }

    const cmd = api.Command.create({
      channel: 0,
      closeChan: {
        action,
        id: this.id,
      },
    });

    if (!this.sendToClient) {
      const e = new Error('Expected sendToClient');
      this.onUnrecoverableError(e);

      throw e;
    }

    // Send close command to chan0
    this.sendToClient(cmd);
    this.closed = true;
  };

  /**
   * Receives a command and sends it over the wire
   * along with the channel id.
   * @param cmdJson shape of a command see [[api.ICommand]]
   */
  public send = (cmdJson: api.ICommand) => {
    if (!this.sendToClient) {
      const e = new Error('Sending on a channel that never opened');
      this.onUnrecoverableError(e);

      throw e;
    }

    if (this.closed) {
      const e = new Error('Calling send on closed channel');
      this.onUnrecoverableError(e);

      throw e;
    }

    cmdJson.channel = this.id;
    this.sendToClient(api.Command.create(cmdJson));
  };

  /**
   * Sends a command to the channel and returns a promise
   * that is resolved when we get a response.
   * @param cmdJson shape of a command see [[api.ICommand]]
   */
  public request = async (cmdJson: api.ICommand): Promise<RequestResult> => {
    if (this.closed) {
      const e = new Error('Calling request on closed channel');
      this.onUnrecoverableError(e);

      throw e;
    }

    // Random base36 int
    const ref = Number(Math.random().toString().split('.')[1]).toString(36);
    cmdJson.ref = ref;

    return new Promise((resolve) => {
      this.requestMap[ref] = resolve;

      this.send(cmdJson);
    });
  };

  /**
   * @hidden should only be called by [[Client]]
   *
   * Called when the channel opens
   */
  public handleOpenRes = ({
    id,
    state,
    send,
    context,
  }: {
    id: number;
    state: api.OpenChannelRes.State.CREATED | api.OpenChannelRes.State.ATTACHED;
    send: (cmd: api.Command) => void;
    context: Ctx;
  }) => {
    this.id = id;
    this.sendToClient = send;
    this.state = state;

    this.openChannelCbClose = this.openChannelCb({ channel: this, error: null, context });
  };

  /**
   * @hidden should only be called by [[Client]]
   *
   * Called when the channel recieves a message
   */
  public handleCommand = (cmd: api.Command) => {
    if (this.closed) {
      // Ignore commands coming in after close.
      // this can happen if we requested a close and there are
      // still commands that are processed before our close request
      return;
    }

    this.emitter.emit('command', cmd);

    if (cmd.ref && this.requestMap[cmd.ref]) {
      this.requestMap[cmd.ref](cmd);
      delete this.requestMap[cmd.ref];
    }
  };

  /**
   * @hidden should only be called by [[Client]]
   *
   * Called when the channel or client is closed
   */
  public handleClose = (reason: ChannelCloseReason, context: Ctx) => {
    Object.keys(this.requestMap).forEach((ref) => {
      const requestResult = api.Command.fromObject({}) as RequestResult;
      requestResult.channelClosed = reason;
      this.requestMap[ref](requestResult);
      delete this.requestMap[ref];
    });

    if (reason.initiator === 'channel' && !this.closed) {
      const e = new Error('Expected channel to be marked as closed when the initiator is channel');
      this.onUnrecoverableError(e);
      // Do some cleanup regardless
      this.closed = true;
      this.emitter.removeAllListeners();

      throw e;
    }

    if (reason.initiator === 'channel' && !this.openChannelCbClose) {
      const e = new Error(
        'Expected openChannelCbClose to be truthy when the close intiator is the channel',
      );
      this.onUnrecoverableError(e);
      // Do some cleanup regardless
      this.closed = true;
      this.emitter.removeAllListeners();

      return;
    }

    if (this.openChannelCbClose) {
      // The channel opened previously and we need to send the close reason
      // to the close callback supplied to us by the user
      this.openChannelCbClose(reason);
      this.openChannelCbClose = null;

      return;
    }

    if (reason.willReconnect) {
      // We never got to open a channel, and we will reconnect
      // no need to do anything as we never the open callback
      return;
    }

    // We never opened the channel and we will never open
    // report to the openChannelCb
    this.openChannelCb({
      error: new Error('Failed to open'),
      channel: null,
      context,
    });
  };

  /**
   * @hidden should only be called by [[Client]]
   *
   * Used to avoid warnings on listener count
   */

  setMaxListeners(count: number) {
    this.emitter.setMaxListeners(count);
  }

  /**
   * @hidden should only be called by [[Client]]
   *
   * Used to avoid warnings on listener count
   */

  getMaxListeners() {
    return this.emitter.getMaxListeners();
  }
}
