var path = require('path');
var webpack = require('webpack');

let config =  {
  entry: [
    path.join(__dirname, './src/index.js')
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
        loaders: [
            'style-loader?sourceMap',
            'css-loader?modules&importLoaders=1&localIdentName=ra_[name]__[local]',
            'postcss-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {

          }
        }
      },
      { 
        test: /\.(ttf|eot|woff|woff2|otf|svg)$/, 
        loader: 'url-loader'
      }
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
}

module.exports = function(env) {
  if(typeof env != 'undefined') {
    let theme = env.theme;
    config.externals = config.externals || {};
    config.externals[theme] = {
      root: theme,
      commonjs2: theme,
      commonjs: theme,
      amd: theme
    };
  }
  return config;
}
