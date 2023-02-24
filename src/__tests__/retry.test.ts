/* eslint-env jest */

import { Client } from '..';
import WS from 'jest-websocket-mock';
import { WebSocket } from 'mock-socket';
import { CloseCode } from '../types';

// eslint-disable-next-line
const genConnectionMetadata = require('../../debug/genConnectionMetadata');

jest.setTimeout(5000);

const genConnectionMetadataWithGurl = (gurl: string) => {
  const connectionMetadata = genConnectionMetadata();
  connectionMetadata.gurl = gurl;
  connectionMetadata.token = ''; // need this so the mock server connects
  return connectionMetadata;
};

const port = 9751;

const testingClients: Array<Client<{ username: string }>> = [];
afterAll(() => {
  testingClients.forEach((c) => {
    c.destroy();
  });
});

describe('retry handling', () => {
  test('should not retry for user error', (done) => {
    const ctx = { username: 'zyzz' };
    const client = new Client<{ username: string }>();
    const unrecoverableError = jest.fn();
    client.setUnrecoverableErrorHandler((e) => {
      unrecoverableError(e.message);
      console.log('got unrecoverable error: ', e);
    });
    testingClients.push(client);
    const addr = 'ws://localhost:' + port;
    const server = new WS(addr + '/wsv2/');

    const onConnect = jest.fn();

    let tryCount = 0;
    const connectionMetadata = genConnectionMetadataWithGurl(addr);
    client.open(
      {
        fetchConnectionMetadata: () => {
          tryCount++;

          return Promise.resolve({
            ...connectionMetadata,
            error: null,
          });
        },
        WebSocketClass: WebSocket,
        context: ctx,
      },
      onConnect,
    );

    client.onDebugLog((log) => {
      if (log.type === 'breadcrumb' && log.message === 'unrecoverable error') {
        expect(tryCount).toBe(1);

        done();
      }
    });

    server.on('connection', function () {
      server.close({ code: CloseCode.USER_ERROR, reason: 'user error', wasClean: true });
    });
  });

  test('should retry for another machine', (done) => {
    const ctx = { username: 'zyzz' };
    const client = new Client<{ username: string }>();
    const unrecoverableError = jest.fn();
    client.setUnrecoverableErrorHandler((e) => {
      unrecoverableError(e.message);
      console.log('got unrecoverable error: ', e);
    });
    testingClients.push(client);
    const addr = 'ws://localhost:' + port;
    const server = new WS(addr + '/wsv2/');

    let tryCount = 0;
    const connectionMetadata = genConnectionMetadataWithGurl(addr);
    client.open(
      {
        fetchConnectionMetadata: () => {
          tryCount++;

          if (tryCount === 2) {
            done();
          }

          return Promise.resolve({
            ...connectionMetadata,
            error: null,
          });
        },
        WebSocketClass: WebSocket,
        context: ctx,
      },
      () => {},
    );

    server.on('connection', function () {
      server.close({
        code: CloseCode.TRY_ANOTHER_MACHINE,
        reason: 'try another machine',
        wasClean: true,
      });
    });
  });
});
