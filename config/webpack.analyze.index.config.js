let config = require(__dirname + "/webpack.index.config.js");
let BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

config.plugins.push(new BundleAnalyzerPlugin());

module.exports = config;
