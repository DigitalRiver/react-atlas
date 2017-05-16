let dot = require('dot');
let fs = require('fs');
let eol = require('os').EOL;

const warningMessage = "/* WARNING, THIS FILE WAS MACHINE GENERATED. DO NOT MODIFY THIS FILE DIRECTLY " + eol +
                       "BECAUSE YOUR CHANGES WILL BE OVERWRITTEN WHEN THIS FILE IS GENERATED AGAIN. " + eol +
                       "IF YOU WAN'T TO MODIFY THIS FILE YOU SHOULD BE MODIFYING THE GENERATOR IT'S SELF " + eol +
                       "AND REGENERATE THIS FILE. */" + eol;

let template = warningMessage;
template += "import CSSModules from 'react-css-modules';" + eol +
            "import { {{=it.component.name}}Core } from 'react-atlas-core';" + eol + 
            "import { {{=it.component.name}}Style } from '{{=it.component.theme}}';" + eol +
            "export const {{=it.component.name}} = CSSModules({{=it.component.name}}Core, {{=it.component.name}}Style, {allowMultiple: true});"; 

let devTemplate = warningMessage;
devTemplate += "import CSSModules from 'react-css-modules';" + eol +
            "import React, { PropTypes } from 'react';" + eol +
            "import { {{=it.component.name}}Core } from 'react-atlas-core';" + eol + 
            "import { {{=it.component.name}}Style } from '{{=it.component.theme}}';" + eol +
            "const {{=it.component.name}}Comp = CSSModules({{=it.component.name}}Core, {{=it.component.name}}Style, {allowMultiple: true});" + eol +
            "export class {{=it.component.name}} extends React.Component {" + eol +
            "constructor(props){" + eol +
            "super(props)" + eol +
            "}" + eol +
            "render() {" + eol +
            "return (" + eol +
            "<{{=it.component.name}}Comp {...this.props}></{{=it.component.name}}Comp>" + eol +
            ")" + eol +
            "}" + eol + "}" + eol + 
            "{{=it.component.name}}.propTypes = {" + eol +
            "{{~it.component.propTypes :value:index}}" + eol +
            "/** {{=value.description}} */" + eol +
                "{{=value.type}}," + eol +
            "{{~}}" + eol +
            "};";
           
let indexTemplate = warningMessage;
indexTemplate += "{{~it.components :value:index}}" + eol +
                  "export {{=value.name}} from './{{=value.name}}';" + eol +
                  "{{~}}" + eol;

let compIndexTemplate = warningMessage;
compIndexTemplate += "export { {{=it.component.name}} as default } from './{{=it.component.name}}.js';";

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
                 'dialog', 'drawer', 'dropdown', 'form', 'gridCol', 'gridRow',
                 'header', 'hint', 'input', 'list', 'listItem', 'listText',
                 'media', 'overlay', 'progressBar', 'radio', 'radioGroup', 'slider',
                 'snackbar', 'switch', 'tab', 'tabContent', 'table', 'tabs', 'tbody',
                 'td', 'tfoot', 'th', 'thead', 'tooltip', 'tr'];

module.exports = {
  "warningMessage": warningMessage,
  "template": template,
  "components": components,
  "indexTemplate": indexTemplate,
  "compIndexTemplate": compIndexTemplate,
  "devTemplate": devTemplate
}