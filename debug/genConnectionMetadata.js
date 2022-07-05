/* eslint-disable  @typescript-eslint/no-var-requires */
const crypto = require('crypto');
const { api } = require('@replit/protocol');
const paseto = require('./paseto');

if (!process.env.USER_KEY_ID || !process.env.USER_PRIVATE_KEY) {
  throw new Error('Expected USER_KEY_ID and USER_PRIVATE_KEY in ENV');
}

const keyId = process.env.USER_KEY_ID;
const govalPrivateKey = (() => {
  const ed25519AsnPrivateKeyHeader = Buffer.from('302e020100300506032b657004220420', 'hex');
  const keyData = Buffer.concat([
    ed25519AsnPrivateKeyHeader,
    // The last 32 bytes of the private key is the public key.
    Buffer.from(process.env.USER_PRIVATE_KEY, 'base64').slice(0, 32),
  ]);
  return crypto.createPrivateKey(`-----BEGIN PRIVATE KEY-----
${keyData.toString('base64')}
-----END PRIVATE KEY-----`);
})();

function genConnectionMetadata(options) {
  const now = Date.now();

  const restrictNetwork = !!options?.restrictNetwork;

  const repl = options?.repl || {
    id: `testing-crosis-${Math.random().toString(36).split('.')[1]}`,
    language: 'bash',
    slug: Math.random().toString(36).slice(2),
    user: 'crosistest',
    bucket: 'test-replit-repls',
  };

  const token = api.ReplToken.create({
    iat: {
      seconds: Math.floor(now / 1000) - 15, // Account for some amount of clock drift.
    },
    exp: {
      seconds: Math.floor(now / 1000) + 60 * 60,
    },
    cluster: 'global',
    persistence: api.ReplToken.Persistence.NONE,
    format: api.ReplToken.WireFormat.PROTOBUF,
    repl,
    resourceLimits: {
      memory: 1024 * 1024 * 512,
      threads: 0.5,
      shares: 0.5,
      disk: 1024 * 1024 * 1024,
      net: true,
      restrictNetwork,
    },
  });

  const encodedOpts = api.ReplToken.encode(token).finish().toString('base64');
  const encodedToken = paseto.sign(
    govalPrivateKey,
    Buffer.from(encodedOpts),
    Buffer.from(
      api.GovalSigningAuthority.encode(
        api.GovalSigningAuthority.create({
          keyId,
          issuer: 'crosis-ci',
        }),
      )
        .finish()
        .toString('base64'),
    ),
  );

  return {
    token: encodedToken,
    gurl: 'wss://eval.global.replit.com',
    conmanURL: 'https://eval.global.replit.com',
    repl,
  };
}

module.exports = genConnectionMetadata;
