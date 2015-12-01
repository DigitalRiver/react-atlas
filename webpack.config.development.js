const pkg = require('./package');
const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const precss = require("precss");
const imports = require("postcss-import");
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: __dirname,
  devtool: 'inline-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './spec/index.jsx'
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'spec.js',
    publicPath: '/build/'
  },
  resolve: {
    alias: {
      "basscss-base": "basscss-base",
      "basscss-utilities": "basscss-utilities",
      "basscss-base-reset": "basscss-base-reset",
      "basscss-base-forms": "basscss-base-forms",
      "basscss-base-tables": "basscss-base-tables",
      "basscss-base-typography": "basscss-base-typography",
      "basscss-color-base": "basscss-color-base",
      "basscss-color-forms": "basscss-color-forms",
      "basscss-color-tables": "basscss-color-tables",
      "basscss-btn": "basscss-btn",
      "basscss-btn-primary": "basscss-btn-primary",
      "basscss-btn-outline": "basscss-btn-outline",
      "basscss-type-scale": "basscss-type-scale",
      "basscss-utility-typography": "basscss-utility-typography",
      "basscss-utility-layout": "basscss-utility-layout",
      "basscss-align": "basscss-align",
      "basscss-white-space": "basscss-white-space",
      "basscss-positions": "basscss-positions",
      "basscss-responsive-states": "basscss-responsive-states",
      "basscss-grid": "basscss-grid",
      "flex-object": "flex-object",
      "basscss-borders": "basscss-borders",
      "basscss-colors": "basscss-colors",
      "basscss-background-colors": "basscss-background-colors",
      "basscss-defaults": "basscss-defaults"
    },
    extensions: ['', '.jsx', '.scss', '.js', '.json']
  },
  module: {
    loaders: [
      {
        test: /(\.js|\.jsx)$/,
        exclude: /(node_modules)/,
        loader: 'babel'
      }, {
        test: /(\.scss)$/,
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[path]__[local]!sass?sourceMap')
      },
       {
        test: /(\.css)$/,
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[path]__[local]!postcss')
      }
    ]
  },
  postcss: [imports, precss, autoprefixer],
  plugins: [
    new ExtractTextPlugin('spec.css', { allChunks: true }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      VERSION: JSON.stringify(pkg.version)
    })
  ]
};
