const path = require("path");
const cssnext = require("postcss-cssnext");
const postcssImport = require("postcss-import");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  title: "React Atlas Docs",
  babelConfig: {
    presets: ["es2015", "react", "stage-1"]
  },
  files: [
    "./docsAssets/font-awesome.min.css",
    "./docsAssets/fonts/FontAwesome.otf",
    "./docsAssets/fonts/fontawesome-webfont.eot",
    "./docsAssets/fonts/fontawesome-webfont.svg",
    "./docsAssets/fonts/fontawesome-webfont.ttf",
    "./docsAssets/fonts/fontawesome-webfont.woff",
    "./docsAssets/fonts/fontawesome-webfont.woff2",
    "./docsAssets/chillgirl.jpeg",
    "./docsAssets/gates.jpg",
    "./docsAssets/jjj.jpg",
    "./docsAssets/cat.jpg",
    "./docsAssets/nature.jpg",
    "atlasStyles.css"
  ],
  webpackConfig: {
    module: {
      loaders: [
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract(
            "style",
            "css?sourceMap&modules&importLoaders=1&localIdentName=ra_[name]__[local]!postcss"
            )
        },
          { test: /\.less$/,
              loader: ExtractTextPlugin.extract('style', `css!less`) },
          { test: /\.eot$|\.ttf$|\.svg$|\.woff2?$/, loader: 'file?name=[name].[ext]' },
          { test: /\.jpe?g$|\.gif$|\.png|\.ico$/, loader: 'file?name=[name].[ext]' }
      ]
    },
    plugins: [
      new ExtractTextPlugin("atlasStyles.css", {
        allChunks: true
      })
    ],
    alias: {
      react: path.join(__dirname, "node_modules", "react")
    },
    postcss: function(bundler) {
      return [
        postcssImport({
          addDependencyTo: bundler
        }),
        cssnext
      ];
    }
  }
};
