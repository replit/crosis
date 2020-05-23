/* eslint-env jest */

import { Client } from '../client';
import { ClientCloseReason } from '../closeReasons';

// eslint-disable-next-line
const WebSocket = require('ws');

const { REPL_TOKEN } = process.env;

if (!REPL_TOKEN) {
  throw new Error('REPL_TOKEN is required');
}

describe('Client.connect', () => {
  it('opens and closes connection', (done) => {
    const client = new Client();

    client.on('close', ({ closeReason }) => {
      expect(closeReason).toEqual(ClientCloseReason.Intentional);
      done();
    });

    client.on('open', () => {
      client.close();
    });

    client.connect({ token: REPL_TOKEN, WebSocketClass: WebSocket });
  });

  it('opens and closes connection on websocket close', (done) => {
    const client = new Client();

    client.on('close', (e) => {
      expect(e.closeReason).toEqual(ClientCloseReason.Disconnected);
      done();
    });

    client.on('open', () => {
      // eslint-disable-next-line
      // @ts-ignore: trigger unintentional disconnect
      client.ws?.onclose();
    });

    client.connect({ token: REPL_TOKEN, WebSocketClass: WebSocket });
  });

  it('reconnects on disconnect', (done) => {
    const client = new Client();

    let disconnectTriggerd = false;
    let timesOpened = 0;
    let timesClosedUnintentionally = 0;
    let timesClosedIntentionally = 0;

    client.on('close', ({ closeReason }) => {
      if (closeReason === ClientCloseReason.Disconnected) {
        timesClosedUnintentionally += 1;
      } else if (closeReason === ClientCloseReason.Intentional) {
        timesClosedIntentionally += 1;
      }

      if (timesOpened === 2) {
        expect(timesClosedUnintentionally).toEqual(1);
        expect(timesClosedIntentionally).toEqual(1);

        done();
      }
    });

    client.on('open', () => {
      timesOpened += 1;

      if (!disconnectTriggerd) {
        // eslint-disable-next-line
        // @ts-ignore: trigger unintentional disconnect
        client.ws?.onclose();
        disconnectTriggerd = true;
      } else {
        client.close();
      }
    });

    client.connect({
      token: REPL_TOKEN,
      reconnect: true,
      WebSocketClass: WebSocket,
    });
  });
});
