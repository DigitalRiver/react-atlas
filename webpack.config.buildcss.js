const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const cssnext = require('postcss-cssnext');
const postcssImport = require('postcss-import');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const discardComments = require('postcss-discard-comments');
const discardEmpty = require('postcss-discard-empty');
const discardDuplicates = require('postcss-discard-duplicates');

module.exports = {
  context: __dirname,
  entry: [
    './components/index.js'
  ],
  output: {
    filename: 'main.js',
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, 'lib'),
    publicPath: '/lib/'
  },
  resolve: {
    extensions: ['', '.js', '.json', '.css']
  },
  module: {
    loaders: [
      {
        test: /(\.js)$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          [
            'css-loader?minimize&modules&importLoaders=1&localIdentName=ra_[name]__[local]',
            'postcss-loader'
          ]
        )
      }
    ]
  },
  postcss (bundler) {
    return [
      postcssImport({
        addDependencyTo: bundler
      }),
      cssnext,
      autoprefixer
    ];
  },
  plugins: [
    new ExtractTextPlugin('reactAtlas.min.css')
  ]
};
