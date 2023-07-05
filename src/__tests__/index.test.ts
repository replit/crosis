/* eslint-env jest */

import type { FetchConnectionMetadataResult } from '../types';
import { Client, FetchConnectionMetadataError } from '..';
import { getWebSocketClass } from '../util/helpers';
import { Channel } from '../channel';
import { createCloseEvent } from '../util/EIOCompat';
import { api } from '@replit/protocol';
import { concurrent } from '../__testutils__/concurrent';
import { wrapWithDone } from '../__testutils__/done';
import genConnectionMetadata from '../../debug/genConnectionMetadata';

// eslint-disable-next-line
const WebSocket = require('ws');

jest.setTimeout(30 * 1000);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const testingClients: Array<Client<any>> = [];

// Just a helper that to help us exit from jest without any open handles
function getClient<Ctx = null>(done: jest.DoneCallback) {
  const c = new Client<Ctx>();
  c.setUnrecoverableErrorHandler(done);
  testingClients.push(c);

  return c;
}

const getConnectionMetadata = async () => ({
  ...genConnectionMetadata(),
  error: null,
});

afterAll(() => {
  testingClients.forEach((c) => c.destroy());
});

function getWebsocketClassThatNeverConnects() {
  class _WebsocketThatNeverConnects {
    static OPEN = 1;

    onclose?: (closeEvent: CloseEvent) => void;

    send = () => {};

    close = (code = 1000, reason?: string) => {
      setTimeout(() => this.onclose?.(createCloseEvent({ code, reason })));
    };
  }

  const WebsocketThatNeverConnects = _WebsocketThatNeverConnects as typeof WebSocket;

  // Make sure internals think it's a websocket
  expect(() => getWebSocketClass(WebsocketThatNeverConnects)).not.toThrow();
  expect(getWebSocketClass(WebsocketThatNeverConnects)).toEqual(WebsocketThatNeverConnects);

  return WebsocketThatNeverConnects;
}

concurrent('client connect', (done) => {
  const client = getClient<{ username: string }>(done);

  const ctx = { username: 'zyzz' };

  client.open(
    {
      fetchConnectionMetadata: getConnectionMetadata,
      WebSocketClass: WebSocket,
      context: ctx,
    },
    wrapWithDone(done, ({ channel, context }) => {
      expect(channel?.status).toBe('open');
      expect(context).toBe(ctx);

      client.close();

      return () => {
        done();
      };
    }),
  );
});

concurrent('client connect with connection metadata retry', (done) => {
  const client = getClient<{ username: string }>(done);

  const ctx = { username: 'zyzz' };

  let tryCount = 0;

  client.open(
    {
      fetchConnectionMetadata: async () => {
        tryCount += 1;

        if (tryCount === 1) {
          return {
            error: FetchConnectionMetadataError.Retriable,
          };
        }

        return {
          ...genConnectionMetadata(),
          error: null,
        };
      },
      WebSocketClass: WebSocket,
      context: ctx,
    },
    wrapWithDone(done, ({ channel, context }) => {
      expect(tryCount).toBe(2);
      expect(channel?.status).toBe('open');
      expect(context).toBe(ctx);

      client.close();

      return () => {
        done();
      };
    }),
  );
});

concurrent('client retries', (done) => {
  const client = getClient(done);

  let tryCount = 0;

  client.open(
    {
      fetchConnectionMetadata: async () => {
        tryCount += 1;

        if (tryCount === 1) {
          return {
            ...genConnectionMetadata(),
            error: null,
            token: 'test - bad connection metadata retries',
          };
        }

        return getConnectionMetadata();
      },
      WebSocketClass: WebSocket,
      context: null,
    },
    wrapWithDone(done, ({ channel }) => {
      expect(tryCount).toBe(2);
      expect(channel?.status).toBe('open');

      client.close();

      return () => {
        done();
      };
    }),
  );
});

