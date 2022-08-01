/* eslint-env jest */

import { api } from '@replit/protocol';
import { Client } from '..';
import WS from 'jest-websocket-mock';
import { WebSocket } from 'mock-socket';

// eslint-disable-next-line
const genConnectionMetadata = require('../../debug/genConnectionMetadata');

// eslint-disable-next-line
jest.setTimeout(1000);

const testingClients: Array<Client<{ username: string }>> = [];

const sendFromServer = (cmd: api.Command, ws: WS) => {
  const cmdBuf = api.Command.encode(cmd).finish();
  const buffer = cmdBuf.buffer.slice(cmdBuf.byteOffset, cmdBuf.byteOffset + cmdBuf.length);
  ws.send(buffer);
};

const genConnectionMetadataWithGurl = (gurl: string) => {
  const connectionMetadata = genConnectionMetadata();
  connectionMetadata.gurl = gurl;
  connectionMetadata.token = ''; // need this so the mock server connects
  return connectionMetadata;
};

const port = 9751;

afterAll(() => {
  testingClients.forEach((c) => {
    c.destroy();
  });
});

describe('redirect handling', () => {
  test('redirect message results in client reconnecting to target', async () => {
    const ctx = { username: 'zyzz' };
    const client = new Client<{ username: string }>();
    client.setUnrecoverableErrorHandler((e) => {
      console.log('got unrecoverable error: ', e);
    });
    testingClients.push(client);
    const addr1 = 'ws://localhost:' + port;
    const addr2 = 'ws://localhost:' + port + 1;

    const server1 = new WS(addr1 + '/wsv2/');
    const server2 = new WS(addr2 + '/wsv2/');

    const connectionMetadata = genConnectionMetadataWithGurl(addr1);

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
      () => {},
    );

    await expect(server1.connected).resolves.toBeTruthy();

    const cmdJson = {
      redirect: {
        url: addr2,
      },
    };
    const redirect = api.Command.create(cmdJson);
    sendFromServer(redirect, server1);

    await expect(server2.connected).resolves.toBeTruthy();

    server1.close();
    server2.close();
  });

  test('connection closed after redirect results in client connecting to original server', async () => {
    const ctx = { username: 'zyzz' };
    const client = new Client<{ username: string }>();
    client.setUnrecoverableErrorHandler((e) => {
      console.log('got unrecoverable error: ', e);
    });
    testingClients.push(client);
    const addr1 = 'ws://localhost:' + port;
    const addr2 = 'ws://localhost:' + port + 1;

    const server1 = new WS(addr1 + '/wsv2/');
    const server2 = new WS(addr2 + '/wsv2/');

    const connectionMetadata = genConnectionMetadataWithGurl(addr1);

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
      () => {},
    );

    await expect(server1.connected).resolves.toBeTruthy();
    const cmdJson = {
      redirect: {
        url: addr2,
      },
    };
    const redirect = api.Command.create(cmdJson);
    sendFromServer(redirect, server1);

    await expect(server2.connected).resolves.toBeTruthy();

    server2.close();

    await expect(server1.connected).resolves.toBeTruthy();

    server1.close();
  });

  test('connection error after redirect results in client connecting to original server', async () => {
    const ctx = { username: 'zyzz' };
    const client = new Client<{ username: string }>();
    client.setUnrecoverableErrorHandler((e) => {
      console.log('got unrecoverable error: ', e);
    });
    testingClients.push(client);
    const addr1 = 'ws://localhost:' + port;
    const addr2 = 'ws://localhost:' + port + 1;

    const server1 = new WS(addr1 + '/wsv2/');
    const server2 = new WS(addr2 + '/wsv2/');

    const connectionMetadata = genConnectionMetadataWithGurl(addr1);

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
      () => {},
    );

    await expect(server1.connected).resolves.toBeTruthy();
    const cmdJson = {
      redirect: {
        url: addr2,
      },
    };
    const redirect = api.Command.create(cmdJson);
    sendFromServer(redirect, server1);

    await expect(server2.connected).resolves.toBeTruthy();

    server2.error();

    await expect(server1.connected).resolves.toBeTruthy();
    server1.close();
  });
});
