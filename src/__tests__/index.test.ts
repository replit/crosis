/* eslint-env jest */

import type { FetchConnectionMetadataResult } from '../types';
import { Client, FetchConnectionMetadataError } from '..';
import { getWebSocketClass } from '../util/helpers';
import { Channel } from '../channel';

// eslint-disable-next-line
const genConnectionMetadata = require('../../debug/genConnectionMetadata');

// eslint-disable-next-line
const WebSocket = require('ws');

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
          ...genConnectionMetadata(),
          error: null,
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
            token: 'test - bad connection metadata retries',
            gurl: 'ws://invalid.example.com',
            conmanURL: 'http://invalid.example.com',
            error: null,
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
          ...genConnectionMetadata(),
          error: null,
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
          ...genConnectionMetadata(),
          error: null,
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

test('channel accepts a thunk for service', (done) => {
  const onUnrecoverableError = jest.fn<void, [Error]>();
  const context = { username: 'aghanim' };
  const client = new Client<typeof context>();
  client.setUnrecoverableErrorHandler(done);

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

  const close = client.openChannel(
    {
      service: (ctx) => {
        expect(ctx.username).toEqual('aghanim');

        return 'exec';
      },
    },
    ({ channel, error }) => {
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
    },
  );
});

test('channel open and close from within openChannelCb synchornously', (done) => {
  const onUnrecoverableError = jest.fn<void, [Error]>();
  const client = new Client();
  client.setUnrecoverableErrorHandler(done);

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

test('channel open and close from within openChannelCb synchornously', (done) => {
  const onUnrecoverableError = jest.fn<void, [Error]>();
  const client = new Client();
  client.setUnrecoverableErrorHandler(done);

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
      fetchConnectionMetadata: () =>
        Promise.resolve({
          ...genConnectionMetadata(),
          error: null,
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
          ...genConnectionMetadata(),
          error: null,
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
          ...genConnectionMetadata(),
          error: null,
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

test('closing client maintains openChannel requests', (done) => {
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
                ...genConnectionMetadata(),
                error: null,
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
          ...genConnectionMetadata(),
          error: null,
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

test('allows opening channel with the same name after closing others and client is disconnected', (done) => {
  const client = new Client();
  client.setUnrecoverableErrorHandler(done);

  const name = Math.random().toString();

  const close = client.openChannel({ name, service: 'exec' }, () => {});

  close();
  // open same name synchronously
  client.openChannel({ name, service: 'exec' }, ({ channel }) => {
    expect(channel).toBeTruthy();
    client.close();

    done();
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
    () => {},
  );
});

test('allows opening channel with the same name after others are closing others and client is connected', (done) => {
  const client = new Client();
  client.setUnrecoverableErrorHandler(done);

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
    ({ error }) => {
      if (error) {
        done(error);

        return () => {};
      }

      const name = Math.random().toString();

      let firstChannel: Channel;
      const close = client.openChannel({ name, service: 'exec' }, ({ channel }) => {
        expect(channel).toBeTruthy();

        if (!channel) {
          throw new Error('apease typescript');
        }

        firstChannel = channel;

        expect(firstChannel.status).toEqual('closing');
      });

      // Close immediately
      close();

      // open same name synchronously
      const close2 = client.openChannel({ name, service: 'exec' }, ({ channel: secondChannel }) => {
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
          ({ channel: finalChannel }) => {
            expect(finalChannel).toBeTruthy();
            expect(finalChannel?.status).toEqual('open');
            expect(finalChannel).not.toEqual(firstChannel);
            expect(finalChannel).not.toEqual(secondChannel);

            close3();

            client.close();
            done();
          },
        );
      });

      return () => {};
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
      fetchConnectionMetadata: () =>
        Promise.resolve({
          ...genConnectionMetadata(),
          error: null,
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
      ...genConnectionMetadata(),
      error: null,
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
          ...genConnectionMetadata(),
          error: null,
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

test('fallback to polling', (done) => {
  const onUnrecoverableError = jest.fn<void, [Error]>();
  const client = new Client();
  client.setUnrecoverableErrorHandler(onUnrecoverableError);

  class WebsocketThatNeverConnects {
    static OPEN = 1;
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  expect(() => getWebSocketClass(WebsocketThatNeverConnects)).not.toThrow();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  expect(getWebSocketClass(WebsocketThatNeverConnects)).toEqual(WebsocketThatNeverConnects);

  let didLogFallback = false;
  client.setDebugFunc((log) => {
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
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      WebSocketClass: WebsocketThatNeverConnects,
      context: null,
    },
    ({ channel, error }) => {
      expect(error).toBeNull();
      expect(channel).not.toBeNull();
      expect(didLogFallback).toBe(true);
      expect(onUnrecoverableError).not.toHaveBeenCalled();
      client.close();

      return () => {
        done();
      };
    },
  );
}, 30000);

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
  // resolving the first fetch token later shouldn't casue any errors
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

  client.setUnrecoverableErrorHandler(done);

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
