/* eslint-env jest */

import { Client } from '../client';

// eslint-disable-next-line
const WebSocket = require('ws');

const REPL_TOKEN = process.env.REPL_TOKEN as string;

if (!REPL_TOKEN) {
  throw new Error('REPL_TOKEN is required');
}

test('client connect', (done) => {
  const client = new Client();

  client.open(
    {
      fetchToken: () => Promise.resolve(REPL_TOKEN),
      WebSocketClass: WebSocket,
    },
    ({ channel, error }) => {
      expect(channel?.closed).toBe(false);
      expect(error).toEqual(null);

      setTimeout(() => client.close());

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

  client.open(
    {
      fetchToken: () => Promise.resolve(REPL_TOKEN),
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
  const client = new Client();

  const channelClose = jest.fn();

  client.open(
    {
      fetchToken: () => Promise.resolve(REPL_TOKEN),
      WebSocketClass: WebSocket,
    },
    ({ channel, error }) => {
      expect(channel?.closed).toBe(false);
      expect(error).toEqual(null);

      return () => {
        expect(channelClose).toHaveBeenCalled();

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
  const client = new Client();
  const service = 'shell';

  client.open(
    {
      fetchToken: () => Promise.resolve(REPL_TOKEN),
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

  const client = new Client();
  const service = 'shell';

  client.open(
    {
      fetchToken: () => Promise.resolve(REPL_TOKEN),
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

test('client errors opening', (done) => {
  const client = new Client();
  let errorCount = 0;

  const clientClose = jest.fn();
  const channelClose = jest.fn();

  const maybeDone = () => {
    if (errorCount === 2) {
      // Close functions are not called when connect/openChannel return an error
      // Any setup logic should be avoided
      expect(clientClose).not.toHaveBeenCalled();
      expect(channelClose).not.toHaveBeenCalled();

      done();
    }
  };

  client.open(
    {
      maxConnectRetries: 0,
      fetchToken: () => Promise.resolve('test - no good'),
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
  const client = new Client();

  let disconnectTriggered = false;
  let timesConnected = 0;
  let timesClosedUnintentionally = 0;
  let timesClosedIntentionally = 0;

  client.open(
    {
      fetchToken: () => Promise.resolve(REPL_TOKEN),
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

  const client = new Client();
  const fetchToken = () => {
    if (didOpen) {
      // We're reconnecting
      setTimeout(() => {
        // Close client while reconnecting
        client.close();

        expect(open).toHaveBeenCalledTimes(1);
        expect(close).toHaveBeenCalledTimes(1);

        done();
      });
    }

    return Promise.resolve(REPL_TOKEN);
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
  const client = new Client();

  const open = jest.fn();
  const openError = jest.fn();
  const close = jest.fn();

  client.open(
    {
      fetchToken: () => Promise.resolve(REPL_TOKEN),
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
  const client = new Client();

  client.open(
    {
      fetchToken: () => Promise.resolve(REPL_TOKEN),
      WebSocketClass: WebSocket,
    },
    () => {
      try {
        client.close();
      } catch {
        done();
      }
    },
  );
});
