import { api } from '@replit/protocol';
import { ChannelCloseReason } from './types';

interface RequestResult extends api.Command {
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

export class Channel {
  public id: number;

  public status: 'open' | 'closed' | 'closing';

  private sendToClient: (cmd: api.Command) => void;

  private requestMap: { [ref: string]: (res: RequestResult) => void };

  private onCommandListeners: Array<(cmd: api.Command) => void>;

  private onUnrecoverableError: (e: Error) => void;

  constructor({
    id,
    send,
    onUnrecoverableError,
  }: {
    id: number;
    send: (cmd: api.Command) => void;
    onUnrecoverableError: (e: Error) => void;
  }) {
    this.id = id;
    this.sendToClient = send;
    this.onUnrecoverableError = onUnrecoverableError;
    this.status = 'open';
    this.requestMap = {};
    this.onCommandListeners = [];
  }

  public onCommand = (listener: (cmd: api.Command) => void) => {
    if (this.status === 'closed') {
      const e = new Error('Trying to listen to commands on a closed channel');
      this.onUnrecoverableError(e);

      throw e;
    }

    this.onCommandListeners.push(listener);

    return () => {
      this.onCommandListeners = this.onCommandListeners.filter((l) => l !== listener);
    };
  };

  /**
   * Receives a command and sends it over the wire
   * along with the channel id.
   * @param cmdJson shape of a command see [[api.ICommand]]
   */
  public send = (cmdJson: api.ICommand) => {
    if (this.status === 'closed') {
      const e = new Error('Calling send on closed channel');
      this.onUnrecoverableError(e);

      throw e;
    }

    if (this.status === 'closing') {
      const e = new Error('Cannot send any more commands after a close request');
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
    // Random base36 int
    const ref = Number(Math.random().toString().split('.')[1]).toString(36);
    cmdJson.ref = ref;

    return new Promise((resolve, reject) => {
      this.requestMap[ref] = resolve;

      try {
        this.send(cmdJson);
      } catch (e) {
        delete this.requestMap[ref];
        reject(e);
      }
    });
  };

  /**
   * @hidden should only be called by [[Client]]
   *
   * Called when the channel recieves a message
   */
  public handleCommand = (cmd: api.Command) => {
    this.onCommandListeners.forEach((l) => l(cmd));

    if (cmd.ref && this.requestMap[cmd.ref]) {
      this.requestMap[cmd.ref](cmd);
      delete this.requestMap[cmd.ref];
    }
  };

  /**
   * @hidden should only be called by [[Client]]
   *
   * Called when the channel or client is closed

   * concludes all the requests promises and cleans up
   * the onCommand listeners
   */
  public handleClose = (reason: ChannelCloseReason) => {
    Object.keys(this.requestMap).forEach((ref) => {
      const requestResult = api.Command.fromObject({}) as RequestResult;
      requestResult.channelClosed = reason;
      this.requestMap[ref](requestResult);
      delete this.requestMap[ref];
    });

    this.status = 'closed';
    this.onCommandListeners = [];
  };
}