concurrent('client retries and caches tokens', (done) => {
  const client = getClient(done);

  const fetchConnectionMetadata = jest.fn();
  const onConnect = jest.fn();

  let reconnectCount = 0;
  client.onDebugLog((log) => {
    if (log.type === 'breadcrumb' && log.message === 'status:closed') {
      expect(fetchConnectionMetadata).toHaveBeenCalledTimes(1);
      expect(onConnect).not.toHaveBeenCalled();
      done();

      return;
    }

    if (log.type !== 'breadcrumb' || log.message !== 'status:retrying') {
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
      fetchConnectionMetadata: async () => {
        fetchConnectionMetadata();
        return {
          token: 'test - bad connection metadata retries',
          gurl: 'ws://invalid.example.com',
          conmanURL: 'http://invalid.example.com',
          error: null,
        };
      },
      WebSocketClass: WebSocket,
      context: null,
    },
    onConnect,
  );
});

concurrent('client retries but does not cache tokens', (done) => {
  const client = getClient(done);

  const fetchConnectionMetadata = jest.fn();
  const onConnect = jest.fn();

  let reconnectCount = 0;
  client.onDebugLog((log) => {
    if (log.type === 'breadcrumb' && log.message === 'status:closed') {
      expect(fetchConnectionMetadata.mock.calls.length).toBeGreaterThan(1);
      expect(onConnect).not.toHaveBeenCalled();
      done();

      return;
    }

    if (log.type !== 'breadcrumb' || log.message !== 'status:retrying') {
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
      fetchConnectionMetadata: async () => {
        fetchConnectionMetadata();
        return {
          token: 'test - bad connection metadata retries',
          gurl: 'ws://invalid.example.com',
          conmanURL: 'http://invalid.example.com',
          error: null,
        };
      },
      WebSocketClass: WebSocket,
      context: null,
    },
    onConnect,
  );
});

concurrent('client requests new connection metadata after intentional close', (done) => {
  const client = getClient(done);

  client.open(
    {
      fetchConnectionMetadata: getConnectionMetadata,
      WebSocketClass: WebSocket,
      context: null,
    },
    wrapWithDone(done, ({ channel }) => {
      expect(channel?.status).toBe('open');

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
            ({ channel: c2 }) => {
              expect(c2?.status).toBe('open');
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

concurrent('channel closing itself when client willReconnect', (done) => {
  let disconnectTriggered = false;
  let clientOpenCount = 0;
  let channelOpenCount = 0;
  let connectionMetadataCount = 0;

  const client = getClient(done);

  client.open(
    {
      fetchConnectionMetadata: () => {
        connectionMetadataCount += 1;

        return getConnectionMetadata();
      },
      WebSocketClass: WebSocket,
      context: null,
    },
    wrapWithDone(done, ({ channel }) => {
      clientOpenCount += 1;
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
    wrapWithDone(done, ({ channel }) => {
      channelOpenCount += 1;
      expect(channel?.status).toBe('open');

      return wrapWithDone(done, ({ willReconnect }) => {
        expect(willReconnect).toBeTruthy();
        // This cleanup function gets called because we triggered an unintentional
        // disconnect above (`client.ws.onclose()`). Since this is unintentional
        // the client will reconnect itself. But this outer `openChannel`callback will NOT
        // get called a second time when the client re-connects since we are deliberately
        // closing it on the next line.
        close();
      });
    }),
  );
});

concurrent('channel open and close', (done) => {
  const client = getClient(done);

  const channelClose = jest.fn();

  client.open(
    {
      fetchConnectionMetadata: getConnectionMetadata,
      WebSocketClass: WebSocket,
      context: null,
    },
    wrapWithDone(done, ({ channel }) => {
      expect(channel?.status).toBe('open');

      return wrapWithDone(done, () => {
        expect(channelClose).toHaveBeenCalled();

        done();
      });
    }),
  );

  const close = client.openChannel(
    { service: 'shell' },
    wrapWithDone(done, ({ channel }) => {
      expect(channel?.status).toBe('open');

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

concurrent('channel accepts a thunk for service', (done) => {
  const context = { username: 'aghanim' };
  const client = getClient<typeof context>(done);

  const channelClose = jest.fn();

  client.open(
    {
      fetchConnectionMetadata: getConnectionMetadata,
      WebSocketClass: WebSocket,
      context,
    },
    wrapWithDone(done, ({ channel }) => {
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
    wrapWithDone(done, ({ channel }) => {
      expect(channel?.status).toBe('open');

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

concurrent('channel open and close from within openChannelCb synchronously', (done) => {
  const client = getClient(done);

  const channelClose = jest.fn();

  client.open(
    {
      fetchConnectionMetadata: getConnectionMetadata,
      WebSocketClass: WebSocket,
      context: null,
    },
    wrapWithDone(done, ({ channel }) => {
      expect(channel?.status).toBe('open');

      return wrapWithDone(done, () => {
        expect(channelClose).toHaveBeenCalled();

        done();
      });
    }),
  );

  const close = client.openChannel(
    { service: 'shell' },
    wrapWithDone(done, ({ channel }) => {
      expect(channel?.status).toBe('open');

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

concurrent('channel open and close from within openChannelCb synchronously', (done) => {
  const client = getClient(done);

  const channelClose = jest.fn();

  client.open(
    {
      fetchConnectionMetadata: getConnectionMetadata,
      WebSocketClass: WebSocket,
      context: null,
    },
    wrapWithDone(done, ({ channel }) => {
      expect(channel?.status).toBe('open');

      return () => {
        expect(channelClose).toHaveBeenCalled();

        done();
      };
    }),
  );

  const close = client.openChannel(
    { service: 'shell' },
    wrapWithDone(done, ({ channel }) => {
      expect(channel?.status).toBe('open');

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

concurrent('channel skips opening', (done) => {
  const client = getClient<{ username: string }>(done);

  const service = 'shell';
  const ctx = { username: 'midas' };
  const skipfn = jest.fn().mockImplementation(() => true);
  const opencb = jest.fn();

  client.open(
    {
      fetchConnectionMetadata: async () => ({
        ...genConnectionMetadata(),
        error: null,
      }),
      WebSocketClass: WebSocket,
      context: ctx,
    },
    wrapWithDone(done, () => {
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

concurrent('channel skips opening conditionally', (done) => {
  let unexpectedDisconnectTriggered = false;
  let clientOpenCount = 0;
  let channelOpenCount = 0;

  const client = getClient(done);

  client.open(
    {
      fetchConnectionMetadata: getConnectionMetadata,
      WebSocketClass: WebSocket,
      context: null,
    },
    wrapWithDone(done, ({ channel }) => {
      clientOpenCount += 1;
      expect(channel?.status).toBe('open');

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
    wrapWithDone(done, ({ channel }) => {
      if (!unexpectedDisconnectTriggered) {
        setTimeout(() => {
          // eslint-disable-next-line
          // @ts-ignore: trigger unintentional disconnect
          client.ws.close();
          unexpectedDisconnectTriggered = true;
        });

        expect(channel?.status).toBe('open');

        channelOpenCount += 1;

        return;
      }

      // We do not expect to call onConnect when we failed to open the channel
      // (because we never reopen the connection in this test).
      done(new Error('Expected not to get here.'));
    }),
  );
});

concurrent('openChannel before open', (done) => {
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
      fetchConnectionMetadata: getConnectionMetadata,
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

concurrent('closing client maintains openChannel requests', (done) => {
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
      fetchConnectionMetadata: getConnectionMetadata,
      WebSocketClass: WebSocket,
      context: null,
    },
    wrapWithDone(done, ({ channel }) => {
      expect(channel).toBeTruthy();

      return () => {};
    }),
  );
});

concurrent('client rejects opening same channel twice', (done) => {
  const client = getClient(done);
  client.setUnrecoverableErrorHandler(() => {});

  const name = Math.random().toString();
  client.openChannel({ name, service: 'exec' }, () => {});

  expect(() => {
    client.openChannel({ name, service: 'exec' }, () => {});
  }).toThrow();

  done();
});

concurrent(
  'allows opening channel with the same name after closing others and client is disconnected',
  (done) => {
    const client = getClient(done);

    const name = Math.random().toString();

    const firstOnConnect = jest.fn();
    const close = client.openChannel({ name, service: 'exec' }, firstOnConnect);
    close();

    // open same name synchronously
    client.openChannel(
      { name, service: 'exec' },
      wrapWithDone(done, ({ channel }) => {
        expect(channel).toBeTruthy();
        expect(firstOnConnect).not.toHaveBeenCalled();

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
  },
);

concurrent(
  'allows opening channel with the same name after closing (connected, wait for open)',
  (done) => {
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
      wrapWithDone(done, () => {
        (async () => {
          const name = Math.random().toString();

          let firstChannel: Channel;

          await new Promise<void>((resolve) => {
            const close = client.openChannel(
              { name, service: 'exec' },
              wrapWithDone(done, ({ channel }) => {
                // if we get here, we should have a channel.
                // we're waiting to get here in this test, so it should be open!

                expect(channel).toBeTruthy();

                if (!channel) {
                  throw new Error('appease typescript');
                }

                firstChannel = channel;

                // close immediately.
                close();

                expect(firstChannel.status).toEqual('closing');

                // then continue the test.
                resolve();
              }),
            );
          });

          // open same name
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
        })();

        return () => {};
      }),
    );
  },
);

concurrent(
  'allows opening channel with the same name after closing (connected, do not wait for open)',
  (done) => {
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
      wrapWithDone(done, () => {
        const name = Math.random().toString();

        let firstChannel: Channel;

        const close = client.openChannel(
          { name, service: 'exec' },
          wrapWithDone(done, ({ channel }) => {
            // if we get here, we should have a channel.
            expect(channel).toBeTruthy();

            if (!channel) {
              throw new Error('appease typescript');
            }

            firstChannel = channel;
          }),
        );

        // close immediately, this likely means no channel will be returned
        close();

        // open same name
        const close2 = client.openChannel(
          { name, service: 'exec' },
          wrapWithDone(done, ({ channel: secondChannel }) => {
            // ensure first channel opens
            expect(firstChannel).not.toEqual(secondChannel);

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
  },
);

concurrent('opens multiple anonymous channels while client is connected', (done) => {
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
      fetchConnectionMetadata: getConnectionMetadata,
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
            doneOnce(new Error('expected channel to open only once'));

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
            doneOnce(new Error('expected channel to open only once'));

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

concurrent('client reconnects unexpected disconnects', (done) => {
  const client = getClient(done);

  let disconnectTriggered = false;
  let timesConnected = 0;
  let timesClosedUnintentionally = 0;
  let timesClosedIntentionally = 0;

  client.open(
    {
      fetchConnectionMetadata: getConnectionMetadata,
      WebSocketClass: WebSocket,
      context: null,
    },
    wrapWithDone(done, ({ channel }) => {
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

concurrent(
  'client handles user handled (expectReconnect = true) reconnects',
  async (done: jest.DoneCallback) => {
    const client = getClient(done);

    const connectArgs = {
      fetchConnectionMetadata: getConnectionMetadata,
      WebSocketClass: WebSocket,
      context: null,
    };

    let hasClosed = false;

    await new Promise<Channel>((resolve) => {
      client.open(
        connectArgs,
        wrapWithDone(done, ({ channel }) => {
          expect(channel?.status).toEqual('open');

          if (!channel) {
            throw new Error('Expected channel to be defined');
          }
          resolve(channel);

          if (!hasClosed) {
            client.close({
              expectReconnect: true,
            });
          } else {
            client.close();
          }

          return (closeReason) => {
            if (closeReason.initiator !== 'client') {
              throw new Error('Expected "client" initiator');
            }

            if (hasClosed) {
              expect(closeReason.willReconnect).toEqual(false);
              done();
            } else {
              expect(closeReason.willReconnect).toEqual(true);
              hasClosed = true;
            }
          };
        }),
      );
    });
  },
);

concurrent('client is closed while reconnecting', (done) => {
  const onOpen = jest.fn();

  const client = getClient(done);
  client.onDebugLog((log) => {
    if (log.type === 'breadcrumb' && log.message === 'status:reconnecting') {
      setTimeout(() => {
        client.close();
      });
    }
  });

  client.open(
    {
      fetchConnectionMetadata: getConnectionMetadata,
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

concurrent(
  'fallback to polling',
  (done) => {
    const client = getClient(done);

    const WebsocketThatNeverConnects = getWebsocketClassThatNeverConnects();

    let didLogFallback = false;
    client.onDebugLog((log) => {
      if (log.type === 'breadcrumb' && log.message === 'websocket:polling fallback') {
        didLogFallback = true;
      }
    });

    client.open(
      {
        timeout: 2000,
        fetchConnectionMetadata: async () => ({
          ...genConnectionMetadata(),
          error: null,
        }),
        WebSocketClass: WebsocketThatNeverConnects,
        context: null,
        pollingHost: 'gp-v2.replit.com',
      },
      wrapWithDone(done, ({ channel }) => {
        expect(channel).not.toBeNull();
        expect(didLogFallback).toBe(true);
        client.close();

        return () => {
          done();
        };
      }),
    );
  },
  70000,
);

concurrent(
  'does not fallback to polling if host is unset',
  (done) => {
    const client = getClient(done);

    const onConnect = jest.fn();
    client.setUnrecoverableErrorHandler(() => {});
    client.onDebugLog((log) => {
      if (log.type === 'breadcrumb' && log.message === 'status:closed') {
        expect(didLogFallback).toBe(false);
        expect(onConnect).not.toHaveBeenCalled();

        done();
      }
    });

    const WebsocketThatNeverConnects = getWebsocketClassThatNeverConnects();

    let didLogFallback = false;
    client.onDebugLog((log) => {
      if (
        log.type === 'breadcrumb' &&
        log.message === 'status:connecting' &&
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (log.data as Record<string, any>)?.connectTries === 4
      ) {
        setTimeout(() => {
          client.destroy();
        });
      }
      if (log.type === 'breadcrumb' && log.message === 'websocket:polling fallback') {
        didLogFallback = true;
      }
    });

    client.open(
      {
        timeout: 500,
        fetchConnectionMetadata: getConnectionMetadata,
        WebSocketClass: WebsocketThatNeverConnects,
        context: null,
      },
      onConnect,
    );
  },
  40000,
);

concurrent(
  'cancels connection timeout when closing',
  (done) => {
    const client = getClient(done);

    const WebsocketThatNeverConnects = getWebsocketClassThatNeverConnects();

    const timeout = 2000;

    client.onDebugLog((log) => {
      if (log.type === 'breadcrumb' && log.message === 'status:connecting') {
        setTimeout(() => {
          client.close();

          setTimeout(() => {
            done();
            // ample time for the other timeout to clear up
            // and wreak havoc if it was to do that.
          }, timeout + 100);
        });
      }
    });

    client.open(
      {
        timeout,
        fetchConnectionMetadata: async () => ({
          ...genConnectionMetadata(),
          error: null,
        }),
        WebSocketClass: WebsocketThatNeverConnects,
        context: null,
      },
      () => {},
    );
  },
  20000,
);

concurrent('fetch token fail', (done) => {
  const chan0Cb = jest.fn();
  const client = getClient(done);

  client.setUnrecoverableErrorHandler(
    wrapWithDone(done, (e) => {
      expect(chan0Cb).toHaveBeenCalledTimes(0);
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

concurrent('fetch abort signal works as expected', (done) => {
  const client = getClient(done);

  const onAbort = jest.fn();
  const onConnect = jest.fn();

  client.onDebugLog((log) => {
    if (log.type === 'breadcrumb' && log.message === 'status:closed') {
      // wait for the abort signal to be handled
      expect(onAbort).toHaveBeenCalledTimes(1);
      expect(onConnect).not.toHaveBeenCalled();

      done();
    }
  });

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
    onConnect,
  );
});

concurrent('can close and open in synchronously without aborting fetch token', (done) => {
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
  expect(firstChan0Cb).toHaveBeenCalledTimes(0);

  client.open(
    {
      fetchConnectionMetadata: getConnectionMetadata,
      WebSocketClass: WebSocket,
      context: null,
    },
    wrapWithDone(done, ({ channel }) => {
      expect(channel?.status).toBe('open');

      client.close();

      return wrapWithDone(done, () => {
        expect(firstChan0Cb).toHaveBeenCalledTimes(0);

        done();
      });
    }),
  );
});

concurrent('emits boot status messages', (done) => {
  const client = getClient<{ username: string }>(done);

  const ctx = { username: 'zyzz' };

  let count = 0;
  client.onBootStatus(
    wrapWithDone(done, (bootStatus) => {
      if (bootStatus.stage === api.BootStatus.Stage.PROXY) {
        // we're just going to ignore any proxy steps for the sake of counting
        // the order of the other steps; they're optional and potentially
        // stochastic.
        return;
      }

      count++;

      if (count === 1) {
        expect(bootStatus).toEqual(
          expect.objectContaining({
            stage: api.BootStatus.Stage.HANDSHAKE,
          }),
        );
      } else if (count === 2) {
        expect(bootStatus).toEqual(
          expect.objectContaining({
            stage: api.BootStatus.Stage.ACQUIRING,
          }),
        );
      } else if (count === 3) {
        // LOAD_BLOCKS and PULL_FILES aren't emitted since
        // this container should not have any history

        expect(bootStatus).toEqual(
          expect.objectContaining({
            stage: api.BootStatus.Stage.COMPLETE,
          }),
        );

        client.destroy();
        done();
      }
    }),
  );

  client.open(
    {
      fetchConnectionMetadata: getConnectionMetadata,
      WebSocketClass: WebSocket,
      context: ctx,
    },
    () => {},
  );
});
