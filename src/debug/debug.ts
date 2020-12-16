/* eslint-disable no-console, no-debugger */
import { Client } from '../index';

declare global {
  interface Window {
    connectionMetadata: {
      token: string;
      gurl: string;
      conmanURL: string;
    };
    client: Client;
  }
}

const { connectionMetadata } = window;

const client = new Client();

client.setUnrecoverableErrorHandler((error) => {
  console.error(error);
  debugger;
});

client.open(
  {
    fetchConnectionMetadata: () =>
      Promise.resolve({
        ...connectionMetadata,
        error: null,
      }),
    WebSocketClass: WebSocket,
    context: null,
  },
  ({ channel, error }) => {
    console.log('open', { channel, error });

    return (reason) => {
      console.log('close', reason);
    };
  },
);

window.client = client;
