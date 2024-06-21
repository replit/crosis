/* eslint-disable  @typescript-eslint/no-var-requires */
const crypto = require('crypto');
const { api } = require('@replit/protocol');
const paseto = require('./paseto');

const getCryptoKey = (value) => {
  const ed25519AsnPrivateKeyHeader = Buffer.from('302e020100300506032b657004220420', 'hex');
  const keyData = Buffer.concat([
    ed25519AsnPrivateKeyHeader,
    // The last 32 bytes of the private key is the public key.
    Buffer.from(value, 'base64').slice(0, 32),
  ]);
  return crypto.createPrivateKey(`-----BEGIN PRIVATE KEY-----
${keyData.toString('base64')}
-----END PRIVATE KEY-----`);
};

let keyId;
let key;
let clusterMetadata;
let cluster;

if (!process.env.USER_KEY_ID || !process.env.USER_PRIVATE_KEY) {
  console.info(
    'No key in environment variables, generating new key, using development key to be used with a development goval',
  );

  keyId = 'dev';
  key = getCryptoKey(
    'h/Qn2Wtu0bq85i3EF17r/diy4xNdYAMkCgHxLmu3xG+ifQWRKYQL5x7jRX1VzhAAFdLHpNej6WGn31voprSCug==',
  );

  cluster = 'development';
  clusterMetadata = {
    gurl: 'ws://localhost:4560',
    conmanURL: 'http://localhost:4560',
    // this should be fetched from lore, but doesn't matter in the context of crosis
    dotdevHostname: `http://thishouldbeareplid-00-replittesting.${cluster}.replit.localhost:8081`,
  };
} else {
  console.info('Found key in environment variables, will connect to CI cluster');

  keyId = process.env.USER_KEY_ID;
  key = getCryptoKey(process.env.USER_PRIVATE_KEY);

  cluster = 'mark';
  clusterMetadata = {
    gurl: `wss://eval2.mark.platform-replit.replit.com`,
    conmanURL: `https://eval2.mark.platform-replit.replit.com`,
    // this should be fetched from lore, but doesn't matter in the context of crosis
    dotdevHostname: `https://thishouldbeareplid-00-replittesting.mark.replit.dev`,
  };
}

function genConnectionMetadata(options) {
  const now = Date.now();

  const restrictNetwork = !!(options && options.restrictNetwork);
  const id = `testing-crosis-${Math.random().toString(36).split('.')[1]}`;

  const repl = (options && options.repl) || {
    id,
    language: 'nix',
    slug: Math.random().toString(36).slice(2),
    user: 'crosistest',
    userId: {
      id: 78171400, // arbitrary (chosen as crc32c("crosis") if you care)
      environment: api.repl.Environment.DEVELOPMENT,
    },
    bucket: 'replit-repl-files-mark',
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
    key,
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
    repl,
    ...clusterMetadata,
  };
}

module.exports = genConnectionMetadata;
