const spawn = require('cross-spawn');

const result = spawn.sync('npm', ['--publish', '--tag', 'next'], { stdio: 'inherit' });