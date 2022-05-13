/* eslint-env jest */

import type { FetchConnectionMetadataResult } from '../types';
import { Client, FetchConnectionMetadataError } from '..';
import { getWebSocketClass } from '../util/helpers';
import { Channel } from '../channel';

// eslint-disable-next-line
const genConnectionMetadata = require('../../debug/genConnectionMetadata');

// eslint-disable-next-line
const WebSocket = require('ws');

jest.setTimeout(30 * 1000);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const testingClients: Array<Client<any>> = [];

// Just a helper that to help us exit from jest without any open handles
function getClient<Ctx = null>(done: jest.DoneCallback) {
  const c = new Client<Ctx>();
  testingClients.push(c);

  return c;
}

afterAll(() => {
  testingClients.forEach((c) => c.destroy());
});

/**
 * A simple helper to allow us to do assertions inside callbacks.
 * If `done` is not called after an assertion fails inside a callback
 * the test will continue until it times out. This function makes sure
 * done is called and we fail fast with correct stack traces.
 */
function wrapWithDone<Args extends Array<any>, Ret>(
  done: jest.DoneCallback,
  fn: (...args: Args) => Ret,
) {
  return (...args: Args): Ret => {
    try {
      const res = fn(...args);
      if (
        typeof res === 'object' &&
        res &&
        'catch' in res &&
        typeof (res as any).catch === 'function'
      ) {
        return (res as any).catch((err: any) => {
          done(err);
        });
      }

      return res;
    } catch (e) {
      done(e);

      return undefined as any;
    }
  };
}

function getWebsocketClassThatNeverConnects() {
  class _WebsocketThatNeverConnects {
    static OPEN = 1;
  }

  const WebsocketThatNeverConnects = _WebsocketThatNeverConnects as typeof WebSocket;

  // Make sure internals think it's a websocket
  expect(() => getWebSocketClass(WebsocketThatNeverConnects)).not.toThrow();
  expect(getWebSocketClass(WebsocketThatNeverConnects)).toEqual(WebsocketThatNeverConnects);

  return WebsocketThatNeverConnects;
}

test('client connect', (done) => {
  const client = getClient<{ username: string }>(done);

  const ctx = { username: 'zyzz' };

  client.open(
    {
      fetchConnectionMetadata: () =>
        Promise.resolve({
          ...genConnectionMetadata(),
          error: null,
        }),
      WebSocketClass: WebSocket,
      context: ctx,
    },
    wrapWithDone(done, ({ channel, error, context }) => {
      expect(channel?.status).toBe('open');
      expect(context).toBe(ctx);
      expect(error).toEqual(null);

      client.close();

      return () => {
        done();
      };
    }),
  );
});

test('client connect with connection metadata retry', (done) => {
  const client = getClient<{ username: string }>(done);

  const ctx = { username: 'zyzz' };

  let tryCount = 0;

  client.open(
    {
      fetchConnectionMetadata: () => {
        tryCount += 1;

        if (tryCount === 1) {
          return Promise.resolve({
            error: FetchConnectionMetadataError.Retriable,
          });
        }

        return Promise.resolve({
          ...genConnectionMetadata(),
          error: null,
        });
      },
      WebSocketClass: WebSocket,
      context: ctx,
    },
    wrapWithDone(done, ({ channel, error, context }) => {
      expect(tryCount).toBe(2);
      expect(channel?.status).toBe('open');
      expect(context).toBe(ctx);
      expect(error).toEqual(null);

      client.close();

      return () => {
        done();
      };
    }),
  );
});

test('client retries', (done) => {
  const client = getClient(done);

  let tryCount = 0;

  client.open(
    {
      fetchConnectionMetadata: () => {
        tryCount += 1;

        if (tryCount === 1) {
          return Promise.resolve({
            ...genConnectionMetadata(),
            error: null,
            token: 'test - bad connection metadata retries',
          });
        }

        return Promise.resolve({
          ...genConnectionMetadata(),
          error: null,
        });
      },
      WebSocketClass: WebSocket,
      context: null,
    },
    wrapWithDone(done, ({ channel, error }) => {
      expect(tryCount).toBe(2);
      expect(channel?.status).toBe('open');
      expect(error).toEqual(null);

      client.close();

      return () => {
        done();
      };
    }),
  );
});

