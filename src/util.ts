import { TokenOptions, UrlOptions } from './types';

/* global fetch */

/** @hidden */
export function getConnectionStr(token: string, urlOptions?: UrlOptions) {
  const { secure = false, host = 'eval.repl.it', port = '80' } = urlOptions || {};

  return `ws${secure ? 's' : ''}://${host}:${port}/wsv2/${token}`;
}

/** @hidden */
export async function fetchReplToken({
  replId,
  tokenUrl,
  headers,
  ...body
}: TokenOptions): Promise<string> {
  const url = tokenUrl || `/data/repls/${replId}/gen_repl_token`;

  const res = await fetch(url, {
    credentials: 'same-origin',
    headers: headers || {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    method: 'post',
    body: JSON.stringify({ ...body, format: 'pbuf' }),
  });

  if (!res.ok) {
    let message;
    const contentType = res.headers.get('content-type');

    if (contentType && contentType.includes('application/json')) {
      const json = await res.json();

      message = json.message;
    } else {
      message = await res.text();
    }

    throw new Error(message || res.statusText);
  }

  return res.json();
}
