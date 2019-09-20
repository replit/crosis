import { EventEmitter } from 'events';
import * as Sentry from '@sentry/browser';
import execute from '@replit/recaptcha';
import { api } from './api';
import { Channel } from './channel';
import { createDeferred, Deferred } from './deferred';
import { EIOCompat } from './EIOCompat';

enum ConnectionState {
  CONNECTING = 0,
  CONNECTED = 1,
  DISCONNECTED = 2,
}

type DebugFunc = (direction: 'in' | 'out', cmd: api.Command) => void;

class Client extends EventEmitter {
  public containerState: api.ContainerState.State | null;
  public connectionState: ConnectionState;

  private token: String | null;
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

    Sentry.addBreadcrumb({
      category: 'crosis',
      message: 'constructor',
    });
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
  }) => {
    if (this.didConnect) {
      // We don't want to allow connections if we ever connected
      throw new Error(
        'Reconnecting using the same client after it connected once is not allowed',
      );
    }

    Sentry.addBreadcrumb({
      category: 'crosis',
      message: 'connect',
      data: { polling: options.polling },
    });

    if (this.connectionState !== ConnectionState.DISCONNECTED) {
      Sentry.addBreadcrumb({
        category: 'crosis',
        message: 'error',
        data: 'Client must be disconnected to connect',
      });

      throw new Error('Client must be disconnected to connect');
    }

    this.connectionState = ConnectionState.CONNECTING;

    if (this.ws && (this.ws.readyState === 0 || this.ws.readyState === 1)) {
      Sentry.addBreadcrumb({
        category: 'crosis',
        message: 'error',
        data: 'Client already connected to an active websocket connection',
      });

      throw new Error(
        'Client already connected to an active websocket connection',
      );
    }

    try {
      await this._connect(options);
    } catch (e) {
      this.connectionState = ConnectionState.DISCONNECTED;

      Sentry.addBreadcrumb({
        category: 'crosis',
        message: 'error',
        data: e.message,
      });

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
  public openChannel = ({
    name,
    service,
  }: {
    name?: string;
    service: string;
  }): Channel => {
    Sentry.addBreadcrumb({
      category: 'crosis',
      message: 'openChannel',
      data: {
        name,
        service,
      },
    });

    const action =
      name == null
        ? api.OpenChannel.Action.CREATE
        : api.OpenChannel.Action.ATTACH_OR_CREATE;

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

      this.handleOpenChanRes(channel, cmd.openChanRes!);

      this.getChannel(0).off('command', onResponse);
    };

    this.getChannel(0).on('command', onResponse);

    return channel;
  };

  /**
   * Closes the socket connection and handles cleanup
   */
  public close = () =>
    this._close({
      expected: true,
    });

  /** Gets a channel by Id */
  public getChannel(id: number): Channel {
    const chan = this.channels[id];

    Sentry.addBreadcrumb({
      category: 'crosis',
      message: 'getChannel',
      data: {
        id,
      },
    });

    if (!chan) {
      Sentry.addBreadcrumb({
        category: 'crosis',
        message: 'error',
        data: 'No channel with number',
      });

      throw new Error('No channel with number');
    }

    return chan;
  }

  public getToken(): String {
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
    const buffer = cmdBuf.buffer.slice(
      cmdBuf.byteOffset,
      cmdBuf.byteOffset + cmdBuf.length,
    );

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
        this.containerState = cmd.containerState!.state!;

        Sentry.addBreadcrumb({
          category: 'crosis',
          message: 'containerState',
          data: this.containerState,
        });

        if (this.containerState === api.ContainerState.State.READY) {
          if (this.deferredReady) {
            this.deferredReady.resolve();
            this.deferredReady = null;
          }

          if (this.getChannel(0).isOpen === false) {
            this.getChannel(0).onOpen(
              0,
              api.OpenChannelRes.State.CREATED,
              this.send,
            );
          }
        }

        if (this.containerState === api.ContainerState.State.SLEEP) {
          this._close({ expected: false });
        }

        return;

      case 'closeChanRes':
        this.closeChannel(cmd.closeChanRes!);

        return;

      default:
        return;
    }
  };

  private handleOpenChanRes = (
    channel: Channel,
    { id, state, error }: api.IOpenChannelRes,
  ) => {
    Sentry.addBreadcrumb({
      category: 'crosis',
      message: 'openChanres',
    });

    if (state === api.OpenChannelRes.State.ERROR) {
      Sentry.addBreadcrumb({
        category: 'crosis',
        message: 'error',
        data: error,
      });

      channel.onOpenError({ error });

      return;
    }

    if (id == null || state == null) {
      throw new Error('Expected state and channel id');
    }

    this.channels[id] = channel;
    channel.onOpen(id, state, this.send);
  };

  private closeChannel = ({ id }: api.ICloseChannel) => {
    Sentry.addBreadcrumb({
      category: 'crosis',
      message: 'closeChannel',
      data: { id },
    });

    if (!id) {
      return;
    }

    this.channels[id].onClose();

    delete this.channels[id];
  };

  private _close = ({
    closeEvent,
    expected,
  }: {
    closeEvent?: CloseEvent;
    expected: boolean;
  }) => {
    this.connectionState = ConnectionState.DISCONNECTED;
    this.containerState = null;

    Sentry.addBreadcrumb({
      category: 'crosis',
      message: 'close',
      data: {
        expected: JSON.stringify(expected),
        closeReason: closeEvent ? closeEvent.reason : undefined,
      },
    });

    if (this.ws) {
      this.ws.onmessage = null;
      this.ws.onclose = null;

      if (this.ws.readyState === 0 || this.ws.readyState === 1) {
        Sentry.addBreadcrumb({
          category: 'crosis',
          message: 'wsclose',
          data: {
            expected,
            closeReason: closeEvent ? closeEvent.reason : undefined,
          },
        });

        this.ws.close();
      }

      this.ws = null;
    }

    if (this.didConnect) {
      // Only close the channels if we ever connected
      // so that we can retry without losing queued up
      // messages.
      for (const id of Object.keys(this.channels)) {
        this.closeChannel({ id: Number(id) });
      }
    }

    if (this.deferredReady) {
      this.deferredReady.reject(
        new Error('Connection closed before the server was ready'),
      );
      this.deferredReady = null;
    }

    this.emit('close', { closeEvent, expected });
  };

  private onSocketClose = (closeEvent: CloseEvent) => {
    if (this.connectionState !== ConnectionState.DISCONNECTED) {
      this._close({
        closeEvent,
        expected: false,
      });
    }
  };

  private _connect = async ({
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
    Sentry.addBreadcrumb({
      category: 'crosis',
      message: '_connect',
      data: {
        polling,
      },
    });

    const token = await getToken(tokenOptions);
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
        Sentry.addBreadcrumb({
          category: 'crosis',
          message: 'timeout',
        });

        if (this.deferredReady) {
          this.deferredReady.reject(new Error('timeout'));
          this.deferredReady = null;
        }

        this.close();
      }, timeout);
    }

    const res = this.deferredReady.resolve;
    this.deferredReady.resolve = v => {
      Sentry.addBreadcrumb({
        category: 'crosis',
        message: 'connected!',
      });

      clearTimeout(timeoutId);
      res(v);
    };

    return this.deferredReady.promise;
  };
}

interface TokenOptions {
  replId?: string;
  tokenUrl?: string;
  headers?: HeadersInit;
  polygott?: boolean;
  captcha?: string;
  liveCodingToken?: string;
}

/** @hidden */
async function getToken({
  replId,
  tokenUrl,
  headers,
  ...body
}: TokenOptions): Promise<string> {
  Sentry.addBreadcrumb({
    category: 'crosis',
    message: 'getToken',
  });

  const url = tokenUrl || `/data/repls/${replId}/gen_repl_token`;

  const captcha = await execute();

  const res = await fetch(url, {
    credentials: 'same-origin',
    headers: headers || {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    method: 'post',
    body: JSON.stringify({ ...body, captcha, format: 'pbuf' }),
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
  const { secure = false, host = 'eval.repl.it', port = '80' } =
    urlOptions || {};

  return `ws${secure ? 's' : ''}://${host}:${port}/wsv2/${token}`;
}

export { Client };
