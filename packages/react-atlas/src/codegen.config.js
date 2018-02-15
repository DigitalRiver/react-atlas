let dot = require("dot");
let fs = require("fs"); // eslint-disable-line no-unused-vars
let eol = require("os").EOL;

/* Below are the templates used by react-atlas to generate files for themeing.
 * The templating library used by react-atlas is dot.js. More info about dot.js
 * can be found here: http://olado.github.io/doT/index.html . Dot.js was chosen
 * because it has no dependencies, is MIT licensed and works.
 *
 *
 * Dot.js templates are just strings of text. To print out a variable with dot.js
 * Use double curly brackets, followed by the variable name. You will need to put =it.
 * on the begining of the variable you pass dot.js. Then make sure to close the double
 * curly brackets. Here's an example using a variable called component:
 *
 * {{=it.component.name}}
 *
 * Here's a full example:
 *
 * let dot = require("dot");
 *
 * let component = { 'name': 'input'};
 * let template = "{{=it.component.name}}";
 *
 * let tempFn = dot.template(template);
 * let resultText = tempFn({ component: component });
 *
 * The variable resultText will contain the rendered component, so
 * you will have to use fs.writeFileSync() or something similar to
 * actually write the template to disk or somewhere else.
 *
 * The example above only evaluates a single variable, to render an array
 * you will have to change a few things. First use ~it. instead of =it. like
 * before. The ~ means evaluate an array, use {{~}} to tell dot.js to stop repeating
 * over. Here's an example of the template:
 *
 * "{{~it.components :value:index}}" +
 *  eol +
 * "export {{=value.name}} from './{{=value.name}}';" +
 *  eol +
 * "{{~}}";
 *
 */

/* The warning message appended to the top of every machine generated file.
 * This warning informs developers not to make changes to machine generated files
 * and to instead change the code generator. */
const warningMessage =
  "/* WARNING, THIS FILE WAS MACHINE GENERATED. DO NOT MODIFY THIS FILE DIRECTLY " +
  eol +
  "BECAUSE YOUR CHANGES WILL BE OVERWRITTEN WHEN THIS FILE IS GENERATED AGAIN. " +
  eol +
  "IF YOU WAN'T TO MODIFY THIS FILE YOU SHOULD BE MODIFYING THE GENERATOR IT'S SELF " +
  eol +
  "AND REGENERATE THIS FILE. */" +
  eol;

/* The template used for generating production react-atlas components. */
let template = warningMessage;
template +=
  "import CSSModules from 'react-css-modules';" +
  eol +
  "import { {{=it.component.name}}Core } from 'react-atlas-core';" +
  eol +
  "import { {{=it.component.name}}Style } from '{{=it.component.theme}}';" +
  eol +
  "const {{=it.component.name}} = CSSModules({{=it.component.name}}Core, {{=it.component.name}}Style, {allowMultiple: true});" +
  eol +
  "export default {{=it.component.name}}";

/* The template used to generate the development react-atlas components. The
 * development component is actually a wrapper around the "real" component
 * so that react-styleguidist can recognize the component and generate a docsite. */
let devTemplate = warningMessage;
devTemplate +=
  "import CSSModules from 'react-css-modules';" +
  eol +
  "import React from 'react';" +
  eol +
  "import PropTypes from 'prop-types';" +
  eol +
  "import { {{=it.component.name}}Core } from 'react-atlas-core/src';" +
  eol +
  "import { {{=it.component.name}}Style } from '{{=it.component.theme}}/src';" +
  eol +
  "const {{=it.component.name}}Comp = CSSModules({{=it.component.name}}Core, {{=it.component.name}}Style, {allowMultiple: true});" +
  eol +
  "export default class {{=it.component.name}} extends React.Component {" +
  eol +
  "constructor(props){" +
  eol +
  "super(props)" +
  eol +
  "}" +
  eol +
  "render() {" +
  eol +
  "return (" +
  eol +
  "<{{=it.component.name}}Comp {...this.props}></{{=it.component.name}}Comp>" +
  eol +
  ")" +
  eol +
  "}" +
  eol +
  "}" +
  eol +
  "{{=it.component.name}}.propTypes = {" +
  eol +
  "{{~it.component.propTypes :value:index}}" +
  eol +
  "/** {{=value.description}} */" +
  eol +
  "{{=value.type}}," +
  eol +
  "{{~}}" +
  eol +
  "};";

let indexTemplate = warningMessage;
indexTemplate +=
  "{{~it.components :value:index}}" +
  eol +
  "export {{{=value.name}}} from './{{=value.name}}';" +
  eol +
  "{{~}}" +
  eol;

let compIndexTemplate = warningMessage;
compIndexTemplate +=
  "export {{=it.component.name}} from './{{=it.component.name}}.js';";

/* Dot template settings. Keep defaults except turn off stripping newlines feature
 * of dot.js. */
dot.templateSettings = {
  evaluate: /\{\{([\s\S]+?)\}\}/g,
  interpolate: /\{\{=([\s\S]+?)\}\}/g,
  encode: /\{\{!([\s\S]+?)\}\}/g,
  use: /\{\{#([\s\S]+?)\}\}/g,
  define: /\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g,
  conditional: /\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g,
  iterate: /\{\{~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g,
  varname: "it",
  strip: false,
  append: true,
  selfcontained: false
};

/* TODO: Replace hardcoded array with a dynamic solution. */
let components = [
  "accordion",
  "alert",
  "avatar",
  "button",
  "card",
  "checkbox",
  "checkboxGroup",
  "datePicker",
  "dialog",
  "dropdown",
  "fileUpload",
  "form",
  "hint",
  "input",
  "modal",
  "panel",
  "progressBar",
  "radio",
  "radioGroup",
  "switch",
  "tab",
  "table",
  "tableHeader",
  "tabList",
  "tabPanel",
  "tabs",
  "task",
  "taskbar",
  "text",
  "textArea",
  "textField",
  "timer",
  "tooltip"
];

module.exports = {
  warningMessage: warningMessage,
  template: template,
  components: components,
  indexTemplate: indexTemplate,
  compIndexTemplate: compIndexTemplate,
  devTemplate: devTemplate
};
