/* eslint-env jest */

import * as crypto from 'crypto';
import type { GovalMetadata } from '../types';
import { Client, FetchConnectionMetadataResult } from '..';

// eslint-disable-next-line
const WebSocket = require('ws');

const TOKEN_SECRET = process.env.TOKEN_SECRET as string;

if (!TOKEN_SECRET) {
  throw new Error('TOKEN_SECRET env variable is required to run tests');
}

function genConnectionMetadata() {
  const opts = {
    id: `testing-crosis-${Math.random().toString(36).split('.')[1]}`,
    mem: 1024 * 1024 * 512,
    thread: 0.5,
    share: 0.5,
    net: true,
    attach: true,
    bucket: 'test-replit-repls',
    ephemeral: true,
    nostore: true,
    language: 'bash',
    owner: true,
    path: Math.random().toString(36).split('.')[1],
    disk: 1024 * 1024 * 1024,
    bearerName: 'crosistest',
    bearerId: 2,
    presenced: true,
    user: 'crosistest',
    pullFiles: true,
    polygott: false,
    format: 'pbuf',
  };
  const encodedOpts = Buffer.from(
    JSON.stringify({
      created: Date.now(),
      salt: Math.random().toString(36).split('.')[1],
      ...opts,
    }),
  ).toString('base64');

  const hmac = crypto.createHmac('sha256', TOKEN_SECRET);
  hmac.update(encodedOpts);
  const msgMac = hmac.digest('base64');

  const token = Buffer.from(`${encodedOpts}:${msgMac}`);

  return {
    token: token.toString('base64'),
    gurl: 'ws://eval.repl.it',
    conmanURL: 'http://eval.repl.it',
  };
}

function genToken() {
  return genConnectionMetadata().token;
}

jest.setTimeout(10 * 1000);

test('client connect', (done) => {
  const client = new Client<{ username: string }>();
  client.setUnrecoverableErrorHandler(done);

  const ctx = { username: 'zyzz' };

  client.open(
    {
      fetchConnectionMetadata: () =>
        Promise.resolve({
          connectionMetadata: genConnectionMetadata(),
          result: FetchConnectionMetadataResult.Ok,
        }),
      WebSocketClass: WebSocket,
      context: ctx,
    },
    ({ channel, error, context }) => {
      expect(channel?.status).toBe('open');
      expect(context).toBe(ctx);
      expect(error).toEqual(null);

      client.close();

      return () => {
        done();
      };
    },
  );
});

test('client connect with connection metadata retry', (done) => {
  const client = new Client<{ username: string }>();
  client.setUnrecoverableErrorHandler(done);

  const ctx = { username: 'zyzz' };

  let tryCount = 0;

  client.open(
    {
      fetchConnectionMetadata: () => {
        tryCount += 1;

        if (tryCount === 1) {
          return Promise.resolve({
            connectionMetadata: null,
            result: FetchConnectionMetadataResult.RetriableError,
          });
        }

        return Promise.resolve({
          connectionMetadata: genConnectionMetadata(),
          result: FetchConnectionMetadataResult.Ok,
        });
      },
      WebSocketClass: WebSocket,
      context: ctx,
    },
    ({ channel, error, context }) => {
      expect(tryCount).toBe(2);
      expect(channel?.status).toBe('open');
      expect(context).toBe(ctx);
      expect(error).toEqual(null);

      client.close();

      return () => {
        done();
      };
    },
  );
});

test('client connect (fetchToken)', (done) => {
  const client = new Client<{ username: string }>();
  client.setUnrecoverableErrorHandler(done);

  const ctx = { username: 'zyzz' };

  client.open(
    {
      fetchToken: () => Promise.resolve({ token: genToken(), aborted: false }),
      WebSocketClass: WebSocket,
      context: ctx,
    },
    ({ channel, error, context }) => {
      expect(channel?.status).toBe('open');
      expect(context).toBe(ctx);
      expect(error).toEqual(null);

      client.close();

      return () => {
        done();
      };
    },
  );
});

