/* eslint-env jest */

/**
 * A simple helper to allow us to do assertions inside callbacks.
 * If `done` is not called after an assertion fails inside a callback
 * the test will continue until it times out. This function makes sure
 * done is called and we fail fast with correct stack traces.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        typeof (res as any).catch === 'function'
      ) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (res as any).catch((err: any) => {
          done(err);
        });
      }

      return res;
    } catch (e) {
      done(e);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return undefined as any;
    }
  };
}
