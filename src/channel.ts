import { EventEmitter } from 'events';
import { api } from '@replit/protocol';
import { ChannelCloseReason } from './closeReasons';

export interface RequestResult extends api.Command {
  channelClosed?: ChannelCloseReason;
}

type OnCloseFn = (reason: ChannelCloseReason) => void;

export type OpenChannelRes = { error: null; channel: Channel } | { error: Error; channel: null };
export type OpenChannelCb = (res: OpenChannelRes) => void | OnCloseFn;

export interface ChannelOptions {
  name?: string;
  service: string;
  action?: api.OpenChannel.Action;
}

export class Channel extends EventEmitter {
  // public
  public state: api.OpenChannelRes.State.CREATED | api.OpenChannelRes.State.ATTACHED | null;

  public id: number | null;

  public closed: boolean;

  private sendToClient: ((cmd: api.Command) => void) | null;

  private requestMap: { [ref: string]: (res: RequestResult) => void };

  private openChannelCb: OpenChannelCb;

  private openChannelCbClose: ReturnType<OpenChannelCb> | null;

  constructor(config: { openChannelCb: OpenChannelCb }) {
    super();

    this.id = null;
    this.sendToClient = null;
    this.state = null;
    this.closed = false;
    this.requestMap = {};
    this.openChannelCb = config.openChannelCb;
    this.openChannelCbClose = null;
  }

  public onCommand = (listener: (cmd: api.Command) => void) => {
    this.on('command', listener);

    return () => this.removeListener('command', listener);
  };

  /**
   * Closes the channel
   *
   * see http://protodoc.turbio.repl.co/protov2#closing-channels
   * @param action [[api.OpenChannel.Action]] specifies how you want to close the channel
   */
  public close = (action: api.CloseChannel.Action = api.CloseChannel.Action.TRY_CLOSE) => {
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
  public request = async (cmdJson: api.ICommand): Promise<RequestResult> => {
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

    this.openChannelCbClose = this.openChannelCb({ channel: this, error: null });
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
    Object.keys(this.requestMap).forEach((ref) => {
      const requestResult = api.Command.fromObject({}) as RequestResult;
      requestResult.channelClosed = reason;
      this.requestMap[ref](requestResult);
      delete this.requestMap[ref];
    });

    this.closed = true;

    if (this.openChannelCbClose) {
      this.openChannelCbClose(reason);
      this.openChannelCbClose = null;
    }

    this.removeAllListeners();
  };

  /**
   * @hidden should only be called by [[Client]]
   *
   * Called when the channel has an error opening
   */
  public handleError = (error: Error) => {
    this.openChannelCb({ error, channel: null });
    this.openChannelCbClose = null;
    this.removeAllListeners();
  };
}
