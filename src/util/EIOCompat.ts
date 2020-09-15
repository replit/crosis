/* global Event CloseEvent MessageEvent */

import * as eio from 'engine.io-client';
import * as urllib from 'url';

export function splitHref(href: string) {
  const parsed = urllib.parse(href);

  const { protocol, slashes, auth, host, pathname } = parsed;

  const uri = urllib.format({
    protocol,
    slashes,
    auth,
    host,
    query: { ordered: '1' },
  });

  const path = pathname != null ? pathname : '/';

  return { uri, path };
}

const sequenceBytesCount = 4;

const readyStateStringToValue = new Map([
  ['opening', 0],
  ['open', 1],
  ['closing', 2],
  ['closed', 3],
]);

export class EIOCompat implements WebSocket {
  public onclose: ((ev: CloseEvent) => unknown) | null;

  public onerror: ((ev: Event) => unknown) | null;

  public onmessage: ((ev: MessageEvent) => unknown) | null;

  public onopen: ((ev: Event) => unknown) | null;

  public url: string;

  public extensions: string;

  public protocol: string;

  public bufferedAmount: number;

  public binaryType: BinaryType;

  public readyState: number;

  public incomingSequence: number;

  public outOfOrderQueue: { [sequence: number]: ArrayBuffer };

  public outgoingSequence: number;

  readonly CLOSED = 3;

  readonly CLOSING = 2;

  readonly OPEN = 1;

  readonly CONNECTING = 0;

  private eioSocket: eio.Socket;

  constructor(url: string, protocols?: string | string[] | undefined) {
    if (protocols) {
      throw new Error('Passing protocols is not implemented');
    }

    const { uri, path } = splitHref(url);

    this.onopen = null;
    this.onclose = null;
    this.onmessage = null;
    this.onerror = null;
    this.eioSocket = eio(uri, { path, transports: ['polling'] });
    this.url = url;
    this.extensions = '';
    this.protocol = '';
    this.bufferedAmount = 0;
    this.binaryType = 'blob';
    this.readyState = 0;
    this.incomingSequence = 0;
    this.outOfOrderQueue = {};
    this.outgoingSequence = 0;

    this.setReadyState();

    this.eioSocket.on('open', () => {
      this.setReadyState();
      if (this.onopen != null) {
        const event = new Event('open');
        this.onopen.call(this, event);
      }
    });

    this.eioSocket.on('close', (reason) => {
      this.setReadyState();
      if (this.onclose != null) {
        const event = new CloseEvent('close', {
          reason,
          code: 1001,
          wasClean: false,
        });

        this.onclose.call(this, event);
      }
    });

    this.eioSocket.on('message', (data) => {
      this.setReadyState();
      if (this.onmessage == null) {
        return;
      }

      if (typeof data === 'string') {
        throw new Error('expected data to be ArrayBuffer not string');
      }

      const view = new DataView(data);
      const sequence = view.getUint32(0);

      if (this.incomingSequence !== sequence) {
        // We didn't get the message we expected
        // put it in the queue until we get the expected message
        this.outOfOrderQueue[sequence] = data.slice(sequenceBytesCount);

        return;
      }

      this.incomingSequence = sequence + 1;

      const message = new MessageEvent('message', {
        data: data.slice(sequenceBytesCount),
      });

      const onmessage = this.onmessage.bind(this);

      onmessage(message);

      const queuedSequences = Object.keys(this.outOfOrderQueue);
      if (queuedSequences.length > 0) {
        // We got the message we expected but we have other messages
        // that were out of order and queued up
        queuedSequences.sort().forEach((seq) => {
          onmessage(
            new MessageEvent('message', {
              data: this.outOfOrderQueue[+seq],
            }),
          );

          this.incomingSequence = +seq + 1;
        });

        this.outOfOrderQueue = {};
      }
    });

    this.eioSocket.on('error', () => {
      this.setReadyState();
      if (this.onerror != null) {
        const event = new Event('error');
        this.onerror.call(this, event);
      }
    });
  }

  setReadyState() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore engine.io-client doesn't have typing for readyState :/
    this.readyState = readyStateStringToValue.get(this.eioSocket.readyState);
  }

  send(buffer: ArrayBuffer) {
    const sequencedBuffer = new ArrayBuffer(sequenceBytesCount + buffer.byteLength);
    new Uint8Array(sequencedBuffer).set(new Uint8Array(buffer), sequenceBytesCount);

    const view = new DataView(sequencedBuffer);
    view.setUint32(0, this.outgoingSequence);
    this.outgoingSequence += 1;

    this.eioSocket.send(sequencedBuffer);
    this.setReadyState();
  }

  close() {
    this.onmessage = null;
    this.eioSocket.close();
    this.setReadyState();
  }

  // eslint-disable-next-line class-methods-use-this
  addEventListener(): boolean {
    throw new Error('Not Implemented, please use onmessage, onopen, onerror, or onclose');
  }

  // eslint-disable-next-line class-methods-use-this
  removeEventListener() {
    throw new Error('Not Implemented');
  }

  // eslint-disable-next-line class-methods-use-this
  dispatchEvent(): boolean {
    throw new Error('Not Implemented');
  }
}
