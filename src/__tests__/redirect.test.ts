/* eslint-env jest */

import { api } from '@replit/protocol';
import { Client } from '..';
import WS from 'jest-websocket-mock';
import { WebSocket } from 'mock-socket'

// eslint-disable-next-line
const genConnectionMetadata = require('../../debug/genConnectionMetadata');

// eslint-disable-next-line
jest.setTimeout(1000);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const testingClients: Array<Client<any>> = [];

afterAll(() => {
  testingClients.forEach((c) => {
    c.destroy();
  });
});
describe('websocket', () => {
  test('redirect message', async () => {
    const ctx = { username: 'zyzz' };
    // const client = getClient<{ username: string }>(done);
    const client = new Client<{ username: string }>();
    client.setUnrecoverableErrorHandler(
      (e) => { console.log('got unrecoverable error: ', e) }
    );
    testingClients.push(client);
    const addr1 = "ws://localhost:1235"
    const addr2 = "ws://localhost:1236"

    const server1 = new WS(addr1+'/wsv2/');
    server1.on('connection', (_) => {
      console.log('server 1 connected!');
    });

    server1.on('message', (_) => {
      console.log('server 1 got message');
    });

    const server2 = new WS(addr2+'/wsv2/');
    server2.on('connection', (_) => {
      console.log('server 2 connected!');
    });

    server2.on('message', (_) => {
      console.log('server 2 got message');
    });

    let connectionMetadata = genConnectionMetadata();
    connectionMetadata.gurl = addr1;
    connectionMetadata.token = ''; // need this so the mock server connects

    client.open(
      {
        fetchConnectionMetadata: () =>
          Promise.resolve({
            ...connectionMetadata,
            error: null,
          }),
        WebSocketClass: WebSocket,
        context: ctx,
      },
      () => {}
    );

    console.log('awaiting for connection to server 1');
    await server1.connected
    const cmdJson = {
      redirect: {
        url: addr2
      }
    };
    const redirect = api.Command.create(cmdJson)
    sendFromServer(redirect, server1);

    await server2.connected;
  });

});

const sendFromServer = (cmd: api.Command, ws: WS) => {
    const cmdBuf = api.Command.encode(cmd).finish();
    const buffer = cmdBuf.buffer.slice(cmdBuf.byteOffset, cmdBuf.byteOffset + cmdBuf.length);
    ws.send(buffer);
};
