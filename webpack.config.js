const path = require('path');

const root = process.env.ROOT_DIR || path.resolve(__dirname, '../../');

module.exports = {
  entry: './index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    modules: [
      path.resolve(root, 'packages', 'crosis', 'node_modules'),
      'node_modules',
    ],
  },
  resolveLoader: {
    modules: [
      path.resolve(root, 'packages', 'crosis', 'node_modules'),
      'node_modules',
    ],
  },
  output: {
    filename: 'crosis-standalone.[hash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: ['ReplitClient'],
    libraryTarget: 'window',
  },
};
