// @flow
/* eslint-disable */
// A worker-thread-free implementation of PASETO.
// Reference: https://github.com/paragonie/paseto/blob/master/docs/01-Protocol-Versions/Version2.md
// copied from repl-it-web, should probably put it on npm

const crypto = require('crypto');

const header = 'v2.public.';

/**
 * Little-Endian binary encoding of a 64-bit integer.
 *
 * This is documented in
 * https://github.com/paragonie/paseto/blob/master/docs/01-Protocol-Versions/Common.md#authentication-padding
 */
function le64(n /*: number */) /*: Buffer */ {
  const buf = Buffer.allocUnsafe(8);
  for (let i = 0; i < 8; i++) {
    if (i === 7) {
      // Clear the MSB for interoperability.
      n &= 0x7f;
    }

    buf.writeUInt8(n & 0xff, i);
    n >>= 8;
  }

  return buf;
}

/**
 * Pre-Authentication Encoding. This is used to prevent a collision with only a
 * partially controlled plaintext.
 *
 * This is documented in
 * https://github.com/paragonie/paseto/blob/master/docs/01-Protocol-Versions/Common.md#authentication-padding
 */
function pae(...pieces /*: Buffer[] */) /*: Buffer */ {
  const finalPieces = [];
  finalPieces.push(le64(pieces.length));
  for (const piece of pieces) {
    finalPieces.push(le64(Buffer.byteLength(piece)));
    finalPieces.push(piece);
  }

  return Buffer.concat(finalPieces);
}

function base64UrlSafe(data /*: Buffer */) /*: string */ {
  return data.toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

function sign(
  privateKey /*: crypto$KeyObject */,
  message /*: Buffer */,
  footer /*: Buffer */,
) /*: string */ {
  const m2 = pae(Buffer.from(header), message, footer);
  const sig = crypto.sign(null, m2, privateKey);

  return `${header}${base64UrlSafe(Buffer.concat([message, sig]))}.${base64UrlSafe(footer)}`;
}

function verify(
  publicKey /*: crypto$KeyObject */,
  signedMessage /*: string */,
) /*: { message: Buffer, footer: Buffer } */ {
  if (signedMessage.indexOf(header) !== 0) {
    throw new Error(`Invalid signedMessage. Did not start with "${header}"`);
  }

  const pieces = signedMessage.split('.');
  if (pieces.length !== 4) {
    throw new Error(`Invalid number of pieces. got ${pieces.length}, expected 4`);
  }

  const payload = Buffer.from(pieces[2], 'base64');
  const footer = Buffer.from(pieces[3], 'base64');
  if (Buffer.byteLength(payload) <= 64) {
    throw new Error(
      `Invalid signed message length. got ${Buffer.byteLength(payload)}, expected > 64`,
    );
  }

  const message = payload.slice(0, Buffer.byteLength(payload) - 64);
  const sig = payload.slice(Buffer.byteLength(payload) - 64);

  const m2 = pae(Buffer.from(header), message, footer);
  if (!crypto.verify(null, m2, publicKey, sig)) {
    throw new Error('Invalid signed message. Could not verify.');
  }

  return { message, footer };
}

module.exports = {
  pae,
  sign,
  verify,
};
