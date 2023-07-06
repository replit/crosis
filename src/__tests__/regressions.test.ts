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
  let waitingPromise: Promise<FetchConnectionMetadataResult> | null = null;
  const waitingMetadata = (abortSignal: AbortSignal) => {
    if (waitingPromise) {
      if (abortSignal.aborted) {
        return Promise.resolve({
          error: FetchConnectionMetadataError.Aborted,
        });
      }

      return waitingPromise;
    }

    waitingPromise = new Promise<FetchConnectionMetadataResult>((resolve) => {
      if (abortSignal.aborted) {
        resolve({
          error: FetchConnectionMetadataError.Aborted,
        });

        return;
      }

      return getConnectionMetadata().then((r) => {
        setTimeout(() => {
          if (abortSignal.aborted) {
            resolve({
              error: FetchConnectionMetadataError.Aborted,
            });

            return;
          }

          console.log('resolving test');
          resolve(r);
        }, 1);
      });
    });

    return waitingPromise;
  };

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

  client.close(); // this triggers abort.

  console.log('opening');
  client.open(
    // this is currently expected to return aborted, I think, but that should be
    // encapsulated inside the client.
    { ...params, fetchConnectionMetadata: waitingMetadata },
    wrapWithDone(done, () => {
      // we could possibly get here, it is maybe flaky to rely on the order of
      // the promise resolutions (or at least, I can't trace the exact order
      // I expect).
      console.log('reached second client.open');
    }),
  );

  // we successfully finish the _open_ call of the first client open here, but
  // we're already in-flight for the second client open (!)
  console.log('aborting');
  await abortingPromise; // request starts flying here.
  console.log('aborted');

  // before the second open resolves, we call close. The request is (likely)
  // already in flight.
  client.close();

  // now we'll wait for the second open to resolve, which the above close will have
  // aborted.
  console.log('awaiting waiting');
  await waitingPromise;
  console.log('waited');

  done();
});

concurrent("interlaced connections don't throw - abort after case", async (done) => {
  // This isn't known to be user-achievable, but is roughly the same condition as the
  // abort-during case, but with the abort after the final close... this case is probably
  // more straightforward that it should've returned aborted, but it is still causing pain in production.
  // CrosisError: Expected abort returned from fetchConnectionMetadata to be truthy when the controller aborts
  const waitingMetadata = (abortSignal: AbortSignal) => {
    return new Promise<FetchConnectionMetadataResult>((resolve) => {
      return getConnectionMetadata().then((r) => {
        if (abortSignal.aborted) {
          resolve({
            error: FetchConnectionMetadataError.Aborted,
          });
        }
        resolve(r);
      });
    });
  };

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
    // this case is more obvious that we expected to return aborted.
    { ...params, fetchConnectionMetadata: waitingMetadata },
    wrapWithDone(done, () => {
      throw new Error('Expected to never get here (instant close).');
    }),
  );

  client.close();

  await abortingPromise;

  done();
});