test('client retries', (done) => {
  const client = new Client();
  client.setUnrecoverableErrorHandler(done);

  let tryCount = 0;

  client.open(
    {
      fetchConnectionMetadata: () => {
        tryCount += 1;

        if (tryCount === 1) {
          return Promise.resolve({
            connectionMetadata: {
              token: 'test - bad connection metadata retries',
              gurl: 'ws://invalid.example.com',
              conmanURL: 'http://invalid.example.com',
            },
            result: FetchConnectionMetadataResult.Ok,
          });
        }

        return Promise.resolve({
          connectionMetadata: genConnectionMetadata(),
          result: FetchConnectionMetadataResult.Ok,
        });
      },
      WebSocketClass: WebSocket,
      context: null,
    },
    ({ channel, error }) => {
      expect(tryCount).toBe(2);
      expect(channel?.status).toBe('open');
      expect(error).toEqual(null);

      client.close();

      return () => {
        done();
      };
    },
  );
});

test('channel closing itself when client willReconnect', (done) => {
  let disconnectTriggered = false;
  let clientOpenCount = 0;
  let channelOpenCount = 0;

  const client = new Client();
  client.setUnrecoverableErrorHandler(done);

  client.open(
    {
      fetchConnectionMetadata: () =>
        Promise.resolve({
          connectionMetadata: genConnectionMetadata(),
          result: FetchConnectionMetadataResult.Ok,
        }),
      WebSocketClass: WebSocket,
      context: null,
    },
    ({ channel, error }) => {
      clientOpenCount += 1;
      expect(error).toEqual(null);
      expect(channel?.status).toBe('open');

      if (!disconnectTriggered) {
        setTimeout(() => {
          disconnectTriggered = true;
          // eslint-disable-next-line
          // @ts-ignore: trigger unintentional disconnect
          client.ws.close();
        }, 1000);
      } else {
        client.close();
      }

      return ({ willReconnect }) => {
        if (willReconnect) {
          return;
        }

        expect(clientOpenCount).toEqual(2);
        expect(channelOpenCount).toEqual(1);

        done();
      };
    },
  );

  const close = client.openChannel({ service: 'shell' }, ({ channel, error }) => {
    channelOpenCount += 1;
    expect(error).toBe(null);
    expect(channel?.status).toBe('open');

    return ({ willReconnect }) => {
      expect(willReconnect).toBeTruthy();
      // This cleanup function gets called because we triggered an unintentional
      // disconnect above (`client.ws.onclose()`). Since this is unintentional
      // the client will reconnect itself. But this outer `openChannel`callback will NOT
      // get called a second time when the cleint re-connects since we are deliberately
      // closing it on the next line.
      close();
    };
  });
});

test('channel open and close', (done) => {
  const onUnrecoverableError = jest.fn<void, [Error]>();
  const client = new Client();
  client.setUnrecoverableErrorHandler(done);

  const channelClose = jest.fn();

  client.open(
    {
      fetchConnectionMetadata: () =>
        Promise.resolve({
          connectionMetadata: genConnectionMetadata(),
          result: FetchConnectionMetadataResult.Ok,
        }),
      WebSocketClass: WebSocket,
      context: null,
    },
    ({ channel, error }) => {
      expect(error).toEqual(null);
      expect(channel?.status).toBe('open');

      return () => {
        expect(channelClose).toHaveBeenCalled();

        expect(onUnrecoverableError).toHaveBeenCalledTimes(0);
        done();
      };
    },
  );

  const close = client.openChannel({ service: 'shell' }, ({ channel, error }) => {
    expect(channel?.status).toBe('open');
    expect(error).toBe(null);

    setTimeout(() => {
      close();
      expect(channel?.status).toBe('closing');
    });

    return ({ willReconnect }) => {
      expect(willReconnect).toBeFalsy();
      expect(channel?.status).toBe('closed');

      channelClose();
      client.close();
    };
  });
});

test('channel skips opening', (done) => {
  const client = new Client<{ username: string }>();
  client.setUnrecoverableErrorHandler(done);

  const service = 'shell';
  const ctx = { username: 'midas' };
  const skipfn = jest.fn().mockImplementation(() => true);
  const opencb = jest.fn();

  client.open(
    {
      fetchConnectionMetadata: () =>
        Promise.resolve({
          connectionMetadata: genConnectionMetadata(),
          result: FetchConnectionMetadataResult.Ok,
        }),
      WebSocketClass: WebSocket,
      context: ctx,
    },
    ({ error }) => {
      expect(error).toBeNull();

      setTimeout(() => {
        expect(skipfn).toHaveBeenCalledTimes(1);
        expect(skipfn).toHaveBeenCalledWith(ctx);
        expect(opencb).not.toHaveBeenCalled();

        client.close();
      }, 0);

      return () => {
        done();
      };
    },
  );

  client.openChannel(
    {
      service,
      skip: skipfn,
    },
    opencb,
  );
});