test('client retries and caches tokens', (done) => {
  const client = getClient(done);

  const fetchConnectionMetadata = jest.fn();

  let reconnectCount = 0;
  client.addDebugFunc((log) => {
    if (log.type !== 'breadcrumb' || log.message !== 'retrying') {
      return;
    }
    reconnectCount += 1;
    if (reconnectCount >= 2) {
      setTimeout(() => {
        client.close();
      });
    }
  });

  client.open(
    {
      timeout: 1,
      reuseConnectionMetadata: true,
      fetchConnectionMetadata: () => {
        fetchConnectionMetadata();
        return Promise.resolve({
          token: 'test - bad connection metadata retries',
          gurl: 'ws://invalid.example.com',
          conmanURL: 'http://invalid.example.com',
          error: null,
        });
      },
      WebSocketClass: WebSocket,
      context: null,
    },
    ({ error }) => {
      expect(fetchConnectionMetadata).toHaveBeenCalledTimes(1);

      expect(error).toBeTruthy();
      expect(error?.message).toBe('Failed to open');

      // the client will not ever successfully connect, so this cannot be
      // called in the callback.
      done();

      return () => {};
    },
  );
});

test('client retries but does not cache tokens', (done) => {
  const client = getClient(done);

  const fetchConnectionMetadata = jest.fn();

  let reconnectCount = 0;
  client.addDebugFunc((log) => {
    if (log.type !== 'breadcrumb' || log.message !== 'retrying') {
      return;
    }
    reconnectCount += 1;
    if (reconnectCount >= 2) {
      setTimeout(() => {
        client.close();
      });
    }
  });

  client.open(
    {
      timeout: 1,
      fetchConnectionMetadata: () => {
        fetchConnectionMetadata();
        return Promise.resolve({
          token: 'test - bad connection metadata retries',
          gurl: 'ws://invalid.example.com',
          conmanURL: 'http://invalid.example.com',
          error: null,
        });
      },
      WebSocketClass: WebSocket,
      context: null,
    },
    wrapWithDone(done, ({ error }) => {
      expect(fetchConnectionMetadata.mock.calls.length).toBeGreaterThan(1);

      expect(error).toBeTruthy();
      expect(error?.message).toBe('Failed to open');

      // the client will not ever successfully connect, so this cannot be
      // called in the callback.
      done();

      return () => {};
    }),
  );
});

test('client requests new connection metadata after intentional close', (done) => {
  const client = getClient(done);

  client.open(
    {
      fetchConnectionMetadata: () =>
        Promise.resolve({
          ...genConnectionMetadata(),
          error: null,
        }),
      WebSocketClass: WebSocket,
      context: null,
    },
    wrapWithDone(done, ({ channel, error }) => {
      expect(channel?.status).toBe('open');
      expect(error).toEqual(null);

      client.close();

      return () => {
        // Gotta open in a timeout, opening in a tight loop makes it loop forever
        setTimeout(() => {
          let didCallFetchConnectionMetadata = false;
          client.open(
            {
              fetchConnectionMetadata: () => {
                didCallFetchConnectionMetadata = true;
                return Promise.resolve({
                  ...genConnectionMetadata(),
                  error: null,
                });
              },
              WebSocketClass: WebSocket,
              context: null,
            },
            ({ channel: c2, error: e2 }) => {
              expect(c2?.status).toBe('open');
              expect(e2).toEqual(null);
              expect(didCallFetchConnectionMetadata).toBeTruthy();

              client.close();

              return () => {
                done();
              };
            },
          );
        });
      };
    }),
  );
});

