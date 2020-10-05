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

interface ConnectOptionsWithToken<Ctx> {
  withPreconnectedSocket: false,
  fetchToken: (abortSignal: AbortSignal) => Promise<{ token: null, aborted: true } | { token: string, aborted: false }>;
  context: Ctx;
  urlOptions: UrlOptions;
  timeout: number | null;
  WebSocketClass?: typeof WebSocket;
}

interface ConnectOptionsWithSocket<Ctx> {
  withPreconnectedSocket: true,
  getSocket: (abortSignal: AbortSignal) => Promise<{ ws: null, aborted: true } | { ws: WebSocket, aborted: false }>;
  context: Ctx;
}

export type ConnectOptions<Ctx> = ConnectOptionsWithSocket<Ctx> | ConnectOptionsWithToken<Ctx>;


interface ConnectArgsWithToken<Ctx> extends Partial<ConnectOptionsWithToken<Ctx>> {
  context: Ctx,
  withPreconnectedSocket: false,
  fetchToken: (abortSignal: AbortSignal) => Promise<{ token: null, aborted: true } | { token: string, aborted: false }>;
}

export type ConnectArgs<Ctx> = ConnectOptionsWithSocket<Ctx> | ConnectArgsWithToken<Ctx>
