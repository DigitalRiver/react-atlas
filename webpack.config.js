let path = require("path");
let webpack = require("webpack");

let config = {
  "entry": [path.join(__dirname, "./src/index.js")],
  "devtool": "source-map",
  "output": {
    "filename": "index.js",
    "path": path.join(__dirname, "lib"),
    "publicPath": "/lib/",
    "libraryTarget": "commonjs2"
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
          "postcss-loader"
        ]
      },
      {
        "test": /\.js$/,
        "exclude": /(node_modules|bower_components)/,
        "use": {
          "loader": "babel-loader",
          "options": {}
        }
      },
      {
        "test": /\.(ttf|eot|woff|woff2|otf|svg)$/,
        "loader": "url-loader"
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
