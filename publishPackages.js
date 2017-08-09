var fs = require("fs");
var path = require("path");
var spawn = require("cross-spawn");
var glob = require("glob");

// get packages paths
var packages = glob.sync("./packages/react-atlas*", { realpath: true });

packages.push(packages.shift());

packages.forEach(function(pack) {
  spawn.sync('npm', ['publish', '--access', 'public'], {
    env: process.env,
    cwd: pack,
    stdio: "inherit"
  });
 });
