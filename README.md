### Installation

`yarn add @replit/crosis @replit/protocol`

Crosis relies on the `@replit/protocol` package as a peer dependency. https://github.com/replit/protocol

### Prerequisites

You should probably familiarize yourself with the protocol before trying to use it. Crosis is just a client that helps you connect and communicate with the container using the protocol.

Read about the protocol here http://protodoc.turbio.repl.co

### Usage and concepts

The central concept is a "channel" that you can send commands to and receive commands from. Communicating with channels requires a network connection. The goal of this client is to provide an API to manage the connection (including disconnects and reconnects), opening channels, and a way to send a receive messages/commands on channels. How you handle this is up to you and depends on the desired UX. In some cases you'll want to disable UI to prevent any new messages being sent when offline and then re-enable once connected agian. In other cases you might want to give the user the illusion that they are connected and queue message locally while disconnected and send them once reconnected.

Here is an example usage, for more details on usage please refer to the API docs at https://crosisdoc.util.repl.co/

```typescript
import { Client } from '@replit/crosis';

const client = new Client<{ user: { name: string }; repl: { id: string } }>();

const repl = { id: 'someuuid' };

async function fetchConnectionMetadata(
  signal: AbortSignal,
): Promise<FetchConnectionMetadataResult> {
  let res: Response;
  try {
    res = await fetch(CONNECTION_METADATA_URL + repl.id, { signal });
  } catch (error) {
    if (error.name === 'AbortError') {
      return {
        error: FetchConnectionMetadataError.Aborted,
      };
    }

    throw error;
  }

  if (!res.ok) {
    if (res.status > 500) {
      // Network or server error, try again
      return {
        error: FetchConnectionMetadataError.Retriable,
      };
    }

    const errorText = await res.text();
    throw new Error(errorText || res.statusText);
  }

  const connectionMetadata = await res.json();

  return {
    token: connectionMetadata.token,
    gurl: connectionMetadata.gurl,
    conmanURL: connectionMetadata.conmanURL,
    error: null,
  };
}

const user = { name: 'tim' };

const context = { user, repl };

client.open({ context, fetchConnectionMetadata }, function onOpen({ channel, context }) {
  if (!channel) {
    // Closed before ever connecting. Due to `client.close` being called
    // or an unrecoverable, that can be handled by setting `client.setUnrecoverableError`
    return;
  }

  //  The client is now connected (or reconnected in the event that it encountered an unexpected disconnect)
  // `channel` here is channel0 (more info at http://protodoc.turbio.repl.co/protov2)
  // - send commands using `channel.send`
  // - listen for commands using `channel.onCommand(cmd => ...)`

  return function cleanup({ willReconnect }) {
    // The client was closed and might reconnect if it was closed unexpectedly
  };
});

// See docs for exec service here https://protodoc.turbio.repl.co/services#exec
const closeChannel = client.openChannel({ service: 'exec' }, function open({ channel, context }) {
  if (!channel) {
    // Closed before ever connecting. Due to `client.close` being called, `closeChannel` being called
    // or an unrecoverable, that can be handled by setting `client.setUnrecoverableErr
    return;
  }

  channel.onCommand((cmd) => {
    if (cmd.output) {
      terminal.write(cmd.output);
    }
  });

  const intervalId = setInterval(() => {
    channel.send({
      exec: { args: ['echo', 'hello', context.user.name] },
      blocking: true,
    });
  }, 100);

  return function cleanup({ willReconnect }) {
    clearInterval(intervalId);
  };
});
```

### Delevoping

To run tests run

```bash
USER_KEY_ID=XXXX USER_PRIVATE_KEY_PEM=XXXX yarn test
```

To interact with a connected client in the browser run

```bash
USER_KEY_ID=XXXX USER_PRIVATE_KEY_PEM=XXXX yarn debug
```

You can then access the client from the console an send messages like:

```javascript
window.client.send({ exec: { args: ['kill', '1'] } });
```

### Releasing

To release, just run `USER_KEY_ID=XXXX USER_PRIVATE_KEY_PEM=XXXX yarn version`, it will prompt you for a version, then it will push to github and release to npm.

To update documentation, go to https://crosisdoc.util.repl.co/__repl and run `. ./updatedocs.sh`
