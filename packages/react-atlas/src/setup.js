/* This file consumes an atlas.config.js file and generates an index.js for react-atlas. */
var dot = require('dot');
var fs = require('fs');

const cwd = process.cwd();
const path = cwd + '/atlas.config.js';
const template = "import CSSModules from 'react-css-modules'; {{~it.dependencies :value:index}} import { {{=value.name}}Core } from 'react-atlas-core'; import { {{=value.name}}Style } from '{{=value.theme}}';  export const {{=value.name}} = CSSModules({{=value.name}}Core, {{=value.name}}Style, {allowMultiple: true}); {{~}}";

/* TODO: Replace hardcoded array with a dynamic solution. */
var components = ['autocomplete', 'avatar', 'button', 'card', 'checkbox',
                 'dialog', 'drawer', 'dropdown', 'dropdownContent', 'dropdownList',
                 'dropdownListItem', 'dropdownTrigger', 'form', 'gridCol', 'gridRow',
                 'header', 'hint', 'input', 'list', 'listItem', 'listText',
                 'media', 'overlay', 'progressBar', 'radio', 'radioGroup', 'slider',
                 'snackbar', 'switch', 'tab', 'tabContent', 'table', 'tabs', 'tbody',
                 'td', 'tfoot', 'th', 'thead', 'tooltip', 'tr'];

/* Check if a atlas config file exist or not. If the config file
  does exist create a new index file. */
if(fs.existsSync(path)) {
  // getComponentArray(cwd + '/node_modules/react-atlas-core/');
  createIndexFromConfig(path);
}

/* Get an array of components by looping through components in react-atlas-core.
  This will allow the user to not have to list every component inside of atlas.config.js. */
function getComponentArray(path) {
  fs.readlink(path, function(err, str) {
    console.log("str: ", str);
  });
  var array = fs.readdirSync(fs.readlinkSync(path));
  for(var i = 0; i < array.length - 1; i++) {
    console.log(array[i]);
  }
}

function createIndexFromGlobalTheme(theme) {
  var dependencies = [];
  for(var i = 0; i < components.length; i++) {
    var component = { 'name': components[i], 'theme': theme };

    /* Make sure leading letter is uppercase. */
    component.name = component.name[0].toUpperCase() + component.name.slice(1);
    dependencies.push(component);
  }

  var tempFn = dot.template(template);
  var resultText = tempFn({'dependencies': dependencies});
  fs.writeFileSync(__dirname + '/index.js', resultText);
  return;
}

/* Read the config file, grab needed info and use the
 dotjs templating engine to output the index.js file for
 react-atlas. */
function createIndexFromConfig() {
  var config = require(path);
  var dependencies = [];
  if(config.theme === '') {
  	for(var i = 0; i < config.components.length; i++) {
  	  dependencies.push(config.components[i]);
  	}
  	var tempFn = dot.template(template);
  	var resultText = tempFn({'dependencies': dependencies});
  	fs.writeFileSync(__dirname + '/index.js', resultText);
  	return;
  }

  createIndexFromGlobalTheme(config.theme);
}

console.log("Done: ", __dirname + '/index.js');
