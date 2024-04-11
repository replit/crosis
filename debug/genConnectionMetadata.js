/* eslint-disable  @typescript-eslint/no-var-requires */
const crypto = require('crypto');
const { api } = require('@replit/protocol');
const paseto = require('./paseto');

let cluster = 'mark';
if (!process.env.USER_KEY_ID && !process.env.USER_PRIVATE_KEY) {
  process.env.USER_KEY_ID = 'dev';
  process.env.USER_PRIVATE_KEY =
    'h/Qn2Wtu0bq85i3EF17r/diy4xNdYAMkCgHxLmu3xG+ifQWRKYQL5x7jRX1VzhAAFdLHpNej6WGn31voprSCug==';
  cluster = 'development';
}

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

  const restrictNetwork = !!(options && options.restrictNetwork);

  const repl = (options && options.repl) || {
    id: `testing-crosis-${Math.random().toString(36).split('.')[1]}`,
    language: 'bash',
    slug: Math.random().toString(36).slice(2),
    user: 'crosistest',
    userId: {
      id: 78171400, // arbitrary (chosen as crc32c("crosis") if you care)
      environment: api.repl.Environment.DEVELOPMENT,
    },
    bucket: 'test-replit-repls',
  };

  const token = api.ReplToken.create({
    iat: {
      seconds: Math.floor(now / 1000) - 15, // Account for some amount of clock drift.
    },
    exp: {
      seconds: Math.floor(now / 1000) + 60 * 60,
    },
    cluster,
    persistence: api.repl.Persistence.NONE,
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

  const clusterMetadata =
    cluster === 'development'
      ? {
          gurl: 'ws://localhost:4560',
          conmanURL: 'http://localhost:4560',
          dotdevHostname: `http://${repl.id}-00-replittesting.${cluster}.replit.localhost:8081`,
        }
      : {
          gurl: `wss://eval.${cluster}.replit.com`,
          conmanURL: `https://eval.${cluster}.replit.com`,
          dotdevHostname: `https://${repl.id}-00-replittesting.${cluster}.replit.dev`,
        };

  return {
    token: encodedToken,
    repl,
    ...clusterMetadata,
  };
}

module.exports = genConnectionMetadata;
