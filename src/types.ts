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
  reuseConnectionMetadata: boolean;
  pollingHost?: string;
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

export type DebugLogBreadcrumb<Ctx> =
  | {
      type: 'breadcrumb';
      message:
        | 'constructor'
        | 'openChanres'
        | 'connected!'
        | 'user close'
        | 'cancel timeout'
        | 'reset timeout'
        | 'connect timeout'
        | 'polling fallback'
        | 'reconnecting'
        | 'destroy';
    }
  | {
      type: 'breadcrumb';
      message: 'open';
      data: {
        polling: false;
      };
    }
  | {
      type: 'breadcrumb';
      message: 'connecting';
      data: {
        connectionState: ConnectionState;
        connectTries: number;
        websocketFailureCount: number;
        readyState: WebSocket['readyState'] | undefined;
        chan0CbExists: boolean;
      };
    }
  | {
      type: 'breadcrumb';
      message: 'requestOpenChannel';
      data?: {
        name: ChannelOptions<Ctx>['name'];
        service: ChannelOptions<Ctx>['service'];
        action: ChannelOptions<Ctx>['action'];
      };
    }
  | {
      type: 'breadcrumb';
      message: 'requestChannelClose';
      data: {
        id: number;
        name: ChannelOptions<Ctx>['name'];
        service: ChannelOptions<Ctx>['service'];
      };
    }
  | {
      type: 'breadcrumb';
      message: 'requestChannelClose:chan0Closed';
      data: {
        id: number;
        name: ChannelOptions<Ctx>['name'];
        service: ChannelOptions<Ctx>['service'];
      };
    }
  | {
      type: 'breadcrumb';
      message: 'requestChannelClose:closeChanRes';
      data: {
        id: number;
        name: ChannelOptions<Ctx>['name'];
        service: ChannelOptions<Ctx>['service'];
        closeStatus: api.CloseChannelRes.Status;
      };
    }
  | {
      type: 'breadcrumb';
      message: 'retrying';
      data: {
        connectionState: ConnectionState;
        connectTries: number;
        websocketFailureCount: number;
        error: Error;
        wsReadyState?: WebSocket['readyState'];
      };
    }
  | {
      type: 'breadcrumb';
      message: 'containerState';
      data: api.ContainerState.State;
    }
  | {
      type: 'breadcrumb';
      message: 'wsclose';
      data?: {
        event: CloseEvent | Event;
      };
    }
  | {
      type: 'breadcrumb';
      message: 'cleanupSocket';
      data: {
        hasWs: boolean;
        readyState: WebSocket['readyState'] | null;
        connectionState: ConnectionState;
      };
    }
  | {
      type: 'breadcrumb';
      message: 'unrecoverable error';
      data: {
        message: string;
      };
    };

/**
 * See [[Client.onDebugLog]]
 */
export type DebugLog<Ctx> =
  | DebugLogBreadcrumb<Ctx>
  | {
      type: 'log';
      log: {
        direction: 'in' | 'out';
        channel: {
          id: number;
          name?: ChannelOptions<Ctx>['name'];
          service?: ChannelOptions<Ctx>['service'];
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
