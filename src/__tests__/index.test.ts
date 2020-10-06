/* eslint-env jest */

import * as crypto from 'crypto';
import { Client } from '..';

// eslint-disable-next-line
const WebSocket = require('ws');

const TOKEN_SECRET = process.env.TOKEN_SECRET as string;

if (!TOKEN_SECRET) {
  throw new Error('TOKEN_SECRET is required to run tests');
}

function genToken() {
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

  return token.toString('base64');
}

jest.setTimeout(10 * 1000);

test('client connect', (done) => {
  const client = new Client<{ username: string }>();
  client.setUnrecoverableErrorHandler(done);

  const ctx = { username: 'zyzz' };

  client.open(
    {
      fetchToken: () => Promise.resolve({ token: genToken(), aborted: false }),
      withPreconnectedSocket: false,
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
      fetchToken: () => {
        tryCount += 1;

        if (tryCount === 1) {
          return Promise.resolve({ token: 'test - bad token retries', aborted: false });
        }

        return Promise.resolve({ token: genToken(), aborted: false });
      },
      withPreconnectedSocket: false,
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
      fetchToken: () => Promise.resolve({ token: genToken(), aborted: false }),
      withPreconnectedSocket: false,
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
      fetchToken: () => Promise.resolve({ token: genToken(), aborted: false }),
      withPreconnectedSocket: false,
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

    close();

    expect(channel?.status).toBe('closing');

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
      fetchToken: () => Promise.resolve({ token: genToken(), aborted: false }),
      withPreconnectedSocket: false,
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
      fetchToken: () => Promise.resolve({ token: genToken(), aborted: false }),
      withPreconnectedSocket: false,
      WebSocketClass: WebSocket,
      context: null,
    },
    ({ channel, error }) => {
      clientOpenCount += 1;
      expect(channel?.status).toBe('open');
      expect(error).toEqual(null);
      if (unexpectedDisconnectTriggered) {
        setTimeout(() => client.close());
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

test('client rejects opening channel before client opens', () => {
  const client = new Client();

  expect(() => {
    client.openChannel({ name: Math.random().toString(), service: 'exec' }, () => {});
  }).toThrow();
});

test('client rejects opening channel after closing client', () => {
  const client = new Client();

  const errorHandler = jest.fn();
  client.setUnrecoverableErrorHandler(errorHandler);

  client.open(
    {
      fetchToken: () => Promise.resolve({ token: null, aborted: true }),
      withPreconnectedSocket: false,
      WebSocketClass: WebSocket,
      context: null,
    },
    () => {},
  );

  client.close();

  expect(() => {
    client.openChannel({ name: Math.random().toString(), service: 'exec' }, () => {});
  }).toThrow();

  expect(errorHandler).toHaveBeenCalledTimes(0);
});

test('client rejects opening same channel twice', (done) => {
  const client = new Client();
  client.setUnrecoverableErrorHandler(done);

  client.open(
    {
      fetchToken: () => Promise.resolve({ token: genToken(), aborted: false }),
      withPreconnectedSocket: false,
      WebSocketClass: WebSocket,
      context: null,
    },
    ({ error }) => {
      // expect(channel?.status).toBe('open');
      expect(error).toEqual(null);

      const name = Math.random().toString();
      client.openChannel({ name, service: 'exec' }, () => {});

      expect(() => {
        client.openChannel({ name, service: 'exec' }, () => {});
      }).toThrow();

      client.close();

      return () => {
        done();
      };
    },
  );
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
      fetchToken: () => Promise.resolve({ token: genToken(), aborted: false }),
      withPreconnectedSocket: false,
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
  const fetchToken = () => {
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

    return Promise.resolve({ token: genToken(), aborted: false } as const);
  };

  client.open(
    {
      fetchToken,
      withPreconnectedSocket: false,
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
      fetchToken: () => {
        setTimeout(() => {
          // `close` called before connecting
          client.close();
        }, 0);

        return Promise.resolve({ token: genToken(), aborted: false });
      },
      withPreconnectedSocket: false,
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
//       fetchToken: () => Promise.resolve({ token: 'bad token', aborted: false }),
//        withPreconnectedSocket: false,
//        WebSocketClass: WebSocket,
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
      fetchToken: () => {
        throw new Error('fail');
      },
      withPreconnectedSocket: false,
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
      fetchToken: (abortSignal) => new Promise((r) => {
          // Listen to abort signal
          abortSignal.onabort = () => {
            onAbort();
            r({
              aborted: true,
              token: null,
            });
          };

          // closing client should trigger the abort signal
          setTimeout(() => {
            client.close();
          }, 0);
        }),
      withPreconnectedSocket: false,
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

test('client multiplexed', (done) => {
  const wsSourceClient = new Client();
  const clientMultiplexed = new Client();

  const onError = (err: Error) => {
    wsSourceClient.close();
    clientMultiplexed.close();

    done(err);
  };
  wsSourceClient.setUnrecoverableErrorHandler(onError);
  clientMultiplexed.setUnrecoverableErrorHandler(onError);

  wsSourceClient.open(
    {
      fetchToken: () => Promise.resolve({ token: genToken(), aborted: false }),
      withPreconnectedSocket: false,
      WebSocketClass: WebSocket,
      context: null,
    },
    ({ channel, error }) => {
      expect(channel?.status).toBe('open');
      expect(error).toBeNull();

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore (ws is private)
      const { ws } = wsSourceClient;

      clientMultiplexed.open(
        {
          getSocket: () => {
            if (!ws) {
              throw new Error('Expected socket');
            }

            return Promise.resolve({ ws, aborted: false });
          },
          withPreconnectedSocket: true,
          context: null,
        },
        ({ channel: chan0, error: err2 }) => {
          expect(chan0?.status).toBe('open');
          expect(err2).toBeNull();

          let ponged = false;
          chan0?.onCommand((cmd) => {
            if (cmd.body === 'pong') {
              ponged = true;
              clientMultiplexed.close();
            }
          });

          chan0?.send({ ping: {} });

          return () => {
            expect(ponged).toBeTruthy();

            wsSourceClient.close();

            done();
          };
        },
      );

      return () => {};
    },
  );
});
