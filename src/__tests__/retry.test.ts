/* eslint-env jest */

import { Client } from '..';
import WS from 'jest-websocket-mock';
import { WebSocket } from 'mock-socket';
import { CloseCode, FetchConnectionMetadataError } from '../types';
import { wrapWithDone } from '../__testutils__/done';

// eslint-disable-next-line
const genConnectionMetadata = require('../../debug/genConnectionMetadata');

// eslint-disable-next-line
jest.setTimeout(1000);

const testingClients: Array<Client<{ username: string }>> = [];

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

describe('retry handling', () => {
  test('should not retry for user error', (done) => {
    const ctx = { username: 'zyzz' };
    const client = new Client<{ username: string }>();
    client.setUnrecoverableErrorHandler((e) => {
      console.log('got unrecoverable error: ', e);
    });
    testingClients.push(client);
    const addr1 = 'ws://localhost:' + port;
    const server = new WS(addr1 + '/wsv2/');

    server.error({ code: CloseCode.USER_ERROR, reason: 'user error', wasClean: true });

    let tryCount = 0;
    const connectionMetadata = genConnectionMetadataWithGurl(addr1);
    client.open(
      {
        fetchConnectionMetadata: () => {
          tryCount++;

          if (tryCount === 1) {
            return Promise.resolve({
              error: FetchConnectionMetadataError.Retriable,
            });
          }

          return Promise.resolve({
            ...connectionMetadata,
            error: null,
          });
        },
        WebSocketClass: WebSocket,
        context: ctx,
      },
      wrapWithDone(done, ({ error }) => {
        expect(tryCount).toBe(1);
        expect(error?.message).toBe('Failed to open');

        client.close();

        return () => {
          server.close();

          done();
        };
      }),
    );
  });

  test('should retry for try another machine', (done) => {
    const ctx = { username: 'zyzz' };
    const client = new Client<{ username: string }>();
    client.setUnrecoverableErrorHandler((e) => {
      console.log('got unrecoverable error: ', e);
    });
    testingClients.push(client);
    const addr1 = 'ws://localhost:' + port;
    const server = new WS(addr1 + '/wsv2/');

    server.error({
      code: CloseCode.TRY_ANOTHER_MACHINE,
      reason: 'try another machine',
      wasClean: true,
    });

    let tryCount = 0;
    const connectionMetadata = genConnectionMetadataWithGurl(addr1);
    client.open(
      {
        fetchConnectionMetadata: () => {
          tryCount++;

          if (tryCount === 1) {
            return Promise.resolve({
              error: FetchConnectionMetadataError.Retriable,
            });
          }

          return Promise.resolve({
            ...connectionMetadata,
            error: null,
          });
        },
        WebSocketClass: WebSocket,
        context: ctx,
      },
      wrapWithDone(done, ({ error }) => {
        expect(tryCount).toBe(2);
        expect(error?.message).toBe('Failed to open');

        client.close();

        return () => {
          server.close();

          done();
        };
      }),
    );
  });
});
