var Service = require('node-windows').Service;
// Create a new service object
var scriptPath = require('path').join(__dirname, 'node_modules','gulp','bin','gulp.js')

var svc = new Service({
  name:'React-Atlas',
  description: 'Node.js application',
  script: scriptPath,
  abortOnError:true,
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