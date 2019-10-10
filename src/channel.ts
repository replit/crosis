import { EventEmitter } from 'events';
import { api } from '../protocol/api';
import { createDeferred, Deferred } from './deferred';

class Channel extends EventEmitter {
  // static
  public static ChannelClosedErrorMessage = 'Channel closed';

  // public
  public state: api.OpenChannelRes.State.CREATED | api.OpenChannelRes.State.ATTACHED | null;

  public id: number | null;

  public isOpen: boolean;

  public closed: boolean;

  // private
  private sendQueue: Array<api.ICommand>;

  private sendToClient: (cmd: api.Command) => void;

  private requestMap: { [ref: string]: Deferred<api.Command> };

  constructor() {
    super();

    this.state = null;
    this.id = null;
    this.isOpen = false;
    this.closed = false;
    this.sendQueue = [];
    this.sendToClient = this.enqueueSend;
    this.requestMap = {};
  }

  /**
   * Receives a command and sends it over the wire
   * along with the channel id.
   * @param cmdJson shape of a command see [[api.ICommand]]
   */
  public send = (cmdJson: api.ICommand) => {
    cmdJson.channel = this.id;
    this.sendToClient(api.Command.create(cmdJson));
  };

  /**
   * Sends a command to the channel and returns a promise
   * that is resolved when we get a response.
   * @param cmdJson shape of a command see [[api.ICommand]]
   */
  public request = async (cmdJson: api.ICommand): Promise<api.Command> => {
    // Random base36 int
    const ref = Number(
      Math.random()
        .toString()
        .split('.')[1],
    ).toString(36);
    const deferred = createDeferred<api.Command>();
    this.requestMap[ref] = deferred;

    cmdJson.ref = ref;
    this.send(cmdJson);

    return deferred.promise;
  };

  /**
   * Closes the channel
   */
  public close = async (): Promise<api.ICloseChannelRes> => {
    if (this.closed === true) {
      throw new Error('Channel already closed');
    }

    const cmd = api.Command.create({
      channel: 0,
      closeChan: {
        action: api.CloseChannel.Action.TRY_CLOSE,
        id: this.id,
      },
    });
    this.sendToClient(cmd);

    this.onCommand = () => undefined;
    this.send = () => undefined;
    this.closed = true;

    return new Promise((resolve) => {
      this.once('close', (closeRes) => {
        resolve(closeRes);
      });
    });
  };

  /**
   * @hidden should only be called by [[Client]]
   *
   * Called when the openChanRes is received
   */
  public onOpen = (
    id: number,
    state: api.OpenChannelRes.State.CREATED | api.OpenChannelRes.State.ATTACHED,
    send: (cmd: api.Command) => void,
  ) => {
    this.id = id;
    this.sendToClient = send;
    this.state = state;
    this.isOpen = true;

    let cmd = this.sendQueue.shift();
    while (cmd) {
      // It will set the right channel id and send it
      this.send(cmd);

      cmd = this.sendQueue.shift();
    }

    this.emit('open');
  };

  /**
   * @hidden should only be called by [[Client]]
   *
   * Called when the openChanRes is received with error
   */
  public onOpenError = ({ error: err }: api.IOpenChannelRes) => {
    this.emit('error', { message: err || '' });
  };

  /**
   * @hidden should only be called by [[Client]]
   *
   * Called when the channel recieves a message
   */
  public onCommand = (cmd: api.Command) => {
    this.emit('command', cmd);

    if (cmd.ref && this.requestMap[cmd.ref]) {
      this.requestMap[cmd.ref].resolve(cmd);
      delete this.requestMap[cmd.ref];
    }
  };

  /**
   * @hidden should only be called by [[Client]]
   *
   * Called when the channel is or client is closed
   */
  public onClose = (closeChanRes: api.ICloseChannelRes) => {
    Object.keys(this.requestMap).forEach((ref) => {
      this.requestMap[ref].reject(new Error(Channel.ChannelClosedErrorMessage));
      delete this.requestMap[ref];
    });

    this.isOpen = false;
    this.closed = true;
    this.emit('close', closeChanRes);
    this.removeAllListeners();
  };

  private enqueueSend = (cmd: api.ICommand) => this.sendQueue.push(cmd);
}

/**
 * Emitted whenever this channel recieves a command
 * @asMemberOf Channel
 * @event
 */
declare function command(cmd: api.Command): void;

/**
 * Emitted when there's an error while the channel is opening, close is emitted right after
 * @asMemberOf Channel
 * @event
 */
declare function error({ message }: { message: string }): void;

/**
 * Emitted when a channel is successfully opened (i.e. recieved openChanRes on chan0)
 * @asMemberOf Channel
 * @event
 */
declare function open(): void;

/**
 * Emitted when there's an error while the channel is opening
 * @asMemberOf Channel
 * @event
 */
declare function close(closeChanRes: api.ICloseChannelRes): void;

declare interface Channel extends EventEmitter {
  on(event: 'command', listener: typeof command): this;
  on(event: 'error', listener: typeof error): this;
  on(event: 'close', listener: typeof close): this;
  on(event: 'open', listener: typeof open): this;
  addListener(event: 'command', listener: typeof command): this;
  addListener(event: 'error', listener: typeof error): this;
  addListener(event: 'close', listener: typeof close): this;
  addListener(event: 'open', listener: typeof open): this;

  once(event: 'command', listener: typeof command): this;
  once(event: 'error', listener: typeof error): this;
  once(event: 'close', listener: typeof close): this;
  once(event: 'open', listener: typeof open): this;

  prependListener(event: 'command', listener: typeof command): this;
  prependListener(event: 'error', listener: typeof error): this;
  prependListener(event: 'close', listener: typeof close): this;
  prependListener(event: 'open', listener: typeof open): this;

  prependOnceListener(event: 'command', listener: typeof command): this;
  prependOnceListener(event: 'error', listener: typeof error): this;
  prependOnceListener(event: 'close', listener: typeof close): this;
  prependOnceListener(event: 'open', listener: typeof open): this;

  off(event: 'command', listener: typeof command): this;
  off(event: 'error', listener: typeof error): this;
  off(event: 'close', listener: typeof close): this;
  off(event: 'open', listener: typeof open): this;
  removeListener(event: 'command', listener: typeof command): this;
  removeListener(event: 'error', listener: typeof error): this;
  removeListener(event: 'close', listener: typeof close): this;
  removeListener(event: 'open', listener: typeof open): this;

  emit(event: 'command', ...args: Parameters<typeof command>): boolean;
  emit(event: 'error', ...args: Parameters<typeof error>): boolean;
  emit(event: 'close', ...args: Parameters<typeof close>): boolean;
  emit(event: 'open', ...args: Parameters<typeof open>): boolean;

  removeAllListeners(event?: 'command' | 'error' | 'close' | 'open'): this;

  eventNames(): Array<'command' | 'error' | 'close' | 'open'>;
}

export { Channel };
