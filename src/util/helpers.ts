/* global WebSocket */
import { ConnectOptions } from '../types';
import { EIOCompat } from './EIOCompat';

const BACKOFF_FACTOR = 1.7;
const MAX_BACKOFF = 15000;

export function getNextRetryDelay(retryNumber: number) {
  const randomMs = Math.floor(Math.random() * 500);
  const backoff = BACKOFF_FACTOR ** retryNumber * 1000;

  return Math.min(backoff, MAX_BACKOFF) + randomMs;
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

export function getWebSocketClass(options: ConnectOptions) {
  if (options.polling && process.env.NODE_ENV !== 'test') {
    return EIOCompat;
  }

  if (options.WebSocketClass) {
    if (!isWebSocket(options.WebSocketClass)) {
      throw new Error('Passed in WebSocket does not look like a standard WebSocket');
    }

    return options.WebSocketClass;
  }

  if (typeof WebSocket !== 'undefined') {
    if (!isWebSocket(WebSocket)) {
      throw new Error('Global WebSocket does not look like a standard WebSocket');
    }

    return WebSocket;
  }

  throw new Error('Please pass in a WebSocket class, add it to global, or use the polling option');
}
