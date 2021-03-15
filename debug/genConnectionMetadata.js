/* eslint-disable  @typescript-eslint/no-var-requires */
const { api } = require('@replit/protocol');
const paseto = require('./paseto');

const keyId = process.env.USER_KEY_ID;
const govalPrivateKey = crypto.createPrivateKey(process.env.USER_PRIVATE_KEY_PEM.replace(/\\n/, '\n'));
const govalPublicKey = crypto.createPublicKey(process.env.USER_PUBLIC_KEY_PEM.replace(/\\n/, '\n'));

if (!keyId || !govalPrivateKey || !govalPublicKey) {
  throw new Error('expected all token keys to be present');
}

function genConnectionMetadata() {
  const now = Date.now();

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
    repl: {
      id: `testing-crosis-${Math.random().toString(36).split('.')[1]}`,
      language: 'bash',
      slug: Math.random().toString(36).slice(2),
      user: 'crosistest',
      bucket: 'test-replit-repls',
    },
    resourceLimits: {
      memory: 1024 * 1024 * 512,
      threads: 0.5,
      shares: 0.5,
      disk: 1024 * 1024 * 1024,
      net: true,
    },
  });

  const encodedOpts = api.ReplToken.encode(token).finish().toString('base64');
  const encodedToken = paseto.sign(
    govalPrivateKey,
    Buffer.from(encodedOpts),
    Buffer.from(
      api.GovalTokenMetadata.encode(api.GovalTokenMetadata.create({ keyId }))
        .finish()
        .toString('base64'),
    ),
  );

  return {
    token: encodedToken,
    gurl: 'wss://eval.global.replit.com',
    conmanURL: 'https://eval.global.replit.com',
  };
}

module.exports = genConnectionMetadata;
