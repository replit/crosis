/* eslint-disable no-console, no-debugger, @typescript-eslint/ban-ts-comment */
import { Client } from '../src';

declare global {
  interface Window {
    client: Client;
  }
}

const client = new Client();

client.setUnrecoverableErrorHandler((error) => {
  console.error(error);
  debugger;
});

client.open(
  {
    fetchConnectionMetadata: () => fetch('/token').then((response) => response.json()),
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