test('channel closing itself when client willReconnect', (done) => {
  let disconnectTriggered = false;
  let clientOpenCount = 0;
  let channelOpenCount = 0;
  let connectionMetadataCount = 0;

  const client = getClient(done);

  client.open(
    {
      fetchConnectionMetadata: () => {
        connectionMetadataCount += 1;

        return Promise.resolve({
          ...genConnectionMetadata(),
          error: null,
        });
      },
      WebSocketClass: WebSocket,
      context: null,
    },
    wrapWithDone(done, ({ channel, error }) => {
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

      return wrapWithDone(done, ({ willReconnect }) => {
        if (willReconnect) {
          return;
        }

        expect(connectionMetadataCount).toEqual(2);
        expect(clientOpenCount).toEqual(2);
        expect(channelOpenCount).toEqual(1);

        done();
      });
    }),
  );

  const close = client.openChannel(
    { service: 'shell' },
    wrapWithDone(done, ({ channel, error }) => {
      channelOpenCount += 1;
      expect(error).toBe(null);
      expect(channel?.status).toBe('open');

      return wrapWithDone(done, ({ willReconnect }) => {
        expect(willReconnect).toBeTruthy();
        // This cleanup function gets called because we triggered an unintentional
        // disconnect above (`client.ws.onclose()`). Since this is unintentional
        // the client will reconnect itself. But this outer `openChannel`callback will NOT
        // get called a second time when the cleint re-connects since we are deliberately
        // closing it on the next line.
        close();
      });
    }),
  );
});

test('channel open and close', (done) => {
  const client = getClient(done);

  const channelClose = jest.fn();

  client.open(
    {
      fetchConnectionMetadata: () =>
        Promise.resolve({
          ...genConnectionMetadata(),
          error: null,
        }),
      WebSocketClass: WebSocket,
      context: null,
    },
    wrapWithDone(done, ({ channel, error }) => {
      expect(error).toEqual(null);
      expect(channel?.status).toBe('open');

      return wrapWithDone(done, () => {
        expect(channelClose).toHaveBeenCalled();

        done();
      });
    }),
  );

  const close = client.openChannel(
    { service: 'shell' },
    wrapWithDone(done, ({ channel, error }) => {
      expect(channel?.status).toBe('open');
      expect(error).toBe(null);

      setTimeout(() => {
        close();
        expect(channel?.status).toBe('closing');
      });

      return wrapWithDone(done, ({ willReconnect }) => {
        expect(willReconnect).toBeFalsy();
        expect(channel?.status).toBe('closed');

        channelClose();
        client.close();
      });
    }),
  );
});

test('channel accepts a thunk for service', (done) => {
  const context = { username: 'aghanim' };
  const client = getClient<typeof context>(done);

  const channelClose = jest.fn();

  client.open(
    {
      fetchConnectionMetadata: () =>
        Promise.resolve({
          ...genConnectionMetadata(),
          error: null,
        }),
      WebSocketClass: WebSocket,
      context,
    },
    wrapWithDone(done, ({ channel, error }) => {
      expect(error).toEqual(null);
      expect(channel?.status).toBe('open');

      return wrapWithDone(done, () => {
        expect(channelClose).toHaveBeenCalled();

        done();
      });
    }),
  );

  const close = client.openChannel(
    {
      service: wrapWithDone(done, (ctx) => {
        expect(ctx.username).toEqual('aghanim');

        return 'exec';
      }),
    },
    wrapWithDone(done, ({ channel, error }) => {
      expect(channel?.status).toBe('open');
      expect(error).toBe(null);

      setTimeout(
        wrapWithDone(done, () => {
          close();
          expect(channel?.status).toBe('closing');
        }),
      );

      return wrapWithDone(done, ({ willReconnect }) => {
        expect(willReconnect).toBeFalsy();
        expect(channel?.status).toBe('closed');

        channelClose();
        client.close();
      });
    }),
  );
});

