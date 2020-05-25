import { api } from '@replit/protocol';
import { Channel } from './channel';
import { ChannelCloseReason } from './closeReasons';

interface ChannelRequest {
  name?: string;
  service: string;
  action?: api.OpenChannel.Action;
}

export interface ChannelProvderOptions extends ChannelRequest {
  onOpen: (channel: Channel) => void;
  onClose: (chanCloseReason: ChannelCloseReason) => void;
  onOpenError: (error: Error) => void;
}

export class ChannelProvder {
  private channelRequest: ChannelRequest;

  private channel: Channel | null;

  /**
   * Called when a channel is successfully opened (i.e. recieved openChanRes on chan0)
   * @asMemberOf Channel
   * @event
   */
  private onOpen: (channel: Channel) => void;

  private onClose: (chanCloseReason: ChannelCloseReason) => void;

  /**
   * Called when there's an error while the channel is opening, close is emitted right after
   * @asMemberOf Channel
   * @event
   */
  public onOpenError: (error: Error) => void;

  private ref: string;

  constructor({ onOpen, onClose, onOpenError, ...channelRequest }: ChannelProvderOptions) {
    this.channelRequest = channelRequest;
    this.onOpen = onOpen;
    this.onClose = onClose;
    this.onOpenError = onOpenError;
    this.channel = null;
    this.ref = '';
  }

  public openChannel({ chan0, send }: { chan0: Channel; send: (cmd: api.Command) => void }) {
    // Random base36 int
    this.ref = Number(
      Math.random()
        .toString()
        .split('.')[1],
    ).toString(36);

    // avoid warnings on listener count
    chan0.setMaxListeners(chan0.getMaxListeners() + 1);
    chan0.send({
      // Using this.ref to ignore unrelated responses (including previous openChannel calls
      // that didn't responed yet
      ref: this.ref,
      openChan: this.channelRequest,
    });

    const onResponse = (cmd: api.Command) => {
      if (this.ref !== cmd.ref) {
        return;
      }

      if (cmd.openChanRes == null) {
        throw new Error('Expected openChanRes on command');
      }

      const { id, state, error } = cmd.openChanRes;

      // if (!id || !state) {
      if (!id) {
        throw new Error('Expected state and channel id');
      }

      if (state === api.OpenChannelRes.State.ERROR) {
        // this.debug({ type: 'breadcrumb', message: 'error', data: error });

        this.onOpenError(new Error(error || 'Something went wrong'));

        return;
      }

      this.channel = new Channel({
        id,
        send,
        state: state || null,
      });

      this.channel.on('close', this.onClose);

      this.onOpen(this.channel);

      chan0.setMaxListeners(chan0.getMaxListeners() - 1);
      chan0.off('command', onResponse);
    };

    chan0.on('command', onResponse);
  }

  public close() {
    if (!this.channel) {
      throw new Error('Expected channel');
    }

    this.channel.close();
  }
}
