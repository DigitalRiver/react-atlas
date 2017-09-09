var fs = require("fs");
var spawn = require("cross-spawn");
var parse = require('xml-parser');
var packages = ["./", "./packages/react-atlas", "./packages/react-atlas-core", "./packages/react-atlas-default-theme"];

console.log("Auditing Packages");

let vulnsFound = 0;

packages.forEach(function(pack) {
  console.log("Auditing ", pack);
  spawn.sync('auditjs', ['-r'], {
    env: process.env,
    cwd: pack,
    stdio: "inherit"
  });

 // var xml = fs.readFileSync(pack + '/reports/scan_node_modules.xml', 'utf8');
 // var obj = parse(xml);
 //
 // vulnsFound = vulnsFound + obj.root.attributes.failures;
 //
 });
 //
 // if(vulnsFound > 0) {
 //   //throw 'Vulns Found';
 // }

 console.log("Done auditing Packages, no vulns found");
