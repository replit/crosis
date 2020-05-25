import { EventEmitter } from 'events';
import { api } from '@replit/protocol';
import { ChannelCloseReason } from './closeReasons';

interface RequestResult extends api.Command {
  channelClosed?: ChannelCloseReason;
}

type SendFn = (cmd: api.ICommand) => void;

type RequestFn = (cmd: api.ICommand) => Promise<RequestResult>;

type OnOpenFn = (args: { send: SendFn; request: RequestFn }) => void;

type OnCloseFn = (reason: ChannelCloseReason) => void;

export interface ChannelOptions {
  name?: string;
  service: string;
  action?: api.OpenChannel.Action;
}

export class Channel extends EventEmitter {
  // public
  public state: api.OpenChannelRes.State.CREATED | api.OpenChannelRes.State.ATTACHED | null;

  public id: number | null;

  public isOpen: boolean;

  public options?: ChannelOptions;

  public closed: boolean;

  private sendToClient: ((cmd: api.Command) => void) | null;

  private requestMap: { [ref: string]: (res: RequestResult) => void };

  constructor(options?: ChannelOptions) {
    super();

    this.options = options;
    this.id = null;
    this.sendToClient = null;
    this.state = null;
    this.isOpen = false;
    this.closed = false;
    this.requestMap = {};
  }

  /**
   * Called every time channel connects
   */
  public onOpen = (listener: OnOpenFn) => {
    this.on('open', listener);

    return () => this.removeListener('open', listener);
  };

  /**
   * Called every time channel connects
   */
  public onClose = (listener: OnCloseFn) => {
    this.on('close', listener);

    return () => this.removeListener('close', listener);
  };

  /**
   * Called every time channel connects
   */
  public onError = (listener: (error: Error) => void) => {
    this.on('error', listener);

    return () => this.removeListener('error', listener);
  };

  /**
   * Closes the channel
   *
   * see http://protodoc.turbio.repl.co/protov2#closing-channels
   * @param action [[api.OpenChannel.Action]] specifies how you want to close the channel
   */
  public close = async (action: api.CloseChannel.Action = api.CloseChannel.Action.TRY_CLOSE) => {
    if (this.closed === true) {
      throw new Error('Channel already closed');
    }

    const cmd = api.Command.create({
      channel: 0,
      closeChan: {
        action,
        id: this.id,
      },
    });

    this.send(cmd);

    this.handleCommand = () => undefined;
    this.send = () => undefined;
    this.closed = true;
  };

  /**
   * @hidden get's passed to `onOpen` listener and called by [[Client]] to setup chan0
   *
   * Receives a command and sends it over the wire
   * along with the channel id.
   * @param cmdJson shape of a command see [[api.ICommand]]
   */
  public send = (cmdJson: api.ICommand) => {
    if (!this.sendToClient) {
      throw new Error('Sending on a closed channel');
    }

    cmdJson.channel = this.id;
    this.sendToClient(api.Command.create(cmdJson));
  };

  /**
   * Sends a command to the channel and returns a promise
   * that is resolved when we get a response.
   * @param cmdJson shape of a command see [[api.ICommand]]
   */
  private request = async (cmdJson: api.ICommand): Promise<RequestResult> => {
    // Random base36 int
    const ref = Number(
      Math.random()
        .toString()
        .split('.')[1],
    ).toString(36);
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
  public handleOpen = ({
    id,
    state,
    send,
  }: {
    id: number;
    state: api.OpenChannelRes.State.CREATED | api.OpenChannelRes.State.ATTACHED;
    send: (cmd: api.Command) => void;
  }) => {
    this.id = id;
    this.sendToClient = send;
    this.state = state;
    this.isOpen = true;

    this.emit('open', {
      send: this.send.bind(this),
      request: this.request.bind(this),
    });
  };

  /**
   * @hidden should only be called by [[Client]]
   *
   * Called when the channel recieves a message
   */
  public handleCommand = (cmd: api.Command) => {
    this.emit('command', cmd);

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
  public handleClose = (reason: ChannelCloseReason) => {
    // console.log('handleClose');
    Object.keys(this.requestMap).forEach((ref) => {
      const requestResult = api.Command.fromObject({}) as RequestResult;
      requestResult.channelClosed = reason;
      this.requestMap[ref](requestResult);
      delete this.requestMap[ref];
    });

    this.isOpen = false;
    this.closed = true;
    this.emit('close', reason);
  };

  /**
   * @hidden should only be called by [[Client]]
   *
   * Called when the channel has an error opening
   */
  public handleError = (error: Error) => {
    this.emit('error', error);
  };
}
