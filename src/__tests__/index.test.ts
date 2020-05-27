/* eslint-env jest */

import { Client } from '../client';
import { Channel } from '../channel';
import { ClientCloseReason } from '../closeReasons';

// eslint-disable-next-line
const WebSocket = require('ws');

const { REPL_TOKEN } = process.env;

if (!REPL_TOKEN) {
  throw new Error('REPL_TOKEN is required');
}

test('client connect', (done) => {
  const client = new Client();

  client.connect({
    token: REPL_TOKEN,
    WebSocketClass: WebSocket,
  });

  client.onConnect((chan0: Channel) => {
    expect(chan0.isOpen).toEqual(true);
    done();
  });
});

test('channel open and close', (done) => {
  const client = new Client();

  client.connect({
    token: REPL_TOKEN,
    WebSocketClass: WebSocket,
  });

  const close = client.openChannel({ service: 'shell' }, ({ channel, error }) => {
    expect(channel).toBeInstanceOf(Channel);
    expect(error).toBe(null);

    close();

    return () => {
      done();
    };
  });
});

test('client reconnect', (done) => {
  const client = new Client();

    let disconnectTriggered = false;
    let timesConnected = 0;
    let timesClosedUnintentionally = 0;
    let timesClosedIntentionally = 0;

  client.onConnect(() => {
      timesConnected += 1;

      if (!disconnectTriggered) {
        // eslint-disable-next-line
        // @ts-ignore: trigger unintentional disconnect
        client.ws?.onclose();
        disconnectTriggered = true;
      } else {
        client.close();
      }
  });

   client.onClose(({ closeReason }) => {
     if (closeReason === ClientCloseReason.Disconnected) {
       timesClosedUnintentionally += 1;
     } else if (closeReason === ClientCloseReason.Intentional) {
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
