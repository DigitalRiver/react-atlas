var fs = require("fs");
var path = require("path");
var spawn = require("cross-spawn");
var glob = require("glob");
var path = require("path");

// get packages paths
var packages = glob.sync(path.join(__dirname, "../packages/react-atlas*/"), { realpath: true });

packages.push(packages.shift());

packages.forEach(function(pack) {
  // ensure path has package.json
  if(!fs.existsSync(path.join(pack, "package.json"))) return;

  if(process.env.NODE_ENV === 'production') {
  	spawn.sync(pack + '/node_modules/webpack/bin/webpack.js', ['-p'], {
      env: process.env,
      cwd: pack,
      stdio: "inherit"
    });
  } else {
    spawn.sync(pack + '/node_modules/webpack/bin/webpack.js', {
      env: process.env,
      cwd: pack,
      stdio: "inherit"
    });
  }
 });

 /* If we are building for production move the stylesheet from react-atlas-default-theme/lib to react-atlas/lib */
 if(process.env.NODE_ENV === 'production') {
   var oldPath = path.join(__dirname, "../packages/react-atlas-default-theme/lib/atlasThemes.min.css");
   var newPath = path.join(__dirname, "../packages/react-atlas/lib/atlasThemes.min.css")
   fs.renameSync(oldPath, newPath);
 }
