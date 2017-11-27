/* This script handles bootstrapping atlas as well as theming support. */
let dot = require("dot");
let fs = require("fs");
const codegenConf = require("./codegen.config.js");
const template = codegenConf.template;
const devTemplate = codegenConf.devTemplate;
const components = codegenConf.components;
const indexTemplate = codegenConf.indexTemplate;
const compIndexTemplate = codegenConf.compIndexTemplate;
const cwd = process.cwd();
const configPath = cwd + "/atlas.config.js";
const reactDocs = require("react-docgen");
const spawn = require("cross-spawn");
const path = require("path");
const prettier = require("prettier");
const options = {};

function rebuild(configurationPath) {
  console.log("configPath: ", __dirname + "/../webpack.config.js");
  let config = require(configurationPath);
  if (config.theme === "react-atlas-default-theme") {
    spawn.sync(
      __dirname + "/../node_modules/webpack/bin/webpack.js",
      ["--config", __dirname + "/../webpack.config.js"],
      {
        env: process.env,
        cwd: cwd,
        stdio: "inherit"
      }
    );
  } else {
    /* Rebuild react-atlas library, but pass the theme string to exclude
    from the rebuilding process. This allows react-atlas to rebuild with out
    having access to the theme.  */
    spawn.sync(
      __dirname + "/../node_modules/webpack/bin/webpack.js",
      [
        "--config",
        __dirname + "/../webpack.config.js",
        "--env.theme",
        config.theme
      ],
      {
        env: process.env,
        cwd: cwd,
        stdio: "inherit"
      }
    );
  }
}

/* Transforms extracted information from react-docgen into a form
  that can be consumed by the dot.js templating engine. */
function processInfo(info) {
  let array = Object.keys(info.props).map(function(key) {
    let obj = {};

    /* Skip empty objects. */
    if (typeof info.props[key].type === "undefined") {
      return obj;
    }

    let name = info.props[key].type.name;

    /* Check if the type is a union. */
    if (name === "union") {
      obj.type = '"' + key + '":' + " PropTypes.oneOfType([";

      for (let i = 0; i < info.props[key].type.value.length; i++) {
        let type = info.props[key].type.value[i];
        switch (type.name) {
          case "number":
            obj.type += "PropTypes.number,";
            break;
          case "string":
            obj.type += "PropTypes.string,";
            break;
          case "element":
            obj.type += "PropTypes.element,";
            break;
          case "array":
            obj.type += "PropTypes.array,";
            break;
          case "object":
            obj.type += "PropTypes.object,";
            break;
          case "shape":
            obj.type += "PropTypes.shape(" + JSON.stringify(type.value) + ")";
            break;
          /* If we get here it means were missing this proptype and it should
            have a case added to this switch statment. */
          default:
            console.log("Missing proptype: " + type.name);
            throw "Missing proptype: " + type.name;
        }
      }

      if (obj.type !== "shape") {
        obj.type += "])";
      }
    } else {
      obj.type = '"' + key + '":' + " " + "PropTypes." + name;
    }

    obj.required = info.props[key].required;
    obj.description = info.props[key].description;
    return obj;
  });

  return array;
}

function createComponent(name, theme) {
  let component = {};

  component = { name: name, theme: theme };

  /* Make sure leading letter is uppercase. */
  component.name = component.name[0].toUpperCase() + component.name.slice(1);

  /* Create component configPath. */
  let configurationPath =
    __dirname +
    "/../../react-atlas-core/src/" +
    component.name +
    "/" +
    component.name +
    ".js";

  /* Read the component source file. */
  let file = fs.readFileSync(configurationPath);

  /* Parse component source. */
  let info = reactDocs.parse(file.toString("ascii"));

  /* Transform info into a form that's easier for the
   * text templating engine to handle. */
  component.propTypes = processInfo(info);

  return component;
}

function getTemplate() {
  if (process.env.NODE_ENV === "production") {
    return template;
  } else {
    return devTemplate;
  }
}

