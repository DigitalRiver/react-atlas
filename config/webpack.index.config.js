let path = require("path");
let webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

let config = {
  "entry": {
    "index": "./src/index.js"
  },
  "output": {
    "path": path.join(__dirname, "../lib"),
    "filename": "index.js",
    "libraryTarget": "umd"
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
        "test": /.js?$/,
        "loader": "babel-loader",
        "exclude": /node_modules/
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

if (process.env.NODE_ENV === "development") {
  config.devtool = "source-map";
}

if (process.env.NODE_ENV === "production") {
  config.module.rules.push({
    "test": /\.css$/,
    "loader": ExtractTextPlugin.extract({
      "fallback": "style-loader",
      "use": [
        {
          "loader": "css-loader",
          "query": {
            "modules": true,
            "importLoaders": 1,
            "localIdentName": "ra_[name]__[local]",
            "minimize": true
          }
        },
        {
          "loader": "postcss-loader",
          "options": {
            "config": {
              "path": "config/postcss.config.js"
            }
          }
        }
      ]
    })
  });
  config.plugins.push(new ExtractTextPlugin("atlasThemes.min.css"));
} else {
  config.module.rules.push({
    "test": /\.css$/,
    "loaders": [
      "style-loader?sourceMap",
      "css-loader?modules&importLoaders=1&localIdentName=ra_[name]__[local]",
      {
        "loader": "postcss-loader",
        "options": {
          "config": {
            "path": "config/postcss.config.js"
          }
        }
      }
    ]
  });
}


module.exports = config;
