/**
 * Creates a promise and exposing resolve and reject;
 */
export function createDeferred<T = unknown>(): Deferred<T> {
  let resolve;
  let reject;

  // tslint:disable-next-line promise-must-complete
  const promise = new Promise<T>((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });

  if (!resolve || !reject) {
    throw new Error('Expected resolve and reject to be functions');
  }

  return {
    promise,
    resolve,
    reject,
  };
}

export interface Deferred<T = unknown> {
  promise: Promise<T>;
  resolve: (t: T) => void;
  reject: (reason: Error) => void;
}
