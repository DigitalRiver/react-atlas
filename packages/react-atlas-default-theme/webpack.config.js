var path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

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
  module: {
    rules: [
    {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: [ {
                       loader: 'css-loader',
                       query: {
                           modules: true,
                           importLoaders: 1,
                           localIdentName: 'ra_[name]__[local]',
                           minimize: true
                       }
                     },
                     'postcss-loader'
                     ]
                })
    }
    ],
  },
  plugins: [
    new ExtractTextPlugin("atlasThemes.min.css"),
  ]
};