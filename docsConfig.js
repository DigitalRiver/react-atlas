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
    "./docsAssets/font-awesome.min.css",
    "./docsAssets/fonts/FontAwesome.otf",
    "./docsAssets/fonts/fontawesome-webfont.eot",
    "./docsAssets/fonts/fontawesome-webfont.svg",
    "./docsAssets/fonts/fontawesome-webfont.ttf",
    "./docsAssets/fonts/fontawesome-webfont.woff",
    "./docsAssets/fonts/fontawesome-webfont.woff2",
    './docsAssets/chillgirl.jpeg',
    './docsAssets/gates.jpg',
    './docsAssets/jjj.jpg',
    './docsAssets/cat.jpg'
  ],
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
