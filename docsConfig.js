const autoprefixer = require('autoprefixer');
const cssnext = require('postcss-cssnext');
const postcssImport = require('postcss-import');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  "title": "React Atlas Docs",
  "babelConfig": {
    "presets": ["es2015", "react", "stage-1"]
  },
  "webpackConfig": {
    module: {
      loaders: [
        {
          test: /\.css$/,
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
