/**
Looks like the homebrewed utf8 decoder of protobufjs can be a little broke
sometimes in heavy unicode land. In here, we monkey patch protobufjs's standard
utf8.read function to our own fixed version.
*/

// eslint-disable-next-line max-len
/* eslint-disable no-bitwise, no-plusplus, import/no-extraneous-dependencies, no-eval, @typescript-eslint/ban-ts-comment  */
import * as utf8 from '@protobufjs/utf8';

function utf8ReadFixed(buffer: Uint8Array, start: number, end: number) {
  // this function is really a utf8 -> utf16 encoder (decoder???). Ideally we'd
  // be using the environment's built in TextDecoder but this has unreliable
  // behavior around BOM chars in some environments.
  if (end - start < 1) {
    return '';
  }

  let str = '';
  for (let i = start; i < end;) {
    const t = buffer[i++];
    if (t <= 0x7F) {
      // regular ol ascii, easy peasy
      // 0aaaaaaa
      str += String.fromCharCode(t);
    } else if (t >= 0xC0 && t < 0xE0) {
      // the only time utf16 is actually a  bro. A two byte utf8 code point can
      // be concated right into a utf16 code point.
      //
      // 110aaaaa 10bbbbbb
      // -> 00000aaaaabbbbbb
      str += String.fromCharCode(((t & 0x1F) << 6) | (buffer[i++] & 0x3F));
    } else if (t >= 0xE0 && t < 0xF0) {
      // also pretty straight forward. Worth noting this won't collide with
      // surrogate pairs as that section has been reserved.
      //
      // 1110aaaa 10bbbbbb 10cccccc
      // -> aaaabbbbbbcccccc
      str += String.fromCharCode(
        ((t & 0xF) << 12) |
        ((buffer[i++] & 0x3F) << 6) |
        (buffer[i++] & 0x3F),
      );
    } else if (t >= 0xF0) {
      // here's where things really get nasty. These code points end up as
      // utf16 surrogate pairs. It looks something like:
      //
      // 11110aaa 10bbbbbb 10cccccc 10dddddd
      // concat the code units aaabbbbbbccccccdddddd
      // subtract 0x10000
      // -> 110110aabbbbbbcc 110111ccccdddddd
      const t2 =
        (((t & 7) << 18) |
          ((buffer[i++] & 0x3F) << 12) |
          ((buffer[i++] & 0x3F) << 6) |
          (buffer[i++] & 0x3F)) -
        0x10000;
      str += String.fromCharCode(0xD800 + (t2 >> 10));
      str += String.fromCharCode(0xDC00 + (t2 & 0x3FF));
    }
  }

  return str;
}

// @ts-ignore we're monkey patching!
utf8.read = utf8ReadFixed;
