var spawn = require("cross-spawn");
var path = require("path");

spawn.sync('lerna', ['clean', '--yes'], {
  env: process.env,
  stdio: "inherit"
});

spawn.sync('rimraf', [path.join(__dirname, "../node_modules")], {
  env: process.env,
  stdio: "inherit"
});
