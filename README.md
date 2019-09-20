https://replit-crosis--masfrost.repl.co/

### Exported

- [Client](https://replit-crosis--masfrost.repl.co/classes/_client_.client.html)
- [api](https://replit-crosis--masfrost.repl.co/modules/_api_d_.api.html)

You probably don't need this but it's exported: [Channel](https://replit-crosis--masfrost.repl.co/classes/_channel_.channel.html)

### Usage

```ts
import { Client } from '@replit/crosis';

const client = new Client();

client.connect({
  tokenOptions: {
    replId,
  },
});

const channel = connection.openChannel({
  name: 'evaller',
  service: 'eval',
});

channel.on('cmd', (cmd) => {
  console.log(cmd)
})

channel.send({ eval: '1+1' });
```
