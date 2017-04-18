var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    filename: 'index.js',
    path: path.join(__dirname, 'lib'),
    publicPath: '/lib/',
    libraryTarget: 'commonjs2'
  },
  externals: [{
      'react': {
          root: 'React',
          commonjs2: 'react',
          commonjs: 'react',
          amd: 'react'
      }
  }, {
      'react-dom': {
          root: 'ReactDOM',
          commonjs2: 'react-dom',
          commonjs: 'react-dom',
          amd: 'react-dom'
      }
  }],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { modules: true }
          },
        ],
      },
    ],
  },
};