test('channel skips opening conditionally', (done) => {
  let unexpectedDisconnectTriggered = false;
  let clientOpenCount = 0;
  let channelOpenCount = 0;

  const client = new Client();
  client.setUnrecoverableErrorHandler(done);

  client.open(
    {
      fetchConnectionMetadata: () =>
        Promise.resolve({
          connectionMetadata: genConnectionMetadata(),
          result: FetchConnectionMetadataResult.Ok,
        }),
      WebSocketClass: WebSocket,
      context: null,
    },
    ({ channel, error }) => {
      clientOpenCount += 1;
      expect(channel?.status).toBe('open');
      expect(error).toEqual(null);
      if (unexpectedDisconnectTriggered) {
        client.close();
      }

      return ({ willReconnect }) => {
        if (willReconnect) {
          return;
        }

        expect(clientOpenCount).toEqual(2);
        expect(channelOpenCount).toEqual(1);

        done();
      };
    },
  );

  client.openChannel(
    {
      skip: () => channelOpenCount > 0,
      service: 'shell',
    },
    ({ channel, error }) => {
      if (!unexpectedDisconnectTriggered) {
        setTimeout(() => {
          // eslint-disable-next-line
          // @ts-ignore: trigger unintentional disconnect
          client.ws.close();
          unexpectedDisconnectTriggered = true;
        }, 1000);

        expect(error).toBe(null);
        expect(channel?.status).toBe('open');

        channelOpenCount += 1;

        return;
      }

      expect(error).toBeTruthy();
      expect(error?.message).toBe('Failed to open');
    },
  );
});

test('openChannel before open', (done) => {
  const client = new Client();
  client.setUnrecoverableErrorHandler(done);

  client.openChannel({ service: 'exec' }, ({ channel }) => {
    expect(channel).toBeTruthy();

    client.close();
    done();
  });

  client.open(
    {
      fetchConnectionMetadata: () =>
        Promise.resolve({
          connectionMetadata: genConnectionMetadata(),
          result: FetchConnectionMetadataResult.Ok,
        }),
      WebSocketClass: WebSocket,
      context: null,
    },
    ({ channel }) => {
      expect(channel).toBeTruthy();

      return () => {};
    },
  );
});

test('closing maintains openChannel requests', (done) => {
  const client = new Client();
  client.setUnrecoverableErrorHandler(done);

  let first = true;
  client.openChannel({ service: 'exec' }, ({ channel }) => {
    expect(channel).toBeTruthy();

    if (first) {
      client.close();
      first = false;

      setTimeout(() => {
        // open again should call this same function
        client.open(
          {
            fetchConnectionMetadata: () =>
              Promise.resolve({
                connectionMetadata: genConnectionMetadata(),
                result: FetchConnectionMetadataResult.Ok,
              }),
            WebSocketClass: WebSocket,
            context: null,
          },
          () => {},
        );
      }, 200);
    } else {
      client.close();
      done();
    }
  });

  client.open(
    {
      fetchConnectionMetadata: () =>
        Promise.resolve({
          connectionMetadata: genConnectionMetadata(),
          result: FetchConnectionMetadataResult.Ok,
        }),
      WebSocketClass: WebSocket,
      context: null,
    },
    ({ channel }) => {
      expect(channel).toBeTruthy();

      return () => {};
    },
  );
});

test('client rejects opening same channel twice', () => {
  const client = new Client();
  client.setUnrecoverableErrorHandler(() => {});


  const name = Math.random().toString();
  client.openChannel({ name, service: 'exec' }, () => {});

  expect(() => {
    client.openChannel({ name, service: 'exec' }, () => {});
  }).toThrow();
});

