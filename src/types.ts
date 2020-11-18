import { api } from '@replit/protocol';

export enum ClientCloseReason {
  /**
   * called `client.close`
   */
  Intentional = 'Intentional',
  /**
   * The websocket connection died
   */
  Disconnected = 'Disconnected',
  /**
   * The client encountered an unrecoverable/invariant error
   */
  Error = 'Error',
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

export interface ChannelOptions<Ctx> {
  name?: string;
  service: string;
  action?: api.OpenChannel.Action;
  skip?: (context: Ctx) => boolean;
}

export interface UrlOptions {
  secure: boolean;
  host: string;
  port: string;
}

export interface GovalMetadata {
  token: string;
  gurl: string;
  conmanURL: string;
}

export interface ConnectOptions<Ctx> {
  fetchConnectionMetadata: (
    abortSignal: AbortSignal,
  ) => Promise<
    | { connectionMetadata: null; aborted: true }
    | { connectionMetadata: GovalMetadata; aborted: false }
  >;
  urlOptions: UrlOptions;
  timeout: number | null;
  WebSocketClass?: typeof WebSocket;
  context: Ctx;
}
