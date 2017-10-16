var path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

let config = {
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
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    })
  ]
};

if(process.env.NODE_ENV === "production") {
  config.module.rules.push({
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
    },
    { 
      test: /\.(ttf|eot|woff|woff2|otf|svg)$/, 
      loader: 'url-loader' // TO-DO: Optimize for production build
    });
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        warnings: false, // Suppress uglification warnings
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        screw_ie8: true
      },
      output: {
        comments: false,
      },
      exclude: [/\.min\.js$/gi] // skip pre-minified libs
    })),
  config.plugins.push(new webpack.optimize.AggressiveMergingPlugin());
  config.plugins.push(new ExtractTextPlugin("atlasThemes.min.css"));
} else {
  config.module.rules.push({
    test: /\.css$/,
    loaders: [
        'style-loader?sourceMap',
        'css-loader?modules&importLoaders=1&localIdentName=ra_[name]__[local]',
        'postcss-loader'
    ]
  },
  { 
    test: /\.(ttf|eot|woff|woff2|otf|svg)$/, 
    loader: 'url-loader'
  });
}

module.exports = function() {
  return config;
}
