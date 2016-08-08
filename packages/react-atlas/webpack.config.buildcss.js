const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const cssnext = require('postcss-cssnext');
const postcssImport = require('postcss-import');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: [
    '../react-atlas-core/src/index.js',
    '../react-atlas-default-theme/src/index.js'
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
  postcss: function (bundler) {
    return [
      postcssImport({
        addDependencyTo: bundler
      }),
      cssnext
    ];
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new ExtractTextPlugin('reactAtlas.min.css')
  ]
};
