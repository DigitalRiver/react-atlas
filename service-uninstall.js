var Service = require('node-windows').Service;

var scriptPath = require('path').join(__dirname, 'node_modules','gulp','bin','gulp.js')
// Create a new service object
var svc = new Service({
  name:'React-Atlas',
  script: scriptPath
});

 // Listen for the "uninstall" event so we know when it's done.
 svc.on('uninstall',function(){
   console.log('Uninstall complete.');
   console.log('The service exists: ',svc.exists);
 });

 // Uninstall the service.
 svc.uninstall();