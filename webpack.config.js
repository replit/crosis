const path = require('path');


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
    modules: ['node_modules'],
  },
  resolveLoader: {
    modules: ['node_modules'],
  },
  output: {
    filename: 'crosis-standalone.[hash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: ['ReplitClient'],
    libraryTarget: 'window',
  },
};
