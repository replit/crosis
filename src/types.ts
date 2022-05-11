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

export enum ConnectionError {
  /**
   * The websocket closed (or errored) abruptly while connecting
   */
  SocketClosure = 'SocketClosure',
  /**
   * Time taken to connect exceeded timeout specified in the connection options
   */
  Timeout = 'Timeout',
  /**
   * We got a ContainerState.Sleep message which means the container died
   * while we're connecting
   */
  ContainerSleep = 'ContainerSleep',
  /**
   * We recieved a retriable error when fetching connection metadata
   */
  MetadataRequestFailed = 'MetadataRequestFailed',
}

/**
 * This is an optional callback passed alongside connection options
 * that can be used to configure the details of retries. Returning
 * an abort is equivalent of calling client.close().
 */
export type RetryCb = (retryDetails: {
  /**
   * The number of times we retried, with the first retry being 1
   */
  count: number;
  /**
   * The reason that triggered the retry
   */
  retryReason: ConnectionError;
  /**
   * Websocket error code. This only makes sense when retry reason
   * is a websocket closure
   */
  websocketErrorCode: number;
}) => Promise<
  { shouldAbort: true } | { shouldAbort: false; shouldPoll: boolean; backOffMs: number }
>;

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
  reuseConnectionMetadata: boolean;
  pollingHost?: string;
  retryCallback?: RetryCb;
}

export interface UrlOptions {
  secure: boolean;
  host: string;
  port: string;
}

/**
 * Connection options supplied to [[Client.open]]
 *
 * The only required option is `fetchConnectionMetadata`, all others are
 * optional and will use defaults.
 */
export interface OpenOptions<Ctx> extends Partial<ConnectOptions<Ctx>> {
  fetchConnectionMetadata: (abortSignal: AbortSignal) => Promise<FetchConnectionMetadataResult>;
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
        channel: {
          id: number;
          name?: string;
          service?: string;
        };
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

/**
 * When opening a channel, the service parameter
 * accepts passing in a function that returns a
 * service name. Use this when you need to use context
 * to determine which service to use.
 */
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
    | { error: Error; channel: null; context: Ctx | null },
) => void | ((reason: ChannelCloseReason) => void);

export interface RequestResult extends api.Command {
  channelClosed?: ChannelCloseReason;
}
