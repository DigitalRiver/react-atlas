# ![React-Atlas](https://github.com/DigitalRiver/react-atlas/blob/master/readme/images/logo_full_300.png)

React Atlas is a React component library, with a focus on supplying Admin Interface tools. The end-goal of this repo to is to eventually be the library that can power most of Digital River's complex admin interfaces and internal tooling projects. With this in mind, we need a fast, generic, composable library that can be dropped into a project and 'just work'.

Check out our [docs site](http://digitalriver.github.io/react-atlas/) for full working examples and a code playground.

## Why?
React Atlas originally started off as a fork of [React Toolbox](https://github.com/react-toolbox/react-toolbox), which allowed us to have a quick list of components. However, the more we dug into the code and tried to use the library, the more we ended up changing. Today, almost everything in React-Atlas is custom. React-Atlas now offers ...
- Coded using ECMAScript 2015 patterns and features
- Styled using [CSS Modules](https://github.com/css-modules/css-modules) and [CSSNext](http://cssnext.io/)
- Decoupled styles and logic for optimized themeing
- Themeing is completed at compile time, not at runtime, to reduce library size and memory usage
- Tested with [Jest](https://facebook.github.io/jest/), [Enzyme](https://github.com/airbnb/enzyme) and [Sinon](http://sinonjs.org/)
- Bundled with [Webpack 2.0](https://webpack.js.org/)
- Linted with [Eslint](http://eslint.org/)
- Formatted with [Prettier](https://github.com/prettier/prettier)
- Component styleguide to ensure code consistency throughout the library
- Encapsulated component state within each component, instead of requiring the user to maintain state in their own application

## License
This project is licensed under the terms of the [MIT license](https://github.com/DigitalRiver/react-atlas/blob/master/LICENSE).

## Requirements
This library only officially supports [Node 6.x.x+](https://nodejs.org/en/) and [React 15.x.x+](https://facebook.github.io/react/), on Windows, MacOS, Linux and FreeBSD.

## Installation
React Atlas can be installed as an [npm package](https://www.npmjs.com/package/react-atlas):
```bash
$ npm install --save react-atlas
```
### Usage

Now make sure to either import the react atlas stylesheet into your application.
```javascript
import './node_modules/react-atlas/lib/atlasThemes.min.css';
```
Or include the stylesheet with a link tag in your index.html.
```html
<link rel="stylesheet" type="text/css" href="node_modules/react-atlas/lib/atlasThemes.min.css">
```  
After referencing the stylesheet, import atlas components like you would any other component.

```javascript
import React from 'react';
import { Button } from 'react-atlas';

const someButton = () => (
  <Button>Some Text</Button>
);

export default someButton;
```

The previous code creates a React button component based on a React Atlas button default styling and logic.

### Themeing
There are several ways to style/theme react-atlas components.
- [Style individual component instance.](readme/themeing.md#Instance)
- [Creating themes.](readme/themeing.md#Create)
- [Themeing whole library.](readme/themeing.md#Themeing)
- [Themeing components.](readme/themeing.md#Components)

### Docs
To start documentation site locally you'd need to install dependencies from the main package, setup the monorepo and then just run the docs script.
`npm run docsPrd` runs the production version of the docsite and will not hotload

```bash
$ git clone https://github.com/DigitalRiver/react-atlas.git
$ npm install
$ npm run build
$ npm run docs:prd
```
## Development and Contributing
To setup atlas for development, run the following commands:

```bash
$ git clone https://github.com/DigitalRiver/react-atlas.git
$ npm install
$ npm run build
$ npm run docs:dev
```

## Publishing to your own github page
To publish your own build of react-atlas to your own fork, run the following commands:

```bash
$ npm run docs:build
$ npm run gh-pages:publish
```

There are other npm commands which may be of use in your development.
```bash

$ npm run test            // Runs test suite without coverage.
$ npm run coverage        // Runs test suite with code coverage.
$ npm run format          // Format all code with prettier.
$ npm run lint            // Lint code with eslint.
$ npm run setup           // Builds react-atlas.
$ npm run codegen         // Runs just the code generator.
$ npm run clean           // Clean all node_modules folders.

```
For more in depth information on development check out our contributors [readme](readme/CONTRIBUTING.md#contributing).

## Authors and Contributors
Before cloning or submitting a Pull Request, ***please read our [Contributing Guidelines](https://github.com/DigitalRiver/react-atlas/blob/master/readme/CONTRIBUTING.md)***

Please note that this project is released with a [Contributor Code of Conduct](https://github.com/DigitalRiver/react-atlas/blob/master/readme/CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.

The project is being initially developed and maintained by the Digital River Experience Engineering team.


## Atlas?
When thinking about Web Design and Web Development, we came across the art of map making - [Cartography](https://en.wikipedia.org/wiki/Cartography).

>Cartography (from Greek χάρτης khartēs, "map"; and γράφειν graphein, "write") is the study and practice of making maps. Combining science, aesthetics, and technique, cartography builds on the premise that reality can be modeled in ways that communicate spatial information effectively.

After reading about it more, we realized that as Web Designer and Developers, we are essentially modern-day map makers. We combine technology and design to build flat screens that communicate information in a fixed space. With this reasoning in our heads, we decided on Atlas. Atlas is defined as a collection (or a _library_ if you will) of maps. What better name for a library of components that will be used to compose and display complex interfaces/maps?

Plus you know, there's this cool Titan in Greek mythology that literally holds up the world named Atlas.
