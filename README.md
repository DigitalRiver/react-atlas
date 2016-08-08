# React Atlas
***This is an Alpha release and should be used with caution and hope.***

React Atlas is a React component library, with a focus on supplying Admin Interface tools. The end-goal of this repo to is to eventually be the library that can power most of Digital River's complex admin interfaces and internal tooling projects. With this in mind, we need a fast, generic, composable library that can be dropped into a project and 'just work'.

## Why?
React Atlas originally started off as a fork of [React Toolbox](https://github.com/react-toolbox/react-toolbox). We liked the hierarchy and the way the components were built among many other things. However, we didn't want to be married to the Material Design concept, and wanted to make a library that was a little more generic looking in regards to style and functionality. We hope that React Atlas will eventually be that tool.

## Requirements
This library only officially supports [Node 4.x.x](https://nodejs.org/en/) and React 15.0.2+, for now.
### Via NPM
Just make sure you reference the CSS file that is packaged with this library, something like:
```javascript
import './node_modules/react-atlas/lib/reactAtlas.min.css';
```
might work, depending on your app set up. Other than that, just import the components how you would normally.
### Forking/Cloning and Building Yourself
If you wish to use this project via a fork, and build/minifiy on your own, you will need to account for the following:

This project uses CSS Modules and CSS Next for styling. To process this we use PostCSS. ([Read why here](https://github.com/DigitalRiver/react-atlas/blob/master/wiki/Decisions.md#a-note-on-css)). At minimum your application will need to have the following packages to correctly interpret and use our library:
- [PostCSS](https://github.com/postcss/postcss), with the following plugins:
  - [PostCSS Import](https://github.com/postcss/postcss-import)
  - [CSS Next](https://github.com/cssnext/postcss-cssnext)
  - [Autoprefixer](https://github.com/postcss/autoprefixer)
- A way to interpret CSS Modules, could be any of the following depending on your environment:
  - [Webpack CSS Loader](https://github.com/webpack/css-loader)
  - [PostCSS Modules](https://github.com/outpunk/postcss-modules)
  - [Babel Plugin CSS Modules Transform](https://github.com/michalkvasnicak/babel-plugin-css-modules-transform)
  - [CSS Modules Require Hook](https://github.com/css-modules/css-modules-require-hook)
- ES6/JSX compiler. We recommend Babel and use the following Babel presets:
  - [es2015](https://babeljs.io/docs/plugins/preset-es2015/)
  - [react](http://babeljs.io/docs/plugins/preset-react/)
  - [stage-1](http://babeljs.io/docs/plugins/preset-stage-1/)

## Usage
***The React Atlas is in early alpha development, the API is still changing.***

For initial development and release, we are focusing on a nodejs with webpack environment. As we continue to develop React Atlas we might bring in examples and boilerplate repos to show it working with other build systems (JSPM, Browserify, UMD, etc.). Though our hope is that React Atlas will be generic enough, that it should be relatively simple to set up in most any environment.

With webpack in mind, we recommend using [Babel Loader](https://github.com/babel/babel-loader), and [CSS Loader](https://github.com/webpack/css-loader).

Once you've reference the React Atlas CSS file in your build process, requiring and using the components is as simple as:

```jsx
import React from 'react';
import { Button } from 'react-atlas';

const someButton = () => (
  <Button>Some Text</Button>
);

export default someButton;
```

The previous code creates a React button component based on a React Atlas button default styling and logic.

## CSS Customization

Internally for React Atlas development, we use CSS Modules. However, we compile down our CSS into 1 main CSS file that is namespaced similar to: ```.ra_filename_stylename```. This allows multiple options for anyone that wants to restyle a React Atlas component. You can simply overwrite the class with your own css file or you can feed the component inline styles via the ```style``` prop, or you can pass your own ```className``` prop.

We will be thinking hard about styling going forward and this workflow may change. We want to make overriding the React Atlas styles as simple as possible. We are in the process of implementing [React Themeable](https://github.com/markdalgleish/react-themeable).

## Local Docs

To start documentation site locally you'd need to install dependencies from the main package, setup the monorepo and then just run the docs script:

```
git clone git@github.digitalriverws.net:ux/react-atlas.git
npm install
npm run setup
npm run docs
```

Local documentation will be available at `http://localhost:3000`

## Authors and Contributors
Before cloning or submitting a Pull Request, ***please read our [Contributing Guidelines](https://github.com/DigitalRiver/react-atlas/blob/master/CONTRIBUTING.md)***

Please note that this project is released with a [Contributor Code of Conduct](https://github.com/DigitalRiver/react-atlas/blob/master/CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.

The project is being initially developed and maintained by the Digital River Experience Engineering team.

## [Read the Wiki](https://github.com/DigitalRiver/react-atlas/tree/master/wiki)
Check out [our wiki](https://github.com/DigitalRiver/react-atlas/tree/master/wiki) for more information on coding conventions, why we made certain decisions and a roadmap.

## Set-Up/Installation for Development and Contributing

### Pre-work for Windows Users (a.k.a. node-gyp stuff)
If running on windows, follow these steps to ensure you don't run into any 'node-gyp' issues:

[Install VC++ Build Tools Technical Preview](https://www.microsoft.com/en-us/download/confirmation.aspx?id=49983)

>:bulb: [Windows 7 only] requires [.NET Framework 4.5.1](http://www.microsoft.com/en-us/download/details.aspx?id=40773)

[Install Python 2.7](https://www.python.org/downloads/), and add it to your PATH, ```npm config set python python2.7```

Launch cmd, ```npm config set msvs_version 2015``` --global

## License 
This project is licensed under the terms of the [MIT license](https://github.com/DigitalRiver/react-atlas/blob/master/LICENSE).

## Atlas?
When thinking about Web Design and Web Development, we came across the art of map making - [Cartography](https://en.wikipedia.org/wiki/Cartography).

>Cartography (from Greek χάρτης khartēs, "map"; and γράφειν graphein, "write") is the study and practice of making maps. Combining science, aesthetics, and technique, cartography builds on the premise that reality can be modeled in ways that communicate spatial information effectively.

After reading about it more, we realized that as Web Designer and Developers, we are essentially modern-day map makers. We combine technology and design to build flat screens that communicate information in a fixed space. With this reasoning in our heads, we decided on Atlas. Atlas is defined as a collection (or a _library_ if you will) of maps. What better name for a library of components that will be used to compose and display complex interfaces/maps?

Plus you know, there's this cool Titan in Greek mythology that literally holds up the world named Atlas.
