var Service = require('node-windows').Service;
// Create a new service object
var scriptPath = require('path').join(__dirname, './node_modules','react-component-styleguide','bin','rcs')
var projectDir = require('path').resolve(__dirname);
var svc = new Service({
  name:'React-Atlas',
  description: 'Documentation site for React-Atlas',
  script: scriptPath,
  parameters: './components/**/*.js -r /atlas -c ./docsConfig.js -d 3013 -v',
  cwd: projectDir,
  abortOnError: true,
  env: [{
    name: "HOME",
    value: process.env["USERPROFILE"] // service is now able to access the user who created its' home directory
  }, {
    name: "NODE_ENV",
    value: "development"
  }]
});
// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
	console.log('Service installed.');
	svc.start();
});
svc.install();
