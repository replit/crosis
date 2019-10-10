/* global fetch WebSocket */

import { EventEmitter } from 'events';
import { api } from '../protocol/api';
import { Channel } from './channel';
import { createDeferred, Deferred } from './deferred';
import { EIOCompat } from './EIOCompat';

enum ConnectionState {
  CONNECTING = 0,
  CONNECTED = 1,
  DISCONNECTED = 2,
}

type DebugFunc = (direction: 'in' | 'out', cmd: api.Command) => void;

interface TokenOptions {
  replId?: string;
  tokenUrl?: string;
  headers?: HeadersInit;
  polygott?: boolean;
  captcha?: string;
  token?: string;
}

/** @hidden */
async function fetchReplToken({
  replId,
  tokenUrl,
  headers,
  ...body
}: TokenOptions): Promise<string> {
  const url = tokenUrl || `/data/repls/${replId}/gen_repl_token`;

  const res = await fetch(url, {
    credentials: 'same-origin',
    headers: headers || {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    method: 'post',
    body: JSON.stringify({ ...body, format: 'pbuf' }),
  });

  if (!res.ok) {
    let message;
    const contentType = res.headers.get('content-type');

    if (contentType && contentType.includes('application/json')) {
      const json = await res.json();

      message = json.message;
    } else {
      message = await res.text();
    }

    throw new Error(message || res.statusText);
  }

  return res.json();
}

interface UrlOptions {
  secure: boolean;
  host: string;
  port: string;
}

/** @hidden */
function getConnectionStr(token: string, urlOptions?: UrlOptions) {
  const { secure = false, host = 'eval.repl.it', port = '80' } = urlOptions || {};

  return `ws${secure ? 's' : ''}://${host}:${port}/wsv2/${token}`;
}

class Client extends EventEmitter {
  public containerState: api.ContainerState.State | null;

  public connectionState: ConnectionState;

  private token: string | null;

  private ws: WebSocket | EIOCompat | null;

  private channels: {
    [id: number]: Channel;
  };

  private deferredReady: Deferred<void> | null;

  private debug: DebugFunc | null;

  private didConnect: boolean;

  constructor() {
    super();

    this.ws = null;
    this.channels = {
      0: new Channel(),
    };
    this.deferredReady = null;
    this.containerState = null;
    this.token = null;
    this.connectionState = ConnectionState.DISCONNECTED;
    this.debug = null;
    this.didConnect = false;
  }

  public isConnected = () => this.connectionState === ConnectionState.CONNECTED;

  /**
   * Connects to the server and primes the client to start sending data
   * @returns it returns a promise that is resolved when the server is ready (sends cotainer state)
   */
  public connect = async (options: {
    debug?: DebugFunc;
    tokenOptions: TokenOptions;
    urlOptions?: UrlOptions;
    polling?: boolean;
    timeout?: number;
  }): Promise<void> => {
    if (this.didConnect) {
      // We don't want to allow connections if we ever connected
      throw new Error('Reconnecting using the same client after it connected once is not allowed');
    }

    if (this.connectionState !== ConnectionState.DISCONNECTED) {
      throw new Error('Client must be disconnected to connect');
    }

    this.connectionState = ConnectionState.CONNECTING;

    if (this.ws && (this.ws.readyState === 0 || this.ws.readyState === 1)) {
      throw new Error('Client already connected to an active websocket connection');
    }

    try {
      await this.tryConnect(options);
    } catch (e) {
      this.connectionState = ConnectionState.DISCONNECTED;

      throw e;
    }

    this.connectionState = ConnectionState.CONNECTED;
    this.didConnect = true;
  };

  /**
   * Opens a service channel. If name is omitted, it will send [[api.OpenChannel.Action.CREATE]] as the action
   *
   * @param name Channel name (can be anything)
   * @param service One of goval's services
   */
  public openChannel = ({ name, service }: { name?: string; service: string }): Channel => {
    const action =
      name == null ? api.OpenChannel.Action.CREATE : api.OpenChannel.Action.ATTACH_OR_CREATE;

    const channel = new Channel();

    // Random base36 int
    const ref = Number(
      Math.random()
        .toString()
        .split('.')[1],
    ).toString(36);
    // Not using Channel.request here because we want to
    // resolve the response synchronously. We can receive
    // openChanRes and a command on the requested channel
    // in a single tick, using promises here would causes us to
    // handle the incoming command before openChanRes, leading to errors
    this.getChannel(0).send({
      ref,
      openChan: {
        name,
        service,
        action,
      },
    });

    const onResponse = (cmd: api.Command) => {
      if (ref !== cmd.ref) {
        return;
      }

      if (cmd.openChanRes == null) {
        throw new Error('Expected openChanRes on command');
      }

      this.handleOpenChanRes(channel, cmd.openChanRes);

      this.getChannel(0).off('command', onResponse);
    };

    this.getChannel(0).on('command', onResponse);

    return channel;
  };

  /**
   * Closes the socket connection and handles cleanup
   */
  public close = () => this.onClose({ expected: true });

  /** Gets a channel by Id */
  public getChannel(id: number): Channel {
    const chan = this.channels[id];

    if (!chan) {
      throw new Error('No channel with number');
    }

    return chan;
  }

  public getToken(): string {
    if (!this.token) {
      throw new Error('must connect before getting token');
    }

    return this.token;
  }

  private send = (cmd: api.Command) => {
    if (this.debug) {
      this.debug('out', cmd);
    }

    const cmdBuf = api.Command.encode(cmd).finish();
    const buffer = cmdBuf.buffer.slice(cmdBuf.byteOffset, cmdBuf.byteOffset + cmdBuf.length);

    if (this.ws == null) {
      throw new Error('Calling send on a closed client');
    }

    this.ws.send(buffer);
  };

  private onSocketMessage = ({ data }: MessageEvent) => {
    const d = new Uint8Array(data);
    const cmd = api.Command.decode(d);

    if (this.debug) {
      this.debug('in', cmd);
    }

    // Pass it to the right channel
    this.getChannel(cmd.channel).onCommand(cmd);

    switch (cmd.body) {
      case 'containerState':
        if (cmd.containerState == null || cmd.containerState.state == null) {
          const err = new Error('Expected container state to have state, got null or undefined');

          if (this.deferredReady) {
            this.deferredReady.reject(err);
            return;
          }

          throw err;
        }

        this.containerState = cmd.containerState.state;

        if (this.containerState === api.ContainerState.State.READY) {
          if (this.deferredReady) {
            this.deferredReady.resolve();
            this.deferredReady = null;
          }

          if (this.getChannel(0).isOpen === false) {
            this.getChannel(0).onOpen(0, api.OpenChannelRes.State.CREATED, this.send);
          }
        }

        if (this.containerState === api.ContainerState.State.SLEEP) {
          this.onClose({ expected: false });
        }

        break;

      case 'closeChanRes':
        if (cmd.closeChanRes == null) {
          throw new Error('Expected closeChanRes');
        }

        this.handleCloseChannel(cmd.closeChanRes);

        break;
      default:
    }
  };

  private handleOpenChanRes = (channel: Channel, { id, state, error }: api.IOpenChannelRes) => {
    if (state === api.OpenChannelRes.State.ERROR) {
      channel.onOpenError({ error });

      return;
    }

    if (id == null || state == null) {
      throw new Error('Expected state and channel id');
    }

    this.channels[id] = channel;
    channel.onOpen(id, state, this.send);
  };

  private handleCloseChannel = ({ id, status }: api.ICloseChannelRes) => {
    if (id == null) {
      throw new Error('Closing channel with no id?');
    }

    this.channels[id].onClose({ id, status });

    delete this.channels[id];
  };

  private onClose = ({ closeEvent, expected }: { closeEvent?: CloseEvent; expected: boolean }) => {
    this.connectionState = ConnectionState.DISCONNECTED;
    this.containerState = null;

    if (this.ws) {
      this.ws.onmessage = null;
      this.ws.onclose = null;

      if (this.ws.readyState === 0 || this.ws.readyState === 1) {
        this.ws.close();
      }

      this.ws = null;
    }

    if (this.didConnect) {
      // Only close the channels if we ever connected
      // so that we can retry without losing queued up
      // messages.
      Object.keys(this.channels).forEach((id) => {
        this.handleCloseChannel({ id: Number(id) });
      });
    }

    if (this.deferredReady) {
      this.deferredReady.reject(new Error('Connection closed before the server was ready'));
      this.deferredReady = null;
    }

    this.emit('close', { closeEvent, expected });
  };

  private onSocketClose = (closeEvent: CloseEvent) => {
    if (this.connectionState !== ConnectionState.DISCONNECTED) {
      this.onClose({
        closeEvent,
        expected: false,
      });
    }
  };

  private tryConnect = async ({
    debug,
    tokenOptions,
    urlOptions,
    polling,
    timeout,
  }: {
    debug?: DebugFunc;
    tokenOptions: TokenOptions;
    urlOptions?: UrlOptions;
    polling?: boolean;
    timeout?: number;
  }) => {
    const token = tokenOptions.token || (await fetchReplToken(tokenOptions));
    if (this.connectionState === ConnectionState.DISCONNECTED) {
      throw new Error('closed while connecting');
    }

    this.token = token;

    const connStr = getConnectionStr(token, urlOptions);

    let ws;
    if (polling) {
      ws = new EIOCompat(connStr);
    } else {
      ws = new WebSocket(connStr);
    }

    ws.binaryType = 'arraybuffer';

    if (debug) {
      this.debug = debug;
    }

    ws.onmessage = this.onSocketMessage;
    ws.onclose = this.onSocketClose;
    this.ws = ws;

    this.deferredReady = createDeferred();

    let timeoutId: NodeJS.Timer;
    if (timeout != null) {
      timeoutId = setTimeout(() => {
        if (this.deferredReady) {
          this.deferredReady.reject(new Error('timeout'));
          this.deferredReady = null;
        }

        this.close();
      }, timeout);
    }

    const res = this.deferredReady.resolve;
    this.deferredReady.resolve = (v) => {
      clearTimeout(timeoutId);
      res(v);
    };

    return this.deferredReady.promise;
  };
}

export { Client };
