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
  getNextRetryDelayMs: (tryCount: number) => number;
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

export enum ClientCloseReason {
  /**
   * Called `client.close`, expected to stay closed.
   */
  Intentional = 'Intentional',
  /**
   * Called `client.close`, but we're going to try to reconnect.
   */
  Temporary = 'Temporary',
  /**
   * The websocket connection died
   */
  Disconnected = 'Disconnected',
  /**
   * The client encountered an unrecoverable/invariant error
   */
  Error = 'Error',
}

export type DebugLogBreadcrumb<Ctx> =
  | {
      type: 'breadcrumb';
      message:
        | 'constructor'
        | 'status:open'
        | 'status:connected'
        | 'close:intentional'
        | 'close:temporary'
        | 'status:closed'
        | 'timeout:cancel'
        | 'timeout:reset'
        | 'timeout:hit'
        | 'polling fallback' // TBD.
        | 'status:reconnecting'
        | 'status:destroy';
    }
  | {
      type: 'breadcrumb';
      message: 'status:connecting';
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
      message: 'openChanres';
      data: {
        id: number;
        state: api.OpenChannelRes['state'];
        error: string;
        ref: string;
      };
    }
  | {
      type: 'breadcrumb';
      message: 'requestOpenChannel';
      data?: {
        name: ChannelOptions<Ctx>['name'];
        service: ChannelOptions<Ctx>['service'];
        action: ChannelOptions<Ctx>['action'];
        ref: string;
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
      message: 'redirectInitiatorFallback';
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
      message: 'container:state';
      data: api.ContainerState.State;
    }
  | {
      type: 'breadcrumb';
      message: 'websocket:close';
      data?: {
        event: CloseEvent | Event;
      };
    }
  | {
      type: 'breadcrumb';
      message: 'websocket:cleanup';
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
    }
  | {
      type: 'breadcrumb';
      message: 'handling redirect';
      data: {
        connectionMetadata: GovalMetadata | null;
      };
    }
  | {
      type: 'breadcrumb';
      message: 'client:handleClose';
      data: {
        closeReason: ClientCloseReason;
        connectionState: ConnectionState;
      };
    }
  | {
      type: 'breadcrumb';
      message: 'client:handleClose:closing channel';
      data: {
        channelId: number | null;
        service: ChannelOptions<Ctx>['service'];
        name: ChannelOptions<Ctx>['name'];

        closeRequested: boolean;
        channelRequestIsOpen: boolean;
        willChannelReconnect: boolean;
        hasWs: boolean;
      };
    }
  | {
      type: 'breadcrumb';
      message: 'client:handleClose:out of sync';
      data: {
        channelId: number | null;
        status: string;
        service: string | undefined;
        name: ChannelOptions<Ctx>['name'];
      };
    }
  | {
      type: 'breadcrumb';
      message: 'channels on close';
      data: {
        id: number | null;
        status: string;
        service: ChannelOptions<Ctx>['service'];
        name: ChannelOptions<Ctx>['name'];
      };
    }
  | {
      type: 'breadcrumb';
      message: 'open channel delayed';
      data: {
        service: ChannelOptions<Ctx>['service'];
        name: ChannelOptions<Ctx>['name'];
        connectionState: ConnectionState;
      };
    }
  | {
      type: 'breadcrumb';
      message: 'close channel deemed unnecessary';
      data: {
        channelId: number | null;
        service: ChannelOptions<Ctx>['service'];
        name: ChannelOptions<Ctx>['name'];
        connectionState: ConnectionState;
      };
    }
  | {
      type: 'breadcrumb';
      message: 'open channel skipped';
      data: {
        service: ChannelOptions<Ctx>['service'];
        name: ChannelOptions<Ctx>['name'];
      };
    }
  | {
      type: 'breadcrumb';
      message: 'abandoning close request';
      data: {
        channelId: number | null;
        service: ChannelOptions<Ctx>['service'];
        name: ChannelOptions<Ctx>['name'];
      };
    }
  | {
      type: 'breadcrumb';
      message: 'requestOpenChannel: channel already exists';
      data: {
        channelId: number;
        service: ChannelOptions<Ctx>['service'];
        name: ChannelOptions<Ctx>['name'];
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
export type OpenChannelCb<Ctx> = (res: {
  channel: Channel;
  context: Ctx;
}) => void | ((reason: ChannelCloseReason) => void);

export interface RequestResult extends api.Command {
  channelClosed?: ChannelCloseReason;
}

export const CloseCode = {
  INVALID_UPSTREAM_RESPONSE: 1014,
  POLICY_VIOLATION: 1008,
  FIREWALL_DENIED: 4000,
  TRY_ANOTHER_MACHINE: 4001,
  USER_ERROR: 4002,
  CONCURRENT_REPL_LIMIT: 4004,
};
