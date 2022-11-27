import * as urllib from 'url';
import type { ConnectOptions, GovalMetadata } from '../types';

const BACKOFF_FACTOR = 1.7;
const MAX_BACKOFF = 15000;

/**
 * Calculates the backoff for n retry
 */
export function defaultGetNextRetryDelay(retryNumber: number): number {
  const randomMs = Math.floor(Math.random() * 500);
  const backoff = BACKOFF_FACTOR ** retryNumber * 1000;

  return Math.min(backoff, MAX_BACKOFF) + randomMs;
}

/**
 * Gets a websocket class from the global scope, or asserts if the supplied websocket follows the standard
 */
export function getWebSocketClass(
  WebSocketClass: ConnectOptions<unknown>['WebSocketClass'],
): typeof WebSocket {
  if (WebSocketClass) {
    if (typeof WebSocketClass !== 'function' && 'OPEN' in WebSocketClass && WebSocketClass.OPEN !== 1) {
      throw new Error('Passed in WebSocket does not look like a standard WebSocket');
    }

    return WebSocketClass;
  }

  if (typeof WebSocket !== 'undefined') {
    if ('OPEN' in WebSocket && WebSocket.OPEN !== 1) {
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
