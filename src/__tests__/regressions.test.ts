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

concurrent("interlaced connections don't throw - abort during case", async (done) => {
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
      throw new Error('Expected to never get here (abort+instant close).');
    }),
  );

  client.close();

  client.open(
    { ...params, fetchConnectionMetadata: waitingMetadata },
    wrapWithDone(done, () => {
      console.log('reached second client.open');
    }),
  );

  await abortingPromise;

  client.close();
});

concurrent("interlaced connections don't throw - abort after case", async (done) => {
  // This isn't known to be user-achievable, but is roughly the same condition as the
  // abort-during case, but with the abort after the final close..
  // CrosisError: Expected abort returned from fetchConnectionMetadata to be truthy when the controller aborts

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
      throw new Error('Expected to never get here (abort+instant close).');
    }),
  );

  client.close();

  client.open(
    { ...params, fetchConnectionMetadata: waitingMetadata },
    wrapWithDone(done, () => {
      console.log('reached second client.open');
    }),
  );

  client.close();

  await abortingPromise;
});
