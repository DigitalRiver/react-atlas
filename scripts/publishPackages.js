var fs = require("fs");
var spawn = require("cross-spawn");
var path = require("path");
var packages = [path.join(__dirname, "../packages/react-atlas"), path.join(__dirname, "../packages/react-atlas-core"), path.join(__dirname, "../packages/react-atlas-default-theme")];

packages.forEach(function(pack) {
  spawn.sync('npm', ['publish', '--access', 'public'], {
    env: process.env,
    cwd: pack,
    stdio: "inherit"
  });
 });
