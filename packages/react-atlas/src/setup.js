/* This file consumes an atlas.config.js file and generates an index.js for react-atlas. */
let dot = require('dot');
let fs = require('fs');
let eol = require('os').EOL;

const cwd = process.cwd();
const path = cwd + '/atlas.config.js';
const warningMessage = "/* WARNING, THIS FILE WAS MACHINE GENERATED. DO NOT MODIFY THIS FILE DIRECTLY " + eol +
                       "BECAUSE YOUR CHANGES WILL BE OVERWRITTEN WHEN THIS FILE IS GENERATED AGAIN. " + eol +
                       "IF YOU WAN'T TO MODIFY THIS FILE YOU SHOULD BE MODIFYING THE GENERATOR IT'S SELF " + eol +
                       "AND REGENERATE THIS FILE. */" + eol;

let template = warningMessage;
template += "import CSSModules from 'react-css-modules';" + eol + 
            "{{~it.dependencies :value:index}}" + eol +
            "import { {{=value.name}}Core } from 'react-atlas-core';" + eol + 
            "import { {{=value.name}}Style } from '{{=value.theme}}';" + eol +
            "export const {{=value.name}} = CSSModules({{=value.name}}Core, {{=value.name}}Style, {allowMultiple: true}); {{~}}" + eol;

dot.templateSettings = {
  evaluate:    /\{\{([\s\S]+?)\}\}/g,
  interpolate: /\{\{=([\s\S]+?)\}\}/g,
  encode:      /\{\{!([\s\S]+?)\}\}/g,
  use:         /\{\{#([\s\S]+?)\}\}/g,
  define:      /\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g,
  conditional: /\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g,
  iterate:     /\{\{~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g,
  varname: 'it',
  strip: false,
  append: true,
  selfcontained: false
};

/* TODO: Replace hardcoded array with a dynamic solution. */
let components = ['autocomplete', 'avatar', 'button', 'card', 'checkbox',
                 'dialog', 'drawer', 'dropdown', 'dropdownContent', 'dropdownList',
                 'dropdownListItem', 'dropdownTrigger', 'form', 'gridCol', 'gridRow',
                 'header', 'hint', 'input', 'list', 'listItem', 'listText',
                 'media', 'overlay', 'progressBar', 'radio', 'radioGroup', 'slider',
                 'snackbar', 'switch', 'tab', 'tabContent', 'table', 'tableHeaderColumn', 'tabs', 'tbody',
                 'td', 'tfoot', 'th', 'thead', 'tooltip', 'tr'];

/* Check if a atlas config file exist or not. If the config file
  does exist create a new index file. */
if(fs.existsSync(path)) {
  // getComponentArray(cwd + '/node_modules/react-atlas-core/');
  createIndexFromConfig(path);
} else {
  createIndexFromGlobalTheme("react-atlas-default-theme");
}

/* Get an array of components by looping through components in react-atlas-core.
  This will allow the user to not have to list every component inside of atlas.config.js. */
function getComponentArray(path) {
  fs.readlink(path, function(err, str) {
    console.log("str: ", str);
  });
  let array = fs.readdirSync(fs.readlinkSync(path));
  for(let i = 0; i < array.length - 1; i++) {
    console.log(array[i]);
  }
}

function createIndexFromGlobalTheme(theme) {
  let dependencies = [];
  for(let i = 0; i < components.length; i++) {
    let component = { 'name': components[i], 'theme': theme };

    /* Make sure leading letter is uppercase. */
    component.name = component.name[0].toUpperCase() + component.name.slice(1);
    dependencies.push(component);
  }

  let tempFn = dot.template(template);
  let resultText = tempFn({'dependencies': dependencies});
  try {
    fs.writeFileSync(__dirname + '/generatedModules.js', resultText);
  }
  catch(err) {
    console.log("Failed generating modules file: ", err);
    return;
  }

  console.log("Finished generating modules file: ", __dirname + '/generatedModules.js');
  return;
}

/* Read the config file, grab needed info and use the
 dotjs templating engine to output the index.js file for
 react-atlas. */
function createIndexFromConfig() {
  let config = require(path);
  let dependencies = [];
  if(config.theme === '') {
    for(let i = 0; i < config.components.length; i++) {
      dependencies.push(config.components[i]);
    }
    let tempFn = dot.template(template);
    let resultText = tempFn({'dependencies': dependencies});
    try {
      fs.writeFileSync(__dirname + '/generatedModules.js', resultText);
    }
    catch(err) {
      console.log("Failed generating modules file: ", err);
      return;
    }

    console.log("Finished generating modules file: ", __dirname + '/generatedModules.js');

    return;
  }

  createIndexFromGlobalTheme(config.theme);
}

