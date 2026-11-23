import { api } from '@replit/protocol';
import { createServer } from 'http';
import { Server as EngineServer } from 'engine.io';
import { WebSocketServer } from 'ws';
import { CloseCode, GovalMetadata } from '../types';

export class MockBackend {
  private http = createServer();

  private websockets = new WebSocketServer({ noServer: true });

  private polling = new EngineServer({ allowEIO3: true, transports: ['polling'] });

  private port = 0;

  pollingConnections = 0;

  async start() {
    this.polling.attach(this.http, { path: '/wsv2/', destroyUpgrade: false });
    this.http.on('upgrade', (request, socket, head) => {
      this.websockets.handleUpgrade(request, socket, head, (ws) => {
        if (request.url === '/wsv2/retry') {
          ws.close(CloseCode.TRY_ANOTHER_MACHINE, 'retry requested by test');
          return;
        }

        const send = (command: api.ICommand) => {
          ws.send(api.Command.encode(api.Command.create(command)).finish());
        };
        const receive = this.session(send);
        ws.on('message', (data: Buffer) => receive(data));
        if (request.url === '/wsv2/denied') {
          send({ firewallDenied: {} });
        } else {
          this.ready(send);
        }
      });
    });

    this.polling.on('connection', (socket) => {
      this.pollingConnections++;
      let sequence = 0;
      const send = (command: api.ICommand) => {
        const payload = api.Command.encode(api.Command.create(command)).finish();
        const frame = Buffer.alloc(4 + payload.length);
        frame.writeUInt32BE(sequence++);
        frame.set(payload, 4);
        socket.send(frame);
      };
      const receive = this.session(send);
      socket.on('message', (data: Buffer) => receive(data.subarray(4)));
      this.ready(send);
    });

    await new Promise<void>((resolve) => this.http.listen(0, '127.0.0.1', resolve));
    const address = this.http.address();
    if (!address || typeof address === 'string') {
      throw new Error('Expected a TCP listener');
    }
    this.port = address.port;
  }

  get pollingHost() {
    return `127.0.0.1:${this.port}`;
  }

  metadata(mode = ''): GovalMetadata {
    const gurl = `ws://${this.pollingHost}`;
    return {
      gurl,
      wsURL: `${gurl}/wsv2/${mode}`,
      token: '',
      conmanURL: `http://${this.pollingHost}`,
      dotdevHostname: 'localhost',
    };
  }

  async stop() {
    this.websockets.clients.forEach((socket) => socket.terminate());
    this.polling.close();
    await new Promise<void>((resolve) => this.websockets.close(() => resolve()));
    await new Promise<void>((resolve, reject) =>
      this.http.close((error) => (error ? reject(error) : resolve())),
    );
  }

  private ready(send: (command: api.ICommand) => void) {
    for (const stage of [
      api.BootStatus.Stage.HANDSHAKE,
      api.BootStatus.Stage.ACQUIRING,
      api.BootStatus.Stage.LOAD_BLOCK,
      api.BootStatus.Stage.COMPLETE,
    ]) {
      send({ bootStatus: { stage } });
    }
    send({ containerState: { state: api.ContainerState.State.READY } });
  }

  private session(send: (command: api.ICommand) => void) {
    let nextChannel = 1;
    return (data: Uint8Array) => {
      const command = api.Command.decode(data);
      if (command.openChan) {
        send({
          ref: command.ref,
          openChanRes: { id: nextChannel++, state: api.OpenChannelRes.State.CREATED },
        });
      } else if (command.closeChan) {
        send({
          ref: command.ref,
          closeChanRes: {
            id: command.closeChan.id,
            status: api.CloseChannelRes.Status.CLOSE,
          },
        });
      }
    };
  }
}
