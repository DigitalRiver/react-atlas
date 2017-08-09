var fs = require("fs");
var spawn = require("cross-spawn");
var packages = ["./packages/react-atlas", "./packages/react-atlas-core", "./packages/react-atlas-default-theme"];

packages.forEach(function(pack) {
  spawn.sync('npm', ['publish', '--access', 'public'], {
    env: process.env,
    cwd: pack,
    stdio: "inherit"
  });
 });
