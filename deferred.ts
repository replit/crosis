/**
 * Creates a promise and exposing resolve and reject;
 */
export function createDeferred<T = any>(): Deferred<T> {
  let resolve;
  let reject;

  // tslint:disable-next-line promise-must-complete
  const promise = new Promise<T>((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });

  return {
    promise,
    // @ts-ignore
    resolve,
    // @ts-ignore
    reject,
  };
}

export interface Deferred<T = any> {
  promise: Promise<T>;
  resolve: (t: T) => void;
  reject: (any: any) => void;
}
