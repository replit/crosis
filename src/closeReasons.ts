import { api } from '@replit/protocol';

// In a separate file to circular dependencies in client and channel

// eslint-disable-next-line no-shadow
export enum ClientCloseReason {
  /**
   * called `client.close`
   */
  Intentional,
  /**
   * The websocket connection died
   */
  Disconnected,
}

// Channel close can either be due to client closing
// or a close channel request
export type ChannelCloseReason =
  | {
      initiator: 'client';
      clientCloseReason: ClientCloseReason;
    }
  | {
      initiator: 'channel';
      closeStatus: api.CloseChannelRes.Status;
    };