test('channel open and close from within openChannelCb synchronously', (done) => {
  const client = getClient(done);

  const channelClose = jest.fn();

  client.open(
    {
      fetchConnectionMetadata: () =>
        Promise.resolve({
          ...genConnectionMetadata(),
          error: null,
        }),
      WebSocketClass: WebSocket,
      context: null,
    },
    wrapWithDone(done, ({ channel, error }) => {
      expect(error).toEqual(null);
      expect(channel?.status).toBe('open');

      return wrapWithDone(done, () => {
        expect(channelClose).toHaveBeenCalled();

        done();
      });
    }),
  );

  const close = client.openChannel(
    { service: 'shell' },
    wrapWithDone(done, ({ channel, error }) => {
      expect(channel?.status).toBe('open');
      expect(error).toBe(null);

      close();

      expect(channel?.status).toBe('closing');

      return wrapWithDone(done, ({ willReconnect }) => {
        expect(willReconnect).toBeFalsy();
        expect(channel?.status).toBe('closed');

        channelClose();
        client.close();
      });
    }),
  );
});

test('channel open and close from within openChannelCb synchronously', (done) => {
  const client = getClient(done);

  const channelClose = jest.fn();

  client.open(
    {
      fetchConnectionMetadata: () =>
        Promise.resolve({
          ...genConnectionMetadata(),
          error: null,
        }),
      WebSocketClass: WebSocket,
      context: null,
    },
    wrapWithDone(done, ({ channel, error }) => {
      expect(error).toEqual(null);
      expect(channel?.status).toBe('open');

      return () => {
        expect(channelClose).toHaveBeenCalled();

        done();
      };
    }),
  );

  const close = client.openChannel(
    { service: 'shell' },
    wrapWithDone(done, ({ channel, error }) => {
      expect(channel?.status).toBe('open');
      expect(error).toBe(null);

      close();

      expect(channel?.status).toBe('closing');

      return wrapWithDone(done, ({ willReconnect }) => {
        expect(willReconnect).toBeFalsy();
        expect(channel?.status).toBe('closed');

        channelClose();
        client.close();
      });
    }),
  );
});

test('channel skips opening', (done) => {
  const client = getClient<{ username: string }>(done);

  const service = 'shell';
  const ctx = { username: 'midas' };
  const skipfn = jest.fn().mockImplementation(() => true);
  const opencb = jest.fn();

  client.open(
    {
      fetchConnectionMetadata: () =>
        Promise.resolve({
          ...genConnectionMetadata(),
          error: null,
        }),
      WebSocketClass: WebSocket,
      context: ctx,
    },
    wrapWithDone(done, ({ error }) => {
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
    }),
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

  const client = getClient(done);

  client.open(
    {
      fetchConnectionMetadata: () =>
        Promise.resolve({
          ...genConnectionMetadata(),
          error: null,
        }),
      WebSocketClass: WebSocket,
      context: null,
    },
    wrapWithDone(done, ({ channel, error }) => {
      clientOpenCount += 1;
      expect(channel?.status).toBe('open');
      expect(error).toEqual(null);
      if (unexpectedDisconnectTriggered) {
        client.close();
      }

      return wrapWithDone(done, ({ willReconnect }) => {
        if (willReconnect) {
          return;
        }

        expect(clientOpenCount).toEqual(2);
        expect(channelOpenCount).toEqual(1);

        done();
      });
    }),
  );

  client.openChannel(
    {
      skip: () => channelOpenCount > 0,
      service: 'shell',
    },
    wrapWithDone(done, ({ channel, error }) => {
      if (!unexpectedDisconnectTriggered) {
        setTimeout(() => {
          // eslint-disable-next-line
          // @ts-ignore: trigger unintentional disconnect
          client.ws.close();
          unexpectedDisconnectTriggered = true;
        });

        expect(error).toBe(null);
        expect(channel?.status).toBe('open');

        channelOpenCount += 1;

        return;
      }

      expect(error).toBeTruthy();
      expect(error?.message).toBe('Failed to open');
    }),
  );
});

test('openChannel before open', (done) => {
  const client = getClient(done);

  client.openChannel(
    { service: 'exec' },
    wrapWithDone(done, ({ channel }) => {
      expect(channel).toBeTruthy();

      client.close();
    }),
  );

  client.open(
    {
      fetchConnectionMetadata: () =>
        Promise.resolve({
          ...genConnectionMetadata(),
          error: null,
        }),
      WebSocketClass: WebSocket,
      context: null,
    },
    wrapWithDone(done, ({ channel }) => {
      expect(channel).toBeTruthy();

      return () => {
        done();
      };
    }),
  );
});

test('closing client maintains openChannel requests', (done) => {
  const client = getClient(done);

  let first = true;
  client.openChannel(
    { service: 'exec' },
    wrapWithDone(done, ({ channel }) => {
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
                  ...genConnectionMetadata(),
                  error: null,
                }),
              WebSocketClass: WebSocket,
              context: null,
            },
            () => () => {
              done();
            },
          );
        }, 200);
      } else {
        client.close();
      }
    }),
  );

  client.open(
    {
      fetchConnectionMetadata: () =>
        Promise.resolve({
          ...genConnectionMetadata(),
          error: null,
        }),
      WebSocketClass: WebSocket,
      context: null,
    },
    wrapWithDone(done, ({ channel }) => {
      expect(channel).toBeTruthy();

      return () => {};
    }),
  );
});