test('client reconnects unexpected disconnects', (done) => {
  const onUnrecoverableError = jest.fn<void, [Error]>();
  const client = new Client();
  client.setUnrecoverableErrorHandler(onUnrecoverableError);

  let disconnectTriggered = false;
  let timesConnected = 0;
  let timesClosedUnintentionally = 0;
  let timesClosedIntentionally = 0;

  client.open(
    {
      fetchConnectionMetadata: () =>
        Promise.resolve({
          connectionMetadata: genConnectionMetadata(),
          result: FetchConnectionMetadataResult.Ok,
        }),
      WebSocketClass: WebSocket,
      context: null,
    },
    ({ channel, error }) => {
      expect(error).toEqual(null);
      expect(channel?.status).toEqual('open');

      timesConnected += 1;

      if (!disconnectTriggered) {
        setTimeout(() => {
          // eslint-disable-next-line
          // @ts-ignore: trigger unintentional disconnect
          client.ws?.close();
          disconnectTriggered = true;
        });
      } else {
        client.close();
      }

      return (closeReason) => {
        if (closeReason.initiator !== 'client') {
          throw new Error('Expected "client" initiator');
        }

        if (closeReason.willReconnect) {
          timesClosedUnintentionally += 1;
        } else if (closeReason.willReconnect === false) {
          timesClosedIntentionally += 1;
        }

        if (timesConnected === 2) {
          expect(timesClosedUnintentionally).toEqual(1);
          expect(timesClosedIntentionally).toEqual(1);

          expect(onUnrecoverableError).toHaveBeenCalledTimes(0);
          done();
        }
      };
    },
  );
});

test('client is closed while reconnecting', (done) => {
  let didOpen = false;

  const onOpen = jest.fn();
  const onClose = jest.fn();

  const client = new Client();
  client.setUnrecoverableErrorHandler(done);
  const fetchConnectionMetadata = () => {
    if (didOpen) {
      // We're reconnecting
      setTimeout(() => {
        // Close client while reconnecting
        client.close();

        expect(onOpen).toHaveBeenCalledTimes(1);
        expect(onClose).toHaveBeenCalledTimes(1);

        done();
      });
    }

    return Promise.resolve({
      connectionMetadata: genConnectionMetadata(),
      result: FetchConnectionMetadataResult.Ok,
    } as const);
  };

  client.open(
    {
      fetchConnectionMetadata,
      WebSocketClass: WebSocket,
      context: null,
    },
    ({ channel }) => {
      if (channel) {
        // called once after initial connect
        onOpen();

        didOpen = true;

        setTimeout(() => {
          // eslint-disable-next-line
          // @ts-ignore: trigger unintentional disconnect
          client.ws?.close();
        });
      }

      return () => {
        // called once after dissconnect
        onClose();
      };
    },
  );
});

test('closing before ever connecting', (done) => {
  const client = new Client();

  const open = jest.fn();
  const openError = jest.fn();
  const close = jest.fn();

  client.open(
    {
      fetchConnectionMetadata: () => {
        setTimeout(() => {
          // `close` called before connecting
          client.close();
        }, 0);

        return Promise.resolve({
          connectionMetadata: genConnectionMetadata(),
          result: FetchConnectionMetadataResult.Ok,
        });
      },
      WebSocketClass: WebSocket,
      context: null,
    },
    ({ error }) => {
      if (error) {
        openError();
        expect(open).not.toHaveBeenCalled();
        expect(openError).toHaveBeenCalledTimes(1);
        expect(close).not.toHaveBeenCalled();
        done();
      } else {
        open();
      }

      return () => {
        close();
      };
    },
  );
});

// // re-add once we add polling
// test.skip('falling back to polling', (done) => {
//   const onUnrecoverableError = jest.fn<void, [Error]>();
//   const client = new Client();
//   client.setUnrecoverErrorHandler(onUnrecoverableError);

//   const maxConnectRetries = 1;
//   const open = jest.fn();

//   client.setDebugFunc((log) => {
//     if (log.type === 'breadcrumb' && log.message === 'falling back to polling') {
//       // eslint-disable-next-line
//       const data = log.data as any;

//       expect(data.connectTries).toEqual(maxConnectRetries + 1);
//       expect(data.error).toBeDefined();
//       expect(data.wsReadyState).toBeUndefined();

//       // eslint-disable-next-line
//       // @ts-ignore need to reach in and grab some private fields real quick...
//       const { urlOptions, polling } = client.connectOptions;

