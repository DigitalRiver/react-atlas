var fs = require("fs");
var spawn = require("cross-spawn");
var path = require("path");
var packages = [path.join(__dirname, "../packages/react-atlas"), path.join(__dirname, "../packages/react-atlas-core"), path.join(__dirname, "../packages/react-atlas-default-theme"), path.join(__dirname, "../packages/light-table"), path.join(__dirname, "../")];

packages.forEach(function(pack) {
  spawn.sync('node-license-validator', ['--dir', pack, '--allow-licenses', 'ISC', 'MIT', 'BSD', 'BSD-3-Clause', 'BSD-2-Clause', 'WTFPL', 'BSD-like', 'MIT/X11', 'Public Domain', 'BSD-new', 'Artistic-2.0', 'Unlicense', ' CC0-1.0'], {
    env: process.env,
    cwd: pack,
    stdio: "inherit"
  });
 });
