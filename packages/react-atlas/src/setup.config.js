let dot = require('dot');
let eol = require('os').EOL;

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
  "evaluate":    /\{\{([\s\S]+?)\}\}/g,
  "interpolate": /\{\{=([\s\S]+?)\}\}/g,
  "encode":      /\{\{!([\s\S]+?)\}\}/g,
  "use":         /\{\{#([\s\S]+?)\}\}/g,
  "define":      /\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g,
  "conditional": /\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g,
  "iterate":     /\{\{~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g,
  "varname": 'it',
  "strip": false,
  "append": true,
  "selfcontained": false
};

/* TODO: Replace hardcoded array with a dynamic solution. */
let components = ['autocomplete', 'avatar', 'button', 'card', 'checkbox',
                 'dialog', 'drawer', 'dropdown', 'dropdownContent', 'dropdownList',
                 'dropdownListItem', 'dropdownTrigger', 'form', 'gridCol', 'gridRow',
                 'header', 'hint', 'input', 'list', 'listItem', 'listText',
                 'media', 'overlay', 'progressBar', 'radio', 'radioGroup', 'slider',
                 'snackbar', 'switch', 'tab', 'tabContent', 'table', 'tabs', 'tbody',
                 'td', 'tfoot', 'th', 'thead', 'tooltip', 'tr'];

module.exports = {
  "warningMessage": warningMessage,
  "template": template,
  "components": components
}