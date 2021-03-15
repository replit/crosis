import type { api } from '@replit/protocol';
import type { Channel } from './channel';

export enum ConnectionState {
  CONNECTING = 0,
  CONNECTED = 1,
  DISCONNECTED = 2,
}

export enum FetchConnectionMetadataError {
  /**
   * Fetch was aborted.
   */
  Aborted = 'Aborted',

  /**
   * The fetch failed due to a recoverable error (mostly a transient network
   * condition).
   */
  Retriable = 'Retriable',
}

export interface GovalMetadata {
  token: string;
  gurl: string;
  conmanURL: string;
}

/**
 * A type that helps signal whether an operation was successful or errored.
 */
export type Result<Res, Err = Error> = (Res & { error: null }) | { error: Err };

/** The result of `fetchConnectionMetadata` */
export type FetchConnectionMetadataResult = Result<
  GovalMetadata,
  Error | FetchConnectionMetadataError
>;

export interface ConnectOptions<Ctx> {
  fetchConnectionMetadata: (abortSignal: AbortSignal) => Promise<FetchConnectionMetadataResult>;
  timeout: number | null;
  WebSocketClass?: typeof WebSocket;
  context: Ctx;
}

export interface UrlOptions {
  secure: boolean;
  host: string;
  port: string;
}

/**
 * Connection options supplied to [[Client.open]]
 *
 * The only required option is `fetchConnectionMetadata` (falling back to
 * `fetchToken`), all others are optional and will use defaults.
 *
 * TODO(lhchavez): Once the migration is done, drop `fetchToken` and only use
 * `fetchConnectionMetadata`.
 */
export interface OpenOptions<Ctx> extends Partial<ConnectOptions<Ctx>> {
  fetchToken?: (
    abortSignal: AbortSignal,
  ) => Promise<{ token: null; aborted: true } | { token: string; aborted: false }>;
  urlOptions?: UrlOptions;
  context: Ctx;
}

/**
 * See [[Client.setDebugFunc]]
 */
export type DebugLog =
  | {
      type: 'breadcrumb';
      message: string;
      data?: unknown;
    }
  | {
      type: 'log';
      log: {
        direction: 'in' | 'out';
        cmd: api.Command;
      };
    };

/**
 * Called as an argument to the cleanup function
 * returned from [[OpenChannelCb]]
 *
 * Channel closed because of the client
 * this can be due to unexpected disconnects
 * in which case `willReconnect` will be true
 * or intentional closure via [[Client.close]]
 * in which case willReconnect will be false
 *
 * or
 *
 * Channel closed because the close function
 * returned from [[Client.openChannel]] is called
 */
export type ChannelCloseReason =
  | {
      initiator: 'client';
      willReconnect: boolean;
    }
  | {
      initiator: 'channel';
      willReconnect: false;
    };

interface ServiceThunk<Ctx> {
  (context: Ctx): string;
}

/**
 * See [[Client.openChannel]]
 */
export interface ChannelOptions<Ctx> {
  name?: string;
  service: string | ServiceThunk<Ctx>;
  action?: api.OpenChannel.Action;
  skip?: (context: Ctx) => boolean;
}

/**
 * See [[Client.openChannel]]
 */
export type OpenChannelCb<Ctx> = (
  res:
    | { error: null; channel: Channel; context: Ctx }
    | { error: Error; channel: null; context: Ctx },
) => void | ((reason: ChannelCloseReason) => void);

export interface RequestResult extends api.Command {
  channelClosed?: ChannelCloseReason;
}
