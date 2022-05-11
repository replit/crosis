import * as urllib from 'url';
import { ConnectionError, ConnectOptions, GovalMetadata, RetryCb } from '../types';

const BACKOFF_FACTOR = 1.7;
const MAX_BACKOFF = 15000;

function getNextRetryDelay(retryNumber: number): number {
  const randomMs = Math.floor(Math.random() * 500);
  const backoff = BACKOFF_FACTOR ** retryNumber * 1000;

  return Math.min(backoff, MAX_BACKOFF) + randomMs;
}

export function createDefaultRetryCallback(): RetryCb {
  let websocketFailureCount = 0;

  return async function retryCallback({
    count,
    retryReason,
  }: {
    count: number;
    retryReason: ConnectionError;
  }) {
    if (retryReason === ConnectionError.SocketClosure) {
      websocketFailureCount += 1;
    }

    return {
      shouldAbort: false,
      backOffMs: getNextRetryDelay(count),
      shouldPoll: websocketFailureCount > 3,
    };
  };
}

function isWebSocket(w: unknown): w is WebSocket {
  if (typeof w !== 'object' && typeof w !== 'function') {
    return false;
  }

  if (!w) {
    return false;
  }

  return 'OPEN' in w && (w as WebSocket).OPEN === 1;
}

/**
 * Gets a websocket class from the global scope, or asserts if the supplied websocket follows the standard
 */
export function getWebSocketClass(
  WebSocketClass: ConnectOptions<unknown>['WebSocketClass'],
): typeof WebSocket {
  if (WebSocketClass) {
    if (!isWebSocket(WebSocketClass)) {
      throw new Error('Passed in WebSocket does not look like a standard WebSocket');
    }

    return WebSocketClass;
  }

  if (typeof WebSocket !== 'undefined') {
    if (!isWebSocket(WebSocket)) {
      throw new Error('Global WebSocket does not look like a standard WebSocket');
    }

    return WebSocket;
  }

  throw new Error('Please pass in a WebSocket class or add it to global');
}

/**
 * Given connection metadata, creates a websocket connection string. Will
 * fallback to polling if `pollingHost` is provided.
 */
export function getConnectionStr(connectionMetadata: GovalMetadata, pollingHost?: string): string {
  const gurl = urllib.parse(connectionMetadata.gurl);
  if (pollingHost) {
    gurl.hostname = pollingHost;
    gurl.host = pollingHost;
    gurl.pathname = `/wsv2/${connectionMetadata.token}/${encodeURIComponent(
      connectionMetadata.gurl,
    )}`;
  } else {
    gurl.pathname = `/wsv2/${connectionMetadata.token}`;
  }

  return urllib.format(gurl);
}
