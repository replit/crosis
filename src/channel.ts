import { api } from '@replit/protocol';
import type { ChannelCloseReason, RequestResult } from './types';

export class Channel {
  /**
   * The channel's id, this is supplied to us by the container
   */
  public id: number;

  /**
   * The name of the channel.
   */
  public readonly name?: string;

  /**
   * The name of the service associated with the channel.
   */
  public readonly service?: string;

  /**
   * The current connection status of the channel.
   * When the channel is open or closing you can potentially
   * receive commands on the channel.
   * You can only send to the channel when it's open
   */
  public status: 'open' | 'closed' | 'closing';

  /**
   * Sends the command to the container
   *
   * @hidden
   */
  private sendToContainer: (cmd: api.Command) => void;

  /**
   * A map of request reference id to resolver function generated
   * when `channel.request` is called.
   * Once we receive a response with the same reference id
   * we look up this map and resolve the request.
   *
   * @hidden
   */
  private requestMap: { [ref: string]: (res: RequestResult) => void };

  /**
   * Make shift event emitter listener array. Any time `onCommand`
   * is called we push the callback into this array.
   * When we receive a command from the client through
   * `handleCommand` we call all the callbacks in this array
   *
   * @hidden
   */
  private onCommandListeners: Array<(cmd: api.Command) => void>;

  /**
   * Supplied to us by the client to call when something wonky happens.
   *
   * @hidden
   */
  private onUnrecoverableError: (e: Error) => void;

  /**
   * @hidden should only be called by [[Client]]
   */
  constructor({
    id,
    name,
    service,
    send,
    onUnrecoverableError,
  }: {
    id: number;
    name?: string;
    service?: string;
    send: (cmd: api.Command) => void;
    onUnrecoverableError: (e: Error) => void;
  }) {
    this.id = id;
    this.name = name;
    this.service = service;
    this.sendToContainer = send;
    this.onUnrecoverableError = onUnrecoverableError;
    this.status = 'open';
    this.requestMap = {};
    this.onCommandListeners = [];
  }

  /**
   * To listen to commands received by this channel, supply a
   * a callback to this function and the callback will be called
   * any time we receive a command on this channel.
   *
   * @param listener the command listener
   * @returns a function to stop listening
   */
  public onCommand = (listener: (cmd: api.Command) => void): (() => void) => {
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
   * Sends a command on the channel
   *
   * @param cmdJson shape of a command see [[api.ICommand]]
   */
  public send = (cmdJson: api.ICommand): void => {
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
    this.sendToContainer(api.Command.create(cmdJson));
  };

  /**
   * Sends a command on the channel and returns a promise
   * that is resolved when we get a response.
   *
   * Be ware, not all messages can have a result, so the promise
   * might never resolve.
   *
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
   * Called when the channel receives a message
   */
  public handleCommand = (cmd: api.Command): void => {
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
  public handleClose = (reason: ChannelCloseReason): void => {
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
