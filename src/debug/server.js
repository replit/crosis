/* eslint-disable */
const express = require('express');
const path = require('path');
const Bundler = require('parcel');
const genConnectionMetadata = require('./genConnectionMetadata');

const bundler = new Bundler(path.join(__dirname, 'index.html'), {
  outDir: path.resolve(__dirname, '..', '..', 'dist.debug'),
});

const app = express();
const port = process.env.PORT || 8080;

app.get('/token', (req, res) => {
  res.json(genConnectionMetadata());
});

app.use(bundler.middleware());

app.listen(port, () => {
  console.log(`Server started on port:${port}`);
});
