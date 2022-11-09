export function concurrent(
  name: string,
  fn: (done: jest.DoneCallback) => void | Promise<void>,
  timeout?: number,
) {
  test.concurrent(
    name,
    () =>
      new Promise<void>((resolve, reject) => {
        function done(err?: any) {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
        done.fail = reject;
        fn(done);
      }),
    timeout,
  );
}
