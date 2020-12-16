### Installation

`yarn add @replit/crosis @replit/protocol`

Crosis relies on the `@replit/protocol` package as a peer dependency. https://github.com/replit/protocol

### Prerequisites

You should probably familiarize yourself with the protocol before trying to use it. Crosis is just a client that helps you connect and communicate with the container using the protocol.

Read about the protocol here http://protodoc.turbio.repl.co

### Usage and concepts

The central concept is a "channel" that you can send commands to and receive commands from. Communicating with channels requires a network connection. The goal of this client is to provide an API to manage what happens when a disconnect and/or reconnect happens. How you handle this is up to you and depends on the desired UX. In some cases you'll want to disable UI to prevent any new messages being sent when offline and then re-enable once connected agian. In other cases you might want to give the user the illusion that they are connected and queue message locally while disconnected and send them once reconnected.

When a client successfully connects (`client.open`) the provided callback function is called and passed a channel (this is channel 0). Other channels for specific services can be opened by calling `client.openChannel`. The signature of the callback function for `openChannel` matches the one from `client.open`.

The callback functions provided to `open` and `openChannel` can optionally return a function that will be called when the client or channel is closed. This is useful for cleaning up any logic that depends on a channel being available.

```ts
import { Client } from '@replit/crosis';

const client = new Client();

const user = { name: 'example' };

const disposeClient = client.open({
  // This will be called for every connect attempt and reconnect attempt
  fetchConnectionMetadata: fetch(CONNECTION_METADATA_URL).then((r) => r.json()),
  // DEPRECATED: Same as above but only returns a subset of the information.
  fetchToken: fetch(TOKEN_URL).then((r) => r.text()),
  // An optinal object that will get passed to open/openChannel callbacks
  context: { user },
 }, ({ channel, error, context }) => {
  if (error) {
    // The client couldn't open, handle connection error
    return;
  }

  //  The client is now connected or reconnected in the event that it encountered and unexpected disconnect
  // `channel` her is channel0 (more info at http://protodoc.turbio.repl.co/protov2)
  // - send commands using `channel.send`
  // - listen for commands using `channel.onCommand(cmd => ...)`

  return ({ willReconnect }) => {
    // The client was closed and might reconnect if it was closed unexpectedly
  }
 });

const disposeChannel = client.openChannel({
  service: 'files',
 }, ({ channel, error, context }) => {
  if (error) {
    // The channel couldn't open, handle error
    return;
  }

  // The channel is now connected or reconnected in the event that it encountered and unexpected disconnect
  // - send commands using `channel.send`
  // - listen for commands using `channel.onCommand(cmd => ...)`

  return ({ willReconnect }) => {
    // Client was closed and might reconnect if it was closed unexpectedly
  }
});

```
### Delevoping

To run tests run

```sh
TOKEN_SECRET=XXXXXXXXXX yarn test
```

To interact with a connected client in the borwser run

```sh
TOKEN_SECRET=XXXXXXXXXX yarn debug
```

You can then access the client from the console an send messages like:

```js
window.client.send({ exec: { args: ["kill", "1"] } })
```
