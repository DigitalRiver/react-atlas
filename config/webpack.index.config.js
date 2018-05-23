let path = require("path");
let webpack = require("webpack");
let glob = require("glob-all");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const PurifyCSSPlugin = require('purifycss-webpack');

let config = {
  "entry": {
    index: "./src/index.js"
  },
  "devtool": "source-map",
  "output": {
    path: path.join(__dirname, "../lib"),
	filename: "index.js",
    libraryTarget: "umd"
  },
  "externals": [
    {
      "react": {
        "root": "React",
        "commonjs2": "react",
        "commonjs": "react",
        "amd": "react"
      }
    },
    {
      "react-dom": {
        "root": "ReactDOM",
        "commonjs2": "react-dom",
        "commonjs": "react-dom",
        "amd": "react-dom"
      }
    }
  ],
  "module": {
    "rules": [
      {
        "test": /\.css$/,
        "loaders": [
          "style-loader?sourceMap",
          "css-loader?modules&importLoaders=1&localIdentName=ra_[name]__[local]",
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: 'config/postcss.config.js'
              }
            }
          }
        ]
      },
      {
        test: /.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          "presets": [
            "react", "env"
          ],
          "plugins": ["transform-class-properties", "transform-object-rest-spread"]
        }
      }
    ]
  },
  "plugins": [
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify(process.env.NODE_ENV)
      }
    })
  ]
};

module.exports = config;
