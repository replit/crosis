/* eslint-env jest */

import { Client } from '../client';
import { ClientCloseReason } from '../closeReasons';

// eslint-disable-next-line
const WebSocket = require('ws');

const { REPL_TOKEN } = process.env;

if (!REPL_TOKEN) {
  throw new Error('REPL_TOKEN is required');
}

test('client connect', (done) => {
  const client = new Client();

  client.connect(
    {
      fetchToken: () => Promise.resolve(REPL_TOKEN),
      WebSocketClass: WebSocket,
    },
    ({ channel, error }) => {
      expect(channel?.isOpen).toEqual(true);
      expect(error).toEqual(null);

      setTimeout(() => client.close());

      return () => {
        done();
      };
    },
  );
});

test('channel open and close', (done) => {
  const client = new Client();

  client.connect(
    {
      fetchToken: () => Promise.resolve(REPL_TOKEN),
      WebSocketClass: WebSocket,
    },
    ({ channel, error }) => {
      expect(channel?.isOpen).toEqual(true);
      expect(error).toEqual(null);

      return () => {
        done();
      };
    },
  );

  const close = client.openChannel({ service: 'shell' }, ({ channel, error }) => {
    expect(channel?.isOpen).toBe(true);
    expect(error).toBe(null);

    close();

    return () => {
      client.close();
    };
  });
});

test('client errors opening', (done) => {
  const client = new Client();
  let errorCount = 0;

  const clientClose = jest.fn();
  const channelClose = jest.fn();

  const maybeDone = () => {
    if (errorCount === 2) {
      // Close functions are not called when connect/openChannel error
      expect(clientClose).not.toHaveBeenCalled();
      expect(channelClose).not.toHaveBeenCalled();

      done();
    }
  };

  client.connect({
    maxConnectRetries: 0,
    fetchToken: () => Promise.resolve('test - no good'),
    WebSocketClass: WebSocket,
  }, ({ channel, error }) => {
      expect(error).toBeTruthy();
      expect(channel).toEqual(null);
      errorCount += 1;

      setTimeout(maybeDone);

      return clientClose;
  });

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

  client.connect(
    {
      fetchToken: () => Promise.resolve(REPL_TOKEN),
      WebSocketClass: WebSocket,
      reconnect: true,
    },
    ({ channel, error }) => {
      expect(channel?.isOpen).toEqual(true);
      expect(error).toEqual(null);

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

        if (closeReason.clientCloseReason === ClientCloseReason.Disconnected) {
          timesClosedUnintentionally += 1;
        } else if (closeReason.clientCloseReason === ClientCloseReason.Intentional) {
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
  const client = new Client();

  let didOpen = false;

  const open = jest.fn();
  const close = jest.fn();

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

  client.connect({
    fetchToken,
    WebSocketClass: WebSocket,
    reconnect: true,
  }, () => {
    // called once after initial connect
    open();

    didOpen = true;

    setTimeout(() => {
      // eslint-disable-next-line
      // @ts-ignore: trigger unintentional disconnect
      client.ws?.onclose();
    });

    return () => {
      // called once after dissconnect
      close();
    };
  });
});

test('closing before ever connecting', () => {
  const client = new Client();

  const open = jest.fn();
  const close = jest.fn();

  client.connect({
    fetchToken: () => Promise.resolve(REPL_TOKEN),
      WebSocketClass: WebSocket,
    reconnect: true,
  }, () => {
    open();
    return () => {
      close();
    };
  });

  // `close` called before connecting
  client.close();

  expect(open).not.toHaveBeenCalled();
  expect(close).not.toHaveBeenCalled();
});

test('closing client while opening', (done) => {
  const client = new Client();

  client.connect({
    fetchToken: () => Promise.resolve(REPL_TOKEN),
      WebSocketClass: WebSocket,
  }, () => {
    try {
      client.close();
    } catch {
      done();
    }
  });
});
