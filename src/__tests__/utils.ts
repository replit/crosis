/* eslint-env jest */

/**
 * A simple helper to allow us to do assertions inside callbacks.
 * If `done` is not called after an assertion fails inside a callback
 * the test will continue until it times out. This function makes sure
 * done is called and we fail fast with correct stack traces.
 */
export function wrapWithDone<Args extends Array<any>, Ret>(
  done: jest.DoneCallback,
  fn: (...args: Args) => Ret,
) {
  return (...args: Args): Ret => {
    try {
      const res = fn(...args);
      if (
        typeof res === 'object' &&
        res &&
        'catch' in res &&
        typeof (res as any).catch === 'function'
      ) {
        return (res as any).catch((err: any) => {
          done(err);
        });
      }

      return res;
    } catch (e) {
      done(e);

      return undefined as any;
    }
  };
}
