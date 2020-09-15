/* global WebSocket */

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

export interface UrlOptions {
  secure: boolean;
  host: string;
  port: string;
}

export interface ConnectOptions<D = any> {
  fetchToken: () => Promise<string>;
  urlOptions: UrlOptions;
  polling: boolean;
  timeout: number | null;
  reconnect: boolean;
  WebSocketClass?: typeof WebSocket;
  maxConnectRetries: number;
  context: D;
}

/**
 * The only required option is `fetchToken`, all others are optional and will use defaults
 */
export interface ConnectArgs<D> extends Partial<Omit<ConnectOptions<D>, 'fetchToken'>> {
  fetchToken: () => Promise<string>;
}

export type CloseResult =
  | {
      closeReason: ClientCloseReason.Intentional;
    }
  | {
      closeReason: ClientCloseReason.Disconnected;
      wsEvent: CloseEvent | ErrorEvent;
    };

export enum ConnectionState {
  CONNECTING = 0,
  CONNECTED = 1,
  DISCONNECTED = 2,
}

interface TxRx {
  direction: 'in' | 'out';
  cmd: api.Command;
}

type DebugLog =
  | {
      type: 'breadcrumb';
      message: string;
      data?: unknown;
    }
  | {
      type: 'log';
      log: TxRx;
    }
  | {
      type: 'ping';
      latency: number;
    };

export type DebugFunc = (log: DebugLog) => void;

