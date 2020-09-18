/* eslint-env jest */

import { Client } from '..';

// eslint-disable-next-line
const WebSocket = require('ws');

const REPL_TOKEN = process.env.REPL_TOKEN as string;

if (!REPL_TOKEN) {
  throw new Error('REPL_TOKEN is required');
}

jest.setTimeout(10 * 1000);

test('client connect', (done) => {
  const onUnrecoverableError = jest.fn<void, [Error]>();
  const client = new Client();
  client.setUnrecoverErrorHandler(onUnrecoverableError);

  client.open(
    {
      fetchToken: () => Promise.resolve({ token: REPL_TOKEN, aborted: false }),
      WebSocketClass: WebSocket,
    },
    ({ channel, error }) => {
      expect(channel?.closed).toBe(false);
      expect(error).toEqual(null);

      setTimeout(() => client.close());

      return () => {
        expect(onUnrecoverableError).toHaveBeenCalledTimes(0);
        done();
      };
    },
  );
});

test('channel closing itself when client willReconnect', (done) => {
  let disconnectTriggered = false;
  let clientOpenCount = 0;
  let channelOpenCount = 0;

  const onUnrecoverableError = jest.fn<void, [Error]>();
  const client = new Client();
  client.setUnrecoverErrorHandler(onUnrecoverableError);

  client.open(
    {
      fetchToken: () => Promise.resolve({ token: REPL_TOKEN, aborted: false }),
      WebSocketClass: WebSocket,
    },
    ({ channel, error }) => {
      clientOpenCount += 1;
      expect(channel?.closed).toBe(false);
      expect(error).toEqual(null);

      if (!disconnectTriggered) {
        setTimeout(() => {
          // eslint-disable-next-line
          // @ts-ignore: trigger unintentional disconnect
          client.ws?.onclose();
          disconnectTriggered = true;
        }, 1000);
      } else {
        setTimeout(() => client.close());
      }

      return ({ willReconnect }) => {
        if (willReconnect) {
          return;
        }

        expect(clientOpenCount).toEqual(2);
        expect(channelOpenCount).toEqual(1);

        expect(onUnrecoverableError).toHaveBeenCalledTimes(0);
        done();
      };
    },
  );

  const close = client.openChannel({ service: 'shell' }, ({ channel, error }) => {
    channelOpenCount += 1;
    expect(channel?.closed).toBe(false);
    expect(error).toBe(null);

    return () => {
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
  client.setUnrecoverErrorHandler(onUnrecoverableError);

  const channelClose = jest.fn();

  client.open(
    {
      fetchToken: () => Promise.resolve({ token: REPL_TOKEN, aborted: false }),
      WebSocketClass: WebSocket,
    },
    ({ channel, error }) => {
      expect(channel?.closed).toBe(false);
      expect(error).toEqual(null);

      return () => {
        expect(channelClose).toHaveBeenCalled();

        expect(onUnrecoverableError).toHaveBeenCalledTimes(0);
        done();
      };
    },
  );

  const close = client.openChannel({ service: 'shell' }, ({ channel, error }) => {
    expect(channel?.closed).toBe(false);
    expect(error).toBe(null);

    close();

    return () => {
      channelClose();
      client.close();
    };
  });
});

test('channel skips opening', (done) => {
  const onUnrecoverableError = jest.fn<void, [Error]>();
  const client = new Client();
  client.setUnrecoverErrorHandler(onUnrecoverableError);
  const service = 'shell';

  client.open(
    {
      fetchToken: () => Promise.resolve({ token: REPL_TOKEN, aborted: false }),
      WebSocketClass: WebSocket,
    },
    ({ error }) => {
      expect(error).toBeNull();

      setTimeout(() => client.close());

      return () => {
        // eslint-disable-next-line
        // @ts-ignore
        const request = client.channelRequests.find((cr) => cr.options.service === service);

        if (!request) {
          throw new Error('Expected request');
        }

        // If currentChannel is null we didn't try to open a the channel
        expect(request.currentChannel).toBeNull();

        expect(onUnrecoverableError).toHaveBeenCalledTimes(0);
        done();
      };
    },
  );

  client.openChannel({ service, skip: () => true }, () => {});
});

test('channel skips opening conditionally', (done) => {
  let disconnectTriggered = false;
  let clientOpenCount = 0;
  let channelOpenCount = 0;

  const onUnrecoverableError = jest.fn<void, [Error]>();
  const client = new Client();
  client.setUnrecoverErrorHandler(onUnrecoverableError);
  const service = 'shell';

  client.open(
    {
      fetchToken: () => Promise.resolve({ token: REPL_TOKEN, aborted: false }),
      WebSocketClass: WebSocket,
    },
    ({ channel, error }) => {
      clientOpenCount += 1;
      expect(channel?.closed).toBe(false);
      expect(error).toEqual(null);

      if (disconnectTriggered) {
        setTimeout(() => client.close());
      }

      return ({ willReconnect }) => {
        if (willReconnect) {
          return;
        }

        expect(clientOpenCount).toEqual(2);
        expect(channelOpenCount).toEqual(1);

        expect(onUnrecoverableError).toHaveBeenCalledTimes(0);
        done();
      };
    },
  );

  client.openChannel(
    {
      skip: () => channelOpenCount > 0,
      service,
    },
    ({ channel, error }) => {
      if (!disconnectTriggered) {
        setTimeout(() => {
          // eslint-disable-next-line
          // @ts-ignore: trigger unintentional disconnect
          client.ws?.onclose();
          disconnectTriggered = true;
        }, 1000);
      }

      channelOpenCount += 1;
      expect(channel?.closed).toBe(false);
      expect(error).toBe(null);
    },
  );
});

// Test is broken right now due to polling fallback
test.skip('client errors opening', (done) => {
  const onUnrecoverableError = jest.fn<void, [Error]>();
  const client = new Client();
  client.setUnrecoverErrorHandler(onUnrecoverableError);
  let errorCount = 0;

  const clientClose = jest.fn();
  const channelClose = jest.fn();

  const maybeDone = () => {
    if (errorCount === 2) {
      // Close functions are not called when connect/openChannel return an error
      // Any setup logic should be avoided
      expect(clientClose).not.toHaveBeenCalled();
      expect(channelClose).not.toHaveBeenCalled();

      expect(onUnrecoverableError).toHaveBeenCalledTimes(0);
      done();
    }
  };

  client.open(
    {
      maxConnectRetries: 0,
      fetchToken: () => Promise.resolve({ token: 'test - no good', aborted: false }),
      WebSocketClass: WebSocket,
    },
    ({ channel, error }) => {
      expect(error).toBeTruthy();
      expect(channel).toEqual(null);
      errorCount += 1;

      setTimeout(maybeDone);

      return clientClose;
    },
  );

  client.openChannel({ service: 'shell' }, ({ channel, error }) => {
    expect(error).toBeTruthy();
    expect(channel).toEqual(null);
    errorCount += 1;

    setTimeout(maybeDone);

    return channelClose;
  });
});

test('client reconnect', (done) => {
  const onUnrecoverableError = jest.fn<void, [Error]>();
  const client = new Client();
  client.setUnrecoverErrorHandler(onUnrecoverableError);

  let disconnectTriggered = false;
  let timesConnected = 0;
  let timesClosedUnintentionally = 0;
  let timesClosedIntentionally = 0;

  client.open(
    {
      fetchToken: () => Promise.resolve({ token: REPL_TOKEN, aborted: false }),
      WebSocketClass: WebSocket,
    },
    ({ channel, error }) => {
      expect(error).toEqual(null);
      expect(channel?.closed).toEqual(false);

      timesConnected += 1;

      if (!disconnectTriggered) {
        setTimeout(() => {
          // eslint-disable-next-line
          // @ts-ignore: trigger unintentional disconnect
          client.ws?.onclose();
          disconnectTriggered = true;
        });
      } else {
        setTimeout(() => client.close());
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

  const open = jest.fn();
  const close = jest.fn();

  const onUnrecoverableError = jest.fn<void, [Error]>();
  const client = new Client();
  client.setUnrecoverErrorHandler(onUnrecoverableError);
  const fetchToken = () => {
    if (didOpen) {
      // We're reconnecting
      setTimeout(() => {
        // Close client while reconnecting
        client.close();

        expect(open).toHaveBeenCalledTimes(1);
        expect(close).toHaveBeenCalledTimes(1);

        expect(onUnrecoverableError).toHaveBeenCalledTimes(0);
        done();
      });
    }

    return Promise.resolve({ token: REPL_TOKEN, aborted: false });
  };

  client.open(
    {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      fetchToken,
      WebSocketClass: WebSocket,
    },
    ({ channel }) => {
      if (channel) {
        // called once after initial connect
        open();

        didOpen = true;

        setTimeout(() => {
          // eslint-disable-next-line
          // @ts-ignore: trigger unintentional disconnect
          client.ws?.onclose();
        });
      }

      return () => {
        // called once after dissconnect
        close();
      };
    },
  );
});

test('closing before ever connecting', () => {
  const onUnrecoverableError = jest.fn<void, [Error]>();
  const client = new Client();
  client.setUnrecoverErrorHandler(onUnrecoverableError);

  const open = jest.fn();
  const openError = jest.fn();
  const close = jest.fn();

  client.open(
    {
      fetchToken: () => Promise.resolve({ token: REPL_TOKEN, aborted: false }),
      WebSocketClass: WebSocket,
    },
    ({ error }) => {
      if (error) {
        openError();
      } else {
        open();
      }

      return () => {
        close();
      };
    },
  );

  // `close` called before connecting
  client.close();

  expect(open).not.toHaveBeenCalled();
  expect(openError).toHaveBeenCalledTimes(1);
  expect(close).not.toHaveBeenCalled();
});

test('closing client while opening', (done) => {
  const onUnrecoverableError = jest.fn<void, [Error]>();
  const client = new Client();
  client.setUnrecoverErrorHandler(onUnrecoverableError);

  client.open(
    {
      fetchToken: () => Promise.resolve({ token: REPL_TOKEN, aborted: false }),
      WebSocketClass: WebSocket,
    },
    () => {
      try {
        client.close();
      } catch {
        expect(onUnrecoverableError).toHaveBeenCalledTimes(0);
        done();
      }
    },
  );
});

test('connecting with a context object', (done) => {
  const onUnrecoverableError = jest.fn<void, [Error]>();
  const client = new Client();
  client.setUnrecoverErrorHandler(onUnrecoverableError);
  const user = 'abc';

  client.open<{ user: string }>(
    {
      fetchToken: () => Promise.resolve({ token: REPL_TOKEN, aborted: false }),
      WebSocketClass: WebSocket,
      context: { user },
    },
    ({ context }) => {
      expect(context).toEqual({ user });
    },
  );

  client.openChannel<{ user: string }>(
    {
      service: 'shell',
      skip: (context) => {
        expect(context).toEqual({ user });

        return false;
      },
    },
    ({ error, context }) => {
      expect(context).toEqual({ user });

      if (error) {
        // Client closed so test is done.

        expect(onUnrecoverableError).toHaveBeenCalledTimes(0);
        done();
        return;
      }

      client.close();
    },
  );
});

test('falling back to polling', (done) => {
  const onUnrecoverableError = jest.fn<void, [Error]>();
  const client = new Client();
  client.setUnrecoverErrorHandler(onUnrecoverableError);

  const maxConnectRetries = 1;
  const open = jest.fn();

  client.setDebugFunc((log) => {
    if (log.type === 'breadcrumb' && log.message === 'falling back to polling') {
      // eslint-disable-next-line
      const data = log.data as any;

      expect(data.connectTries).toEqual(maxConnectRetries + 1);
      expect(data.error).toBeDefined();
      expect(data.wsReadyState).toBeUndefined();

      // eslint-disable-next-line
      // @ts-ignore need to reach in and grab some private fields real quick...
      const { urlOptions, polling } = client.connectOptions;

      expect(urlOptions.host).toEqual('gp-v2.herokuapp.com');
      expect(polling).toBe(true);

      expect(open).not.toHaveBeenCalled();

      expect(onUnrecoverableError).toHaveBeenCalledTimes(0);
      done();
    }
  });

  client.open(
    {
      fetchToken: () => Promise.resolve({ token: 'bad token', aborted: false }),
      WebSocketClass: WebSocket,
      maxConnectRetries,
      timeout: 0,
      polling: false,
    },
    open,
  );
});

test('fetch token fail', (done) => {
  const chan0Cb = jest.fn();
  const client = new Client();

  client.setUnrecoverErrorHandler((e) => {
    expect(chan0Cb).toHaveBeenCalledTimes(0);
    expect(e.message).toContain('fail');

    done();
  });

  client.open(
    {
      fetchToken: () => {
        throw new Error('fail');
      },
      WebSocketClass: WebSocket,
    },
    chan0Cb,
  );
});

test('fetch abort signal works as expected', (done) => {
  const client = new Client();
  client.setUnrecoverErrorHandler(() => {
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
      WebSocketClass: WebSocket,
    },
    ({ channel, error }) => {
      expect(channel).toBe(null);
      expect(error).toBeTruthy();
      expect(error?.message).toBe('Channel closed');
      expect(onAbort).toHaveBeenCalledTimes(1);

      done();

      return () => {};
    },
  );
});