//       expect(urlOptions.host).toEqual('gp-v2.herokuapp.com');
//       expect(polling).toBe(true);

//       expect(open).not.toHaveBeenCalled();

//       expect(onUnrecoverableError).toHaveBeenCalledTimes(0);
//       done();
//     }
//   });

//   client.open(
//     {
//       fetchConnectionMetadata: () => Promise.resolve({
//         connectionMetadata: {
//           token: 'bad token',
//           gurl: '',
//           conmanURL: '',
//         },
//         result: FetchConnectionMetadataResult.Ok,
//       }),
//       WebSocketClass: WebSocket,
//       timeout: 0,
//     },
//     open,
//   );
// });

test('fetch token fail', (done) => {
  const chan0Cb = jest.fn();
  const client = new Client();

  client.setUnrecoverableErrorHandler((e) => {
    expect(chan0Cb).toHaveBeenCalledTimes(1);
    expect(e.message).toContain('fail');

    done();
  });

  client.open(
    {
      fetchConnectionMetadata: () => {
        throw new Error('fail');
      },
      WebSocketClass: WebSocket,
      context: null,
    },
    chan0Cb,
  );
});

test('fetch abort signal works as expected', (done) => {
  const client = new Client();
  client.setUnrecoverableErrorHandler(() => {
    done(new Error('did not expect fatal to be called'));
  });

  const onAbort = jest.fn();

  client.open(
    {
      fetchConnectionMetadata: (abortSignal) =>
        new Promise((r) => {
          // Listen to abort signal
          abortSignal.onabort = () => {
            onAbort();
            r({
              result: FetchConnectionMetadataResult.Aborted,
              connectionMetadata: null,
            });
          };

          // closing client should trigger the abort signal
          setTimeout(() => {
            client.close();
          }, 0);
        }),
      WebSocketClass: WebSocket,
      context: null,
    },
    ({ channel, error }) => {
      expect(channel).toBe(null);
      expect(error).toBeTruthy();
      expect(error?.message).toBe('Failed to open');
      expect(onAbort).toHaveBeenCalledTimes(1);

      done();

      return () => {};
    },
  );
});

test('can close and open in synchronously without aborting fetch token', (done) => {
  const client = new Client();
  client.setUnrecoverableErrorHandler(() => {
    done(new Error('did not expect fatal to be called'));
  });

  const onAbort = jest.fn();
  const firstChan0Cb = jest.fn();

  let resolveFetchToken:
    | null
    | ((
        result:
          | {
              connectionMetadata: null;
              result: Exclude<FetchConnectionMetadataResult, FetchConnectionMetadataResult.Ok>;
            }
          | { connectionMetadata: GovalMetadata; result: FetchConnectionMetadataResult.Ok },
      ) => void) = null;
  client.open(
    {
      // never resolves
      fetchConnectionMetadata: (abortSignal) =>
        new Promise((r) => {
          resolveFetchToken = r;

          abortSignal.onabort = () => {
            onAbort();
            // don't resolve
          };
        }),
      WebSocketClass: WebSocket,
      context: null,
    },
    firstChan0Cb,
  );

  client.close();

  expect(resolveFetchToken).toBeTruthy();
  // resolving the first fetch token later shouldn't casue any errors
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  resolveFetchToken!({ result: FetchConnectionMetadataResult.Aborted, connectionMetadata: null });
  expect(onAbort).toHaveBeenCalledTimes(1);
  expect(firstChan0Cb).toHaveBeenCalledTimes(1);
  expect(firstChan0Cb).toHaveBeenLastCalledWith(
    expect.objectContaining({
      channel: null,
      context: null,
      error: expect.any(Error),
    }),
  );

  client.setUnrecoverableErrorHandler(done);

  client.open(
    {
      fetchConnectionMetadata: () =>
        Promise.resolve({
          connectionMetadata: genConnectionMetadata(),
          result: FetchConnectionMetadataResult.Ok,
        }),
      WebSocketClass: WebSocket,
      context: null,
    },
    ({ channel, error }) => {
      expect(channel?.status).toBe('open');
      expect(error).toEqual(null);

      client.close();

      return () => {
        expect(firstChan0Cb).toHaveBeenCalledTimes(1);

        done();
      };
    },
  );
});
