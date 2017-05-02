# ![React-Atlas](https://github.com/DigitalRiver/react-atlas/blob/master/readme/images/logo_full_300.png)
***This is an Alpha release and should be used with caution and hope.***

React Atlas is a React component library, with a focus on supplying Admin Interface tools. The end-goal of this repo to is to eventually be the library that can power most of Digital River's complex admin interfaces and internal tooling projects. With this in mind, we need a fast, generic, composable library that can be dropped into a project and 'just work'.

Check out our [docs site](http://digitalriver.github.io/react-atlas/) for full working examples and a code playground.

## Why?
React Atlas originally started off as a fork of [React Toolbox](https://github.com/react-toolbox/react-toolbox), which allowed us to have a quick list of components. However, the more we dug into the code and tried to use the library, the more we ended up changing. Today, almost everything in React-Atlas is custom. React-Atlas now offers ...
- Coded using ECMAScript 2015 patterns and features
- Styled using [CSS Modules](https://github.com/css-modules/css-modules) and [CSSNext](http://cssnext.io/)
- Decoupled styles and logic for optimized themeing
- Themeing is completed at compile time, not at runtime, to reduce library size and memory usage
- Tested with [Jest](https://facebook.github.io/jest/), [Enzyme](https://github.com/airbnb/enzyme), and [Chai](http://chaijs.com/)
- Bundled with [Webpack 2.0](https://webpack.js.org/)
- Formatted with [Prettier](https://github.com/prettier/prettier)
- Component styleguide to ensure code consistency throughout the library
- Encapsulated component state within each component, instead of requiring the user to maintain state in their own application

## Requirements
This library only officially supports [Node 4.x.x](https://nodejs.org/en/) and React 15.0.2+, for now.

## Usage/Installation
`git clone https://github.com/DigitalRiver/react-atlas`

`cd react-atlas`

`npm install`

`npm run bootstrap`

### In an application
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

### Via NPM
Just make sure you reference the CSS file that is packaged with this library, something like:
```javascript
import './node_modules/react-atlas/lib/reactAtlas.min.css';
```
might work, depending on your app set up. Other than that, just import the components how you would normally.

### Themeing
Internally for React Atlas development, we use CSS Modules. However, for production we compile down our CSS into 1 main CSS file that is namespaced similar to: ```.ra_filename_stylename```. This allows multiple options for anyone that wants to restyle a React Atlas component. You can simply overwrite the class with your own css file or you can feed the component inline styles via the ```style``` prop, or you can pass your own ```className``` prop.

## Development
### Forking/Cloning and Building Yourself
If you wish to use this project via a fork, and build/minifiy on your own, you will need to account for the following:

This project uses CSS Modules and CSS Next for styling. To process this we use PostCSS. ([Read why here](https://github.com/DigitalRiver/react-atlas/blob/master/readme/Decisions.md#a-note-on-css)). At minimum your application will need to have the following packages to correctly interpret and use our library:
- [PostCSS](https://github.com/postcss/postcss), with the following plugins:
  - [PostCSS Import](https://github.com/postcss/postcss-import)
  - [CSS Next](https://github.com/cssnext/postcss-cssnext)
- A way to interpret CSS Modules, could be any of the following depending on your environment:
  - [Webpack CSS Loader](https://github.com/webpack/css-loader)
  - [PostCSS Modules](https://github.com/outpunk/postcss-modules)
  - [Babel Plugin CSS Modules Transform](https://github.com/michalkvasnicak/babel-plugin-css-modules-transform)
- ES6/JSX compiler. We recommend Babel and use the following Babel presets:
  - [es2015](https://babeljs.io/docs/plugins/preset-es2015/)
  - [react](http://babeljs.io/docs/plugins/preset-react/)
  - [stage-1](http://babeljs.io/docs/plugins/preset-stage-1/)

  ### Setup

  ### Docs
  To start documentation site locally you'd need to install dependencies from the main package, setup the monorepo and then just run the docs script:

```
git clone https://github.com/DigitalRiver/react-atlas.git
npm install
npm run setup
npm run docs
```

Local documentation will be available at `http://localhost:3000`

  ### Monorepo
React-Atlas is a [monorepo](https://medium.com/@bebraw/the-case-for-monorepos-907c1361708a#.lflmhsuzq) which is being handled with the [lerna](https://github.com/lerna/lerna) package.  Lerna was developed in order to support [Babel's](https://github.com/babel/babel/tree/master/packages) monorepo approach.  It is basically a command line tool that handles some tricky operations by connecting modules together and running commands against multiple modules.  All of the different packages can be found under the [packages](https://github.com/DigitalRiver/react-atlas/tree/master/packages) folder.

**lerna bootstrap:** probably the most important command of the set, this links all modules in a monorepo together. This way, you can immediately test whether a change will break code that relies on a module.

**lerna run test:** a way to run unit tests across many modules in one command, and to make tests fail if a module fails.

**lerna publish:** a wrapper around npm publish that can publish multiple repositories at a time and is smart enough to only publish changed code.

**Pros:**

- Single lint, build, test and release process.
- Easy to coordinate changes across modules.
- Single place to report issues.
- Easier to setup a development environment.
- Tests across modules are ran together which finds bugs that touch multiple modules easier.
- Continous integration testing is easier, since all tests run on all commits
- Licensing information and documentation is all done in the same place as well.

**Cons:**

- Codebase looks more intimidating.
- Repo is bigger in size.
- Publishing who has access to publish changes to `React-atlas` is hacky and msut be controled via [npm orgianizations](https://docs.npmjs.com/orgs/what-are-orgs)
- Lower ranking in npms results. At least until npms-io/npms-analyzer#83 is fixed.

## [Read the Wiki](https://github.com/DigitalRiver/react-atlas/tree/master/wiki)
Check out [our wiki](https://github.com/DigitalRiver/react-atlas/tree/master/wiki) for more information on coding conventions, why we made certain decisions and a roadmap.

## Authors and Contributors
Before cloning or submitting a Pull Request, ***please read our [Contributing Guidelines](https://github.com/DigitalRiver/react-atlas/blob/master/readme/CONTRIBUTING.md)***

Please note that this project is released with a [Contributor Code of Conduct](https://github.com/DigitalRiver/react-atlas/blob/master/readme/CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.

The project is being initially developed and maintained by the Digital River Experience Engineering team.

## Set-Up/Installation for Development and Contributing


## License
This project is licensed under the terms of the [MIT license](https://github.com/DigitalRiver/react-atlas/blob/master/LICENSE).

## Atlas?
When thinking about Web Design and Web Development, we came across the art of map making - [Cartography](https://en.wikipedia.org/wiki/Cartography).

>Cartography (from Greek χάρτης khartēs, "map"; and γράφειν graphein, "write") is the study and practice of making maps. Combining science, aesthetics, and technique, cartography builds on the premise that reality can be modeled in ways that communicate spatial information effectively.

After reading about it more, we realized that as Web Designer and Developers, we are essentially modern-day map makers. We combine technology and design to build flat screens that communicate information in a fixed space. With this reasoning in our heads, we decided on Atlas. Atlas is defined as a collection (or a _library_ if you will) of maps. What better name for a library of components that will be used to compose and display complex interfaces/maps?

Plus you know, there's this cool Titan in Greek mythology that literally holds up the world named Atlas.
