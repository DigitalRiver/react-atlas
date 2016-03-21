const autoprefixer = require('autoprefixer');
const cssnext = require('postcss-cssnext');
const postcssImport = require('postcss-import');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  "title": "React Atlas Docs",
  "babelConfig": {
    "presets": ["es2015", "react", "stage-1"]
  },
  "files": [
    '//maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css'
  ],
  "webpackConfig": {
    module: {
      loaders: [
        {
          test: /\.css$/,
          exclude: /(node_modules)/,
          loader: 'style!css?sourceMap&modules&importLoaders=1&localIdentName=ra_[name]__[local]!postcss'
        }
      ]
    },
    postcss: function(bundler) {
      return [
        postcssImport({
          addDependencyTo: bundler
        }),
        cssnext,
        autoprefixer
      ];
    }
  }
};
