var fs = require('fs');
var path = require('path');
var spawn = require('cross-spawn');
var glob = require('glob');

// get packages paths
var packages = glob.sync('./packages/react-atlas*/', {realpath: true});

packages.map(function(pack) {
// ensure path has package.json
            if (!fs.existsSync(path.join(pack, 'package.json'))) return;

// install folder
            spawn('npm', ['i'], {env: process.env, cwd: pack, stdio: 'inherit'})
});
