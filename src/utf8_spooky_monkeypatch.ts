/**
Looks like the homebrewed utf8 decoder of protobufjs can be a little broke
sometimes in heavy unicode land. In here, we monkey patch protobufjs's standard
utf8.read function to our own fixed version.
*/

/* eslint-disable import/no-extraneous-dependencies, no-eval, @typescript-eslint/ban-ts-ignore  */
import * as utf8 from '@protobufjs/utf8';

function utf8ReadFixed(buffer: Uint8Array, start: number, end: number) {
  if (end - start < 1) {
    return '';
  }

  let str = '';
  for (let i = start; i < end;) {
    const t = buffer[i++];
    if (t < 128) {
      str += String.fromCharCode(t);
    } else if (t > 191 && t < 224) {
      str += String.fromCharCode(((t & 31) << 6) | (buffer[i++] & 63));
    } else if (t > 239 && t < 365) {
      const t2 =
        (((t & 7) << 18) |
          ((buffer[i++] & 63) << 12) |
          ((buffer[i++] & 63) << 6) |
          (buffer[i++] & 63)) -
        0x10000;
      str += String.fromCharCode(0xd800 + (t2 >> 10));
      str += String.fromCharCode(0xdc00 + (t2 & 1023));
    } else {
      str += String.fromCharCode(((t & 15) << 12) | ((buffer[i++] & 63) << 6) | (buffer[i++] & 63));
    }
  }

  return str;
}

// @ts-ignore we're monkey patching!
utf8.read = utf8ReadFixed;