test('client rejects opening same channel twice', (done) => {
  const client = getClient(done);
  client.setUnrecoverableErrorHandler(() => {});

  const name = Math.random().toString();
  client.openChannel({ name, service: 'exec' }, () => {});

  expect(() => {
    client.openChannel({ name, service: 'exec' }, () => {});
  }).toThrow();

  done();
});

test('allows opening channel with the same name after closing others and client is disconnected', (done) => {
  const client = getClient(done);

  const name = Math.random().toString();

  let calledFirstWithError = false;
  const close = client.openChannel({ name, service: 'exec' }, ({ error }) => {
    calledFirstWithError = Boolean(error);
  });

  close();
  // open same name synchronously
  client.openChannel(
    { name, service: 'exec' },
    wrapWithDone(done, ({ channel }) => {
      expect(channel).toBeTruthy();
      expect(calledFirstWithError).toBeTruthy();
      client.close();

      done();
    }),
  );

  client.open(
    {
      fetchConnectionMetadata: () =>
        Promise.resolve({
          ...genConnectionMetadata(),
          error: null,
        }),
      WebSocketClass: WebSocket,
      context: null,
    },
    () => {},
  );
});

test('allows opening channel with the same name after others are closing others and client is connected', (done) => {
  const client = getClient(done);

  client.open(
    {
      fetchConnectionMetadata: () =>
        Promise.resolve({
          ...genConnectionMetadata(),
          error: null,
        }),
      WebSocketClass: WebSocket,
      context: null,
    },
    wrapWithDone(done, ({ error }) => {
      if (error) {
        done(error);

        return () => {};
      }

      const name = Math.random().toString();

      let firstChannel: Channel;
      const close = client.openChannel(
        { name, service: 'exec' },
        wrapWithDone(done, ({ channel }) => {
          expect(channel).toBeTruthy();

          if (!channel) {
            throw new Error('apease typescript');
          }

          firstChannel = channel;

          expect(firstChannel.status).toEqual('closing');
        }),
      );

      // Close immediately
      close();

      // open same name synchronously
      const close2 = client.openChannel(
        { name, service: 'exec' },
        wrapWithDone(done, ({ channel: secondChannel }) => {
          // ensure first channel opens
          expect(firstChannel).toBeTruthy();
          expect(secondChannel).toBeTruthy();
          expect(secondChannel?.status).toEqual('open');
          expect(secondChannel).not.toEqual(firstChannel);

          // After the channel is opened close the current channel and open a new one
          close2();
          expect(secondChannel?.status).toEqual('closing');
          const close3 = client.openChannel(
            { name, service: 'exec' },
            wrapWithDone(done, ({ channel: finalChannel }) => {
              expect(finalChannel).toBeTruthy();
              expect(finalChannel?.status).toEqual('open');
              expect(finalChannel).not.toEqual(firstChannel);
              expect(finalChannel).not.toEqual(secondChannel);

              close3();

              client.close();
              done();
            }),
          );
        }),
      );

      return () => {};
    }),
  );
});

