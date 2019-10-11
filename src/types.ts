import { api } from '../protocol/api';

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
    };
type DebugFunc = (log: DebugLog) => void;

interface TokenOptions {
  replId?: string;
  tokenUrl?: string;
  headers?: HeadersInit;
  polygott?: boolean;
  captcha?: string;
  token?: string;
  flags?: Record<string, boolean>;
}

interface UrlOptions {
  secure: boolean;
  host: string;
  port: string;
}

// https://github.com/typescript-eslint/typescript-eslint/issues/342
// eslint-disable-next-line
export { DebugFunc, TokenOptions, UrlOptions };
