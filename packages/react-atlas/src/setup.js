const dot = require('dot');
const fs = require('fs');
const spawn = require("cross-spawn");
const setupConf = require('./setup.config.js'); 
const warningMessage = setupConf.warningMessage;
const template = setupConf.template;
const components = setupConf.components;

/* Set variables and constants used through out this file.  */
const cwd = process.cwd();
const path = cwd + '/atlas.config.js';
const outputFileName = 'generatedModules.js'
let outputFilePath = __dirname;
outputFilePath += '/' + outputFileName;

/* Check if a atlas config file exist or not. If the config file
  does exist create a new output file. */
if(fs.existsSync(path)) {
  createOutputFromConfig(path);
  let config = require(path);
  if(config.theme === 'react-atlas-default-theme') {
    spawn.sync('./node_modules/webpack/bin/webpack.js', ['--config', __dirname + '/../webpack.config.js'], {
      "env": process.env,
      "cwd": cwd,
      "stdio": "inherit"
    });
  } else {
    /* Rebuild react-atlas library, but pass the theme string to exclude
      from the rebuilding process. This allows react-atlas to rebuild with out
      having access to the theme.  */
    spawn.sync('./node_modules/webpack/bin/webpack.js', ['--config', __dirname + '/../webpack.config.js', '--env.external', config.theme], {
      "env": process.env,
      "cwd": cwd,
      "stdio": "inherit"
    });
  }
} else if(fs.existsSync(outputFilePath)) {
  console.log("No atlas.config.js found, try passing --config /path/to/config");
  return;
} else {
  /* No atlas config or generated output file so,
     generate one with the default theme. */
  createOutputFromGlobalTheme("react-atlas-default-theme");
}

/* Creates a generatedModules file where all components share a theme. */
function createOutputFromGlobalTheme(theme) {
  let dependencies = [];
  for(let i = 0; i < components.length; i++) {
    let component = { 'name': components[i], 'theme': theme };

    /* Make sure leading letter of the Component name is uppercase. */
    component.name = component.name[0].toUpperCase() + component.name.slice(1);
    dependencies.push(component);
  }

  let tempFn = dot.template(template);
  let resultText = tempFn({'dependencies': dependencies});
  fs.writeFileSync(outputFilePath, resultText);
  return;
}

/* Read the config file, grab needed info and use the
 dotjs templating engine to output the index.js file for
 react-atlas. */
function createOutputFromConfig() {
  let config = require(path);
  let dependencies = [];
  if(config.theme === '') {
    for(let i = 0; i < config.components.length; i++) {
      dependencies.push(config.components[i]);
    }
    let tempFn = dot.template(template);
    let resultText = tempFn({'dependencies': dependencies});
    fs.writeFileSync(outputFilePath, resultText);
    return;
  }

  createOutputFromGlobalTheme(config.theme);
}