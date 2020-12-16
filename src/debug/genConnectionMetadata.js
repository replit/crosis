/* eslint-disable  @typescript-eslint/no-var-requires */
const crypto = require('crypto');

const { TOKEN_SECRET } = process.env;

if (!TOKEN_SECRET) {
  throw new Error('TOKEN_SECRET env variable is required to run tests');
}

function genConnectionMetadata() {
  const opts = {
    id: `testing-crosis-${Math.random().toString(36).split('.')[1]}`,
    mem: 1024 * 1024 * 512,
    thread: 0.5,
    share: 0.5,
    net: true,
    attach: true,
    bucket: 'test-replit-repls',
    ephemeral: true,
    nostore: true,
    language: 'bash',
    owner: true,
    path: Math.random().toString(36).split('.')[1],
    disk: 1024 * 1024 * 1024,
    bearerName: 'crosistest',
    bearerId: 2,
    presenced: true,
    user: 'crosistest',
    pullFiles: true,
    polygott: false,
    format: 'pbuf',
  };
  const encodedOpts = Buffer.from(
    JSON.stringify({
      created: Date.now(),
      salt: Math.random().toString(36).split('.')[1],
      ...opts,
    }),
  ).toString('base64');

  const hmac = crypto.createHmac('sha256', TOKEN_SECRET);
  hmac.update(encodedOpts);
  const msgMac = hmac.digest('base64');

  const token = Buffer.from(`${encodedOpts}:${msgMac}`);

  return {
    token: token.toString('base64'),
    gurl: 'ws://eval.repl.it',
    conmanURL: 'http://eval.repl.it',
  };
}

module.exports = genConnectionMetadata;
