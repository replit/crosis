/* eslint-disable */
const express = require('express');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config.js');
const genConnectionMetadata = require('./genConnectionMetadata');

const app = express();
const port = process.env.PORT || 5000;

const compiler = webpack(config);

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  }),
);

app.get('/', (req, res) => {
  res.send(`
  <script>window.connectionMetadata = ${JSON.stringify(genConnectionMetadata())}</script>
  <script src="debug.js"></script>
  `);
});

app.listen(port, () => {
  console.log(`Server started on port:${port}`);
});
