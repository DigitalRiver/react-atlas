var spawn = require("cross-spawn");

spawn.sync('lerna', ['clean', '--yes'], {
  env: process.env,
  stdio: "inherit"
});

spawn.sync('rimraf', ['./node_modules'], {
  env: process.env,
  stdio: "inherit"
});



