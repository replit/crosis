/* eslint-env jest */

import { Client } from '../client';
import { ClientCloseReason } from '../closeReasons';

// eslint-disable-next-line
const WebSocket = require('ws');

const { REPL_TOKEN } = process.env;

if (!REPL_TOKEN) {
  throw new Error('REPL_TOKEN is required');
}

test('channel opening and closeing', (done) => {
  const client = new Client();

  const channel = client.openChannel({ service: 'shell' });

  channel.onOpen(({ send, request }) => {
    expect(typeof send).toEqual('function');
    expect(typeof request).toEqual('function');

    channel.close();
  });

  channel.onClose((/* reason */) => {
    // TODO: figure out when initiator should be client/channel
    // expect(reason).toEqual({
    // initiator: 'channel',
    // clientCloseReason: ClientCloseReason.Intentional,
    // });
    client.close();

    done();
  });

  client.connect({
    token: REPL_TOKEN,
    WebSocketClass: WebSocket,
  });
});

test('client reconnect', (done) => {
  const client = new Client();

  let disconnectTriggerd = false;
  let timesConnected = 0;
  let timesClosedUnintentionally = 0;
  let timesClosedIntentionally = 0;

  const channel = client.openChannel({ service: 'shell' });

  channel.onOpen(() => {
    timesConnected += 1;

    if (!disconnectTriggerd) {
      // eslint-disable-next-line
      // @ts-ignore: trigger unintentional disconnect
      client.ws?.onclose();
      disconnectTriggerd = true;
    } else {
      client.close();
    }
  });

  channel.onClose((reason) => {
    if ('clientCloseReason' in reason && reason.clientCloseReason === ClientCloseReason.Disconnected) {
      timesClosedUnintentionally += 1;
    } else if ('clientCloseReason' in reason && reason.clientCloseReason === ClientCloseReason.Intentional) {
      timesClosedIntentionally += 1;
    }

    if (timesConnected === 2) {
      expect(timesClosedUnintentionally).toEqual(1);
      expect(timesClosedIntentionally).toEqual(1);

      done();
    }
  });

  client.connect({
    token: REPL_TOKEN,
    reconnect: true,
    WebSocketClass: WebSocket,
  });
});
