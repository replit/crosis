/* eslint-env jest */

import { Client, FetchConnectionMetadataError, FetchConnectionMetadataResult } from '..';
import { concurrent } from '../__testutils__/concurrent';
import { wrapWithDone } from '../__testutils__/done';
import genConnectionMetadata from '../../debug/genConnectionMetadata';

// eslint-disable-next-line
const WebSocket = require('ws');

jest.setTimeout(30 * 1000);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const testingClients: Array<Client<any>> = [];

// Just a helper that to help us exit from jest without any open handles
function getClient<Ctx = null>(done: jest.DoneCallback) {
  const c = new Client<Ctx>();
  c.setUnrecoverableErrorHandler(done);
  testingClients.push(c);

  return c;
}

const getConnectionMetadata = async () => ({
  ...genConnectionMetadata(),
  error: null,
});

afterAll(() => {
  testingClients.forEach((c) => c.destroy());
});

concurrent("interlaced connections don't throw", async (done) => {
  // This regression-tests a user-state achievable throw where you open, then during
  // connection metadata fetch, open, close, open, close and end up with an interlaced
  // connection state as a result of handleClose resetting the connection status.
  // CrosisError: Client entered wrong state during connect(); connected=false

  const waitingMetadata = () =>
    new Promise<FetchConnectionMetadataResult>((resolve) => {
      return getConnectionMetadata().then(resolve);
    });

  let abortingPromise: Promise<FetchConnectionMetadataResult> | null = null;
  const abortingMetadata = () => {
    if (abortingPromise) {
      return abortingPromise;
    }

    abortingPromise = new Promise<FetchConnectionMetadataResult>((resolve) => {
      resolve({
        error: FetchConnectionMetadataError.Aborted,
      });
    });
    return abortingPromise;
  };

  const client = getClient<{ username: string }>(done);
  const ctx = { username: 'zyzz' };

  const params = {
    fetchConnectionMetadata: getConnectionMetadata,
    WebSocketClass: WebSocket,
    context: ctx,
  };
  client.open(
    { ...params, fetchConnectionMetadata: abortingMetadata },
    wrapWithDone(done, () => {
      console.log('first open');
    }),
  );
  // set up the initial abort
  client.close();

  client.open(
    { ...params, fetchConnectionMetadata: waitingMetadata },
    wrapWithDone(done, () => {
      console.log('second open');
    }),
  );

  await abortingPromise;

  client.close();
});
