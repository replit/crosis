const path = require('path');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'debug.ts'),
  output: {
    filename: 'debug.js',
    path: path.resolve(__dirname, 'debug'),
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        // exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
};
