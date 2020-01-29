[![Run on Repl.it](https://repl.it/badge/github/replit/crosis)](https://repl.it/github/replit/crosis)

Generated docs https://replit-crosis--masfrost.repl.co/

### Installation

`yarn add @replit/crosis @replit/protocol`

Crosis relies on the `@replit/protocol` package as a peer dependency. https://github.com/replit/protocol

### Exported

- [Client](https://replit-crosis.masfrost.repl.co/modules/_src_client_.html)

You probably don't need this but it's exported: [Channel](https://replit-crosis.masfrost.repl.co/modules/_src_channel_.html)

### Usage

You should probably familiarize yourself with the protocol before trying to use it. Crosis is just a client that helps you connect and communicate with the container using the protocol.

Read about the protocol here http://protodoc.turbio.repl.co

Here's an example of connecting then opening an `eval` channel and sending it an `eval` command

```ts
import { Client } from '@replit/crosis';

const client = new Client();

const token = await fetch(TOKEN_URL).then((r) => r.text());

await client.connect({ token });

const channel = client.openChannel({
  name: 'evaller',
  service: 'eval',
});

channel.on('cmd', (cmd) => {
  console.log(cmd);
});
channel.send({ eval: '1+1' });
```
