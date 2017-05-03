/* This script handles bootstrapping atlas as well as theming support. */
let dot = require('dot');
let fs = require('fs');
let eol = require('os').EOL;
const setupConf = require('./setup.config.js'); 
const warningMessage = setupConf.warningMessage;
const template = setupConf.template;
const components = setupConf.components;
const indexTemplate = setupConf.indexTemplate;
const compIndexTemplate = setupConf.compIndexTemplate;
const cwd = process.cwd();
const path = cwd + '/atlas.config.js';
const reactDocs = require('react-docgen');

/* Create generated component directory structure inside react-atlas/src. */
createComponentDirectories();

/* Check if a atlas config file exist or not. If the config file
  does exist create a new index file. */
if(fs.existsSync(path)) {
  createComponentsFromConfig(path);
} else {
  createComponentFromGlobalTheme("react-atlas-default-theme");
}

function processInfo(info) {
  let array = Object.keys(info.props).map(function (key) {
    let obj = {};

    /* Skip empty objects. */
    if(typeof info.props[key].type === 'undefined') {
      return obj;
    }

    let name = info.props[key].type.name;

    /* Check if the type is a union. */
    if(name === 'union') {

      obj.type = '"' + key + '":' + " PropTypes.oneOfType(["

      for(let i = 0; i < info.props[key].type.value.length; i++) {
        let type = info.props[key].type.value[i];
        switch(type.name) {
          case 'number':
            obj.type += "PropTypes.number,";
            break;
          case 'string':
            obj.type += "PropTypes.string,";
            break;
          case 'element':
            obj.type += "PropTypes.element,";
            break;

          default:
            console.log("type: ", type);
            break;
        }
      }

      obj.type += "])";
      
    } else {
      obj.type = '"' + key + '":' + ' ' + "PropTypes." + name;
    }

    obj.required = info.props[key].required;
    obj.description = info.props[key].description;
    return obj; 
  });

  return array;
}

function createComponent(name, theme) {
  let component = {};

  component = { 'name': name, 'theme': theme };

  /* Make sure leading letter is uppercase. */
  component.name = component.name[0].toUpperCase() + component.name.slice(1);

  /* Create component path. */
  let path = __dirname + '/../../react-atlas-core/src/' + component.name + '/' + component.name + '.js'

  /* Read the component source file. */
  let file = fs.readFileSync(path);

  /* Parse component source. */
  let info = reactDocs.parse(file.toString('ascii'));

  // console.log("info: ", info.props);

  component.propTypes = processInfo(info);

  return component;
}

function writeComponent(component) {
  /* Render component template. */
  let tempFn = dot.template(template);
  let resultText = tempFn({'component': component});

  /* Try writting component to disk. */
  try {
    fs.writeFileSync(__dirname + '/components/' + component.name + '/' + component.name + '.js', resultText);
  }
  catch(err) {
     console.log("Failed generating modules file: ", err);
    return;
  }

  tempFn = dot.template(compIndexTemplate);
  resultText = tempFn({'component': component});

  try {
    fs.writeFileSync(__dirname + '/components/' + component.name + '/index.js', resultText);
  }
  catch(err) {
    console.log("Failed generating modules file: ", err);
    return;
  }

  console.log('Generating: ', __dirname + '/components/' + component.name + '/' + component.name + '.js');
}

function createComponentFromGlobalTheme(theme) {
  let comps = [];
  for(let i = 0; i < components.length; i++) {

    let component = createComponent(components[i], theme);

    comps.push(component);

    writeComponent(component);
  }

  console.log("Finished generating modules file: ", __dirname + '/generatedModules.js');

  writeIndexFile(comps);

  return;
}

/* Read the config file, grab needed info and use the
 dotjs templating engine to output the index.js file for
 react-atlas. */
function createComponentFromConfig() {
  let config = require(path);
  if(config.theme === '') {
    for(let i = 0; i < config.components.length; i++) {
      let component = createComponent(config.components[i].name, config.components[i].theme);
      writeComponent(component);
    }

    console.log("Finished generating modules file: ", __dirname + '/generatedModules.js');

    return;
  }

  createComponentFromGlobalTheme(config.theme);
}

function createComponentDirectories() {
  const componentDirPath = __dirname + '/components';

  if(!fs.existsSync(componentDirPath)) {
    fs.mkdirSync(componentDirPath, 0777);
    for(let i = 0; i < components.length; i++) {
      let component = components[i];

      /* Make sure leading letter is uppercase. */
      component = component[0].toUpperCase() + component.slice(1);
      fs.mkdir(componentDirPath + '/' + component);
    }
  }
}

function writeIndexFile(comps) {
  let tempFn = dot.template(indexTemplate);
  let resultText = tempFn({'components': comps});

  /* Try writting component to disk. */
  try {
    fs.writeFileSync(__dirname + '/components/index.js', resultText);
  }
  catch(err) {
    console.log("Failed generating modules file: ", err);
    return;
  }
}

