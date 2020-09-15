/**
 * This file contains types shared between the Channel and Client.
 */

import { api } from '@replit/protocol';

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
      willReconnect: boolean;
    }
  | {
      initiator: 'channel';
      willReconnect: false;
    };

export interface ChannelOptions<D = any> {
  name?: string;
  service: string;
  action?: api.OpenChannel.Action;
  skip?: (context: D) => boolean;
}
