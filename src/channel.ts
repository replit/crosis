import { api } from '@replit/protocol';
import type { ChannelCloseReason, RequestResult } from './types';
import CrosisError from './util/CrosisError';

type CustomFallbackBehavior = (
  cmds: api.ICommand[],
  failedIndex: number,
  successfulResults: RequestResult[],
  failureResult: RequestResult,
) => Promise<RequestResult[]>;

type TransactionBehavior = 'retry' | 'continue' | 'throw' | 'ignore' | CustomFallbackBehavior;

class TransactionError extends Error {
  constructor(private error: Error) {
    super(error.message);
  }
}

class InvariantViolation extends Error {
  constructor(private error: Error) {
    super(error.message);
  }
}

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
  public readonly service: string;

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
  private onUnrecoverableError: (e: CrosisError) => void;

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
    service: string;
    send: (cmd: api.Command) => void;
    onUnrecoverableError: (e: CrosisError) => void;
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
      const e = new CrosisError(
        'Trying to listen to commands on a closed channel for ' + this.service,
        this.getExtras(),
        { service: this.service },
      );
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
      const e = new CrosisError(
        'Calling send on closed channel for ' + this.service,
        this.getExtras(cmdJson),
        { service: this.service },
      );
      this.onUnrecoverableError(e);

      throw e;
    }

    if (this.status === 'closing') {
      const e = new CrosisError(
        'Cannot send any more commands after a close request on channel for ' + this.service,
        this.getExtras(cmdJson),
        { service: this.service },
      );

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
   * For cross channel.
   *
   * transactions(() => {
   *   const useResult = channel.whatever();
   *
   *   useResult.something();
   *
   *   channel.another();
   * }, 'retry');
   */
  static transaction = async (
    fn: () => Promise<RequestResult>,
    behavior: Omit<TransactionBehavior, 'continue'>,
    invariant = (e: Error) => true,
  ) => {
    try {
      // TODO: check status closed somehow?

      const result = await fn();
      return result;
    } catch (e) {
      if (!(e instanceof Error)) {
        throw e;
      }

      if (!invariant(e)) {
        throw new InvariantViolation(e);
      }

      if (behavior === 'retry') {
        // TODO: add timeout/max retries.

        return transaction(fn, behavior);
      } else if (behavior === 'throw') {
        throw new TransactionError(e);
      } else if (behavior === 'ignore') {
        // do nothing
      }
    }
  };

  /**
   * For a given channel.
   *
   * transaction([
   *  { exec: { args: ['git', 'init'] }}
   *  { exec: { args: ['git', 'add', '.'] }}
   * ])
   */
  public transaction = async (
    cmds: api.ICommand[],
    behavior: TransactionBehavior,
    // TODO: maybe async pattern options, like serialize/fire-and-forget
  ): Promise<RequestResult[]> => {
    const responses = [];
    for (let i = 0; i < cmds.length; i++) {
      const response = await this.request(cmds[i]);

      if (response.channelClosed) {
        if (behavior === 'retry') {
          return this.transaction(cmds, behavior);
        } else if (behavior === 'continue') {
          return this.transaction(cmds.slice(i), behavior);
        } else if (behavior === 'throw') {
          throw new Error('Channel closed');
        } else if (typeof behavior === 'function') {
          return behavior(cmds, i, responses, response);
        } else if (behavior === 'ignore') {
          // the channel is closed, so we can't actually make any more requests
          // so we just return the responses we have.

          return responses;
        }

        throw new Error('Invalid behavior');
      }

      responses.push(response);
    }

    return responses;
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

  /**
   * Generate some information to be appended to an error.
   *
   * @param cmd  - the command that was being sent or received when the error occurred
   * @returns the extras field for the error.
   */
  private getExtras = (cmd: api.ICommand | null = null): Record<string, unknown> => {
    const commandExtras = cmd
      ? {
          command: cmd,
          // ref identifies if this was a request or a send.
          commandRef: cmd.ref,
          // keys retained separately to address potential privacy filtering.
          commandKeys: Object.keys(cmd),
        }
      : {};

    return {
      ...commandExtras,
      channelName: this.name,
      channelId: this.id,
    };
  };
}
