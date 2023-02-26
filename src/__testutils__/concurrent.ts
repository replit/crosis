export function concurrent(
  name: string,
  fn: (done: jest.DoneCallback) => void | Promise<void>,
  timeout?: number,
) {
  test.concurrent(
    name,
    () =>
      // eslint-disable-next-line no-async-promise-executor
      new Promise<void>(async (resolve, reject) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        function done(err?: any) {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
        done.fail = reject;
        try {
          await fn(done);
        } catch (e) {
          reject(e);
        }
      }),
    timeout,
  );
}