test('opens multiple anonymous channels while client is connected', (done) => {
  const client = getClient(done);

  let didDone = false;
  const doneOnce = (e?: Error) => {
    if (didDone) {
      return;
    }

    didDone = true;
    client.close();
    done(e);
  };

  client.open(
    {
      fetchConnectionMetadata: () =>
        Promise.resolve({
          ...genConnectionMetadata(),
          error: null,
        }),
      WebSocketClass: WebSocket,
      context: null,
    },
    wrapWithDone(done, ({ channel: chan0 }) => {
      expect(chan0).toBeTruthy();

      let firstOpened = false;
      let secondOpened = false;

      client.openChannel(
        { service: 'exec' },
        wrapWithDone(done, ({ channel }) => {
          if (firstOpened) {
            doneOnce(new Error('exepected channel to open only once'));

            return;
          }

          expect(channel).toBeTruthy();
          firstOpened = true;

          if (secondOpened) {
            doneOnce();
          }
        }),
      );

      client.openChannel(
        { service: 'exec' },
        wrapWithDone(done, ({ channel }) => {
          if (secondOpened) {
            doneOnce(new Error('exepected channel to open only once'));

            return;
          }

          expect(channel).toBeTruthy();
          secondOpened = true;

          if (firstOpened) {
            doneOnce();
          }
        }),
      );

      return () => {};
    }),
  );
});

test('client reconnects unexpected disconnects', (done) => {
  const client = getClient(done);

  let disconnectTriggered = false;
  let timesConnected = 0;
  let timesClosedUnintentionally = 0;
  let timesClosedIntentionally = 0;

  client.open(
    {
      fetchConnectionMetadata: () =>
        Promise.resolve({
          ...genConnectionMetadata(),
          error: null,
        }),
      WebSocketClass: WebSocket,
      context: null,
    },
    wrapWithDone(done, ({ channel, error }) => {
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

          done();
        }
      };
    }),
  );
});

test('client is closed while reconnecting', (done) => {
  const onOpen = jest.fn();

  const client = getClient(done);
  client.addDebugFunc((log) => {
    if (log.type === 'breadcrumb' && log.message === 'reconnecting') {
      setTimeout(() => {
        client.close();
      });
    }
  });

  client.open(
    {
      fetchConnectionMetadata: () =>
        Promise.resolve({
          ...genConnectionMetadata(),
          error: null,
        }),
      WebSocketClass: WebSocket,
      context: null,
    },
    wrapWithDone(done, ({ channel }) => {
      if (channel) {
        // called once after initial connect
        onOpen();

        setTimeout(() => {
          // eslint-disable-next-line
          // @ts-ignore: trigger unintentional disconnect
          client.ws?.close();
        });
      }

      return wrapWithDone(done, () => {
        expect(onOpen).toHaveBeenCalledTimes(1);
        done();
      });
    }),
  );
});

test('closing before ever connecting', (done) => {
  const client = getClient(done);
  client.addDebugFunc((log) => {
    if (log.type === 'breadcrumb' && log.message === 'connecting') {
      setTimeout(() => {
        client.close();
      });
    }
  });

  const open = jest.fn();
  const openError = jest.fn();
  const close = jest.fn();

  client.open(
    {
      fetchConnectionMetadata: () =>
        Promise.resolve({
          ...genConnectionMetadata(),
          error: null,
        }),
      WebSocketClass: WebSocket,
      context: null,
    },
    wrapWithDone(done, ({ error }) => {
      if (error) {
        openError();
        expect(open).not.toHaveBeenCalled();
        expect(openError).toHaveBeenCalledTimes(1);
        expect(close).not.toHaveBeenCalled();

        // the client will not ever successfully connect, so this cannot be
        // called in the callback.
        done();
      } else {
        open();
      }

      return () => {
        close();
      };
    }),
  );
});

test('fallback to polling', (done) => {
  const client = getClient(done);

  const WebsocketThatNeverConnects = getWebsocketClassThatNeverConnects();

  let didLogFallback = false;
  client.addDebugFunc((log) => {
    if (log.type === 'breadcrumb' && log.message === 'polling fallback') {
      didLogFallback = true;
    }
  });

  client.open(
    {
      timeout: 2000,
      fetchConnectionMetadata: () =>
        Promise.resolve({
          ...genConnectionMetadata(),
          error: null,
        }),
      WebSocketClass: WebsocketThatNeverConnects,
      context: null,
      pollingHost: 'gp-v2.replit.com',
    },
    wrapWithDone(done, ({ channel, error }) => {
      expect(error).toBeNull();
      expect(channel).not.toBeNull();
      expect(didLogFallback).toBe(true);
      client.close();

      return () => {
        done();
      };
    }),
  );
}, 40000);

