export default class ChannelCloseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ChannelCloseError';

    if ('captureStackTrace' in Error) {
      Error.captureStackTrace(this, ChannelCloseError);
    }
  }
}
