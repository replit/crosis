/**

Looks like the homebrewed utf8 decoder of protobufjs can be a little broke
sometimes in heavy unicode land. In here, we monkey patch protobufjs's standard
utf8.ready/write functions and force it to use WHATWG TextDecoder/Encoder

*/

/* eslint-disable import/no-extraneous-dependencies, no-eval, @typescript-eslint/ban-ts-ignore  */
import * as utf8 from '@protobufjs/utf8';

function getEncoder() {
  // If there's no TextEncoder, we'll assume we're in NodeJS and use util.TextEncoder
  if (typeof TextEncoder === 'undefined') {
    // Use eval to force bundlers to ignore require
    // eslint-disable-next-line no-eval
    const util = eval('require("util")');
    return new util.TextEncoder();
  }

  return new TextEncoder();
}

function getDecoder() {
  // If there's no TextDecoder, we'll assume we're in NodeJS and use util.TextEncoder
  if (typeof TextDecoder === 'undefined') {
    // Use eval to force bundlers to ignore require
    const util = eval('require("util")');
    return new util.TextDecoder('utf8', { fatal: true, ignoreBOM: true });
  }

  return new TextDecoder('utf8', { fatal: true, ignoreBOM: true });
}

const decoder = getDecoder();
function utf8Read(intArr: Uint8Array, start: number, end: number) {
  return decoder.decode(intArr.slice(start, end));
}
// @ts-ignore we're monkey patching!
utf8.read = utf8Read;

const encoder = getEncoder();
function utf8Write(str: string, intArr: Uint8Array, offset: number) {
  const encodedStr = encoder.encode(str);
  intArr.set(encodedStr, offset);
  return offset - encodedStr.byteLength;
}
// @ts-ignore we're monkey patching!
utf8.write = utf8Write;