test('does not fallback to polling if host is unset', (done) => {
  const client = getClient(done);
  client.setUnrecoverableErrorHandler(() => {});

  const WebsocketThatNeverConnects = getWebsocketClassThatNeverConnects();

  let didLogFallback = false;
  client.addDebugFunc((log) => {
    if (
      log.type === 'breadcrumb' &&
      log.message === 'connecting' &&
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (log.data as Record<string, any>)?.connectTries === 4
    ) {
      setTimeout(() => {
        client.destroy();
      });
    }
    if (log.type === 'breadcrumb' && log.message === 'polling fallback') {
      didLogFallback = true;
    }
  });

  client.open(
    {
      timeout: 500,
      fetchConnectionMetadata: () =>
        Promise.resolve({
          ...genConnectionMetadata(),
          error: null,
        }),
      WebSocketClass: WebsocketThatNeverConnects,
      context: null,
    },
    wrapWithDone(done, ({ channel, error }) => {
      expect(didLogFallback).toBe(false);
      expect(channel).toBeNull();
      expect(error).not.toBeNull();

      done();
    }),
  );
}, 40000);

test('fetch token fail', (done) => {
  const chan0Cb = jest.fn();
  const client = getClient(done);

  client.setUnrecoverableErrorHandler(
    wrapWithDone(done, (e) => {
      expect(chan0Cb).toHaveBeenCalledTimes(1);
      expect(e.message).toContain('fail');

      done();
    }),
  );

  client.open(
    {
      fetchConnectionMetadata: () =>
        Promise.resolve({
          error: new Error('fail'),
        }),
      WebSocketClass: WebSocket,
      context: null,
    },
    chan0Cb,
  );
});

test('fetch abort signal works as expected', (done) => {
  const client = getClient(done);

  const onAbort = jest.fn();

  client.open(
    {
      fetchConnectionMetadata: (abortSignal) =>
        new Promise((r) => {
          // Listen to abort signal
          abortSignal.onabort = () => {
            onAbort();
            r({
              error: FetchConnectionMetadataError.Aborted,
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
    wrapWithDone(done, ({ channel, error }) => {
      expect(channel).toBe(null);
      expect(error).toBeTruthy();
      expect(error?.message).toBe('Failed to open');
      expect(onAbort).toHaveBeenCalledTimes(1);

      // The client will not ever successfully connect, so this cannot be
      // called in the callback.
      done();

      return () => {};
    }),
  );
});

test('can close and open in synchronously without aborting fetch token', (done) => {
  const client = getClient(done);

  const onAbort = jest.fn();
  const firstChan0Cb = jest.fn();

  let resolveFetchToken: null | ((result: FetchConnectionMetadataResult) => void) = null;
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
  // resolving the first fetch token later shouldn't case any errors
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  resolveFetchToken!({ error: FetchConnectionMetadataError.Aborted });
  expect(onAbort).toHaveBeenCalledTimes(1);
  expect(firstChan0Cb).toHaveBeenCalledTimes(1);
  expect(firstChan0Cb).toHaveBeenLastCalledWith(
    expect.objectContaining({
      channel: null,
      context: null,
      error: expect.any(Error),
    }),
  );

  client.open(
    {
      fetchConnectionMetadata: () =>
        Promise.resolve({
          ...genConnectionMetadata(),
          error: null,
        }),
      WebSocketClass: WebSocket,
      context: null,
    },
    wrapWithDone(done, ({ channel, error }) => {
      expect(channel?.status).toBe('open');
      expect(error).toEqual(null);

      client.close();

      return wrapWithDone(done, () => {
        expect(firstChan0Cb).toHaveBeenCalledTimes(1);

        done();
      });
    }),
  );
});
