const spawn = require('cross-spawn');
spawn.sync('npm', ['--publish', '--tag', 'next'], { stdio: 'inherit' });