function writeComponent(component) {
  let temp = getTemplate();

  /* Render component template. */
  let tempFn = dot.template(temp);
  let resultText = tempFn({ component: component });

  /* Use prettier to format code so it looks nicer to people. */
  let text = prettier.format(resultText, options);

  /* Try writting component to disk. */
  try {
    fs.writeFileSync(
      __dirname +
        "/components/" +
        component.name +
        "/" +
        component.name +
        ".js",
      text
    );
  } catch (err) {
    console.log("Failed generating modules file: ", err);
    return;
  }

  tempFn = dot.template(compIndexTemplate);
  resultText = tempFn({ component: component });
  text = prettier.format(resultText, options);

  try {
    fs.writeFileSync(
      __dirname + "/components/" + component.name + "/index.js",
      text
    );
  } catch (err) {
    console.log("Failed generating modules file: ", err);
    return;
  }

  console.log(
    path.resolve(
      "Generating: ",
      __dirname + "/components/" + component.name + "/" + component.name + ".js"
    )
  );
}

function writeIndexFile(comps) {
  let tempFn = dot.template(indexTemplate);
  let resultText = tempFn({ components: comps });
  let text = prettier.format(resultText, options);

  /* Try writting component to disk. */
  try {
    fs.writeFileSync(__dirname + "/components/index.js", text);
  } catch (err) {
    console.log("Failed generating modules file: ", err);
    return;
  }
}

function createComponentFromGlobalTheme(theme) {
  let comps = [];
  for (let i = 0; i < components.length; i++) {
    let component = createComponent(components[i], theme);

    comps.push(component);

    writeComponent(component);
  }

  console.log("Finished generating components");

  writeIndexFile(comps);

  return;
}

/* Read the config file, grab needed info and use the
 dotjs templating engine to output the index.js file for
 react-atlas. */
function createComponentsFromConfig() {
  let config = require(configPath);
  if (config.theme === "") {
    for (let i = 0; i < config.components.length; i++) {
      let component = createComponent(
        config.components[i].name,
        config.components[i].theme
      );
      writeComponent(component);
    }

    console.log("Finished generating components");

    return;
  }

  createComponentFromGlobalTheme(config.theme);
}

function deleteFolder(path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function(file, index) {
      let curPath = path + "/" + file;
      if (fs.lstatSync(curPath).isDirectory()) {
        // recurse
        deleteFolder(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
}

function createComponentDirectories() {
  const componentDirconfigPath = __dirname + "/components";
  const oldconfigPath = __dirname + "/../../react-atlas-core/src/";

  let component;

  if (fs.existsSync(componentDirconfigPath)) {
    deleteFolder(componentDirconfigPath);
  }

  fs.mkdirSync(componentDirconfigPath);
  for (let i = 0; i < components.length; i++) {
    component = components[i];

    /* Make sure leading letter is uppercase. */
    component = component[0].toUpperCase() + component.slice(1);
    fs.mkdir(componentDirconfigPath + "/" + component);
  }

  for (let i = 0; i < components.length; i++) {
    component = components[i];

    /* Make sure leading letter is uppercase. */
    component = component[0].toUpperCase() + component.slice(1);

    const readmePath = path.resolve(
      componentDirconfigPath + "/" + component + "/README.md"
    );

    if (fs.existsSync(oldconfigPath + component + "/README.md")) {
      if (fs.existsSync(readmePath)) {
        fs.unlinkSync(readmePath);
      }
      console.log(
        "Linking: %s -> %s",
        path.resolve(oldconfigPath + component + "/README.md"),
        readmePath
      );
      fs.linkSync(
        path.resolve(oldconfigPath + component + "/README.md"),
        readmePath
      );
    }
  }
}

/* Create generated component directory structure inside react-atlas/src. */
createComponentDirectories();

/* Check if a atlas config file exist or not. If the config file
  does exist generate components. */
if (fs.existsSync(configPath)) {
  createComponentsFromConfig(configPath);
} else {
  createComponentFromGlobalTheme("react-atlas-default-theme");
}

/* Check for command line arguments. */
if (process.argv.length >= 2) {
  if (typeof process.argv[2] === "undefined") {
    process.exit();
  }

  /* Someone is switching themes so let's rebuild react-atlas/packages/react-atlas. */
  if (process.argv[2] === "--switch") {
    rebuild(configPath);
  }
}
