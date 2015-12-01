# React Atlas
React Atlas is a React component library, with a focus on supplying Admin Interface tools. The goal of this repo to is to eventually be the library that can power most of Digital River's complex admin interfaces. With this in mind, we need a fast, generic, composable library that can be dropped into a project and 'just work'.

## Why?
React Atlas originally started off as a fork of [React Toolbox](https://github.com/react-toolbox/react-toolbox). We liked the hierarchy and the way the components were built. However, we didn't want to be married to the Material Design concept, and wanted to make a library that was a little more generic. We hope that React Atlas will be that tool.

## Usage

For inital development and release, we are focusing on a nodejs with webpack environment. As we continue to develop React Atlas we will bring in examples and boilerplates to show it working with other build systems (JSPM, Browserify, UMD, etc.).

With webpack in mind, we reccomend using [Babel Loader](https://github.com/babel/babel-loader), [CSS Loader](https://github.com/webpack/css-loader) and [SASS Loader](https://github.com/jtangelder/sass-loader) (for now, SASS will be removed from this project soon. We are working toward dropping the Sass and Webpack dependency as soon as it makes sense for us internally. A good starting point is for a webpack workflow is [React Hot Webpack Boilerplate](https://github.com/gaearon/react-hot-boilerplate).

Requiring and using the components is as simple as:

```jsx
import React from 'react';
import {Button} from 'react-atlas';

const someButton = () => (
  <Button label="Some Text" />
);

export default someButton;
```

The previous code creates a React button component based on a React Atlas button. It's important to notice that requiring a module from the exposed root of the package will import the **SASS** of the component. We are working to change this as soon as possible, and hope to get away from SASS to help enable this library to be environment agnostic.

## Customization

Since React Atlas styles are written in CSS it's pretty easy to customize your components:

### Via `className` property

Generally each component will have a `className` prop so you can tell the class name you want to keep in the root node of the resulting markup. All markup is style with the lowest specificity level so you can just nest one level in your CSS and the result will be applied. Consider this example:

```jsx
const CustomButton = () => (
  <Button className='customized' label='Custom button' />
);
```

If you browse the resulting markup you will see *data attributes* like `data-role="label"` so you can avoid styling directly tag names. You can now write your CSS:

```css
.customized > [data-role="label"] {
  color: green;
  font-weight: bold;
}
```

We will be thinking hard about styling going forward and this workflow may change. We want to make overriding the React Atlas styles as simple as possible. Something like [React Themeable](https://github.com/markdalgleish/react-themeable) may be used.

## Local Docs

To work in the project you'd need a `node` version supporting ES6 syntax. Although the project is built using Babel we use some ES6 features in the development server. Also, the packages has been tested with `node 4.2.1`. Consider using [nvm](https://github.com/creationix/nvm) or [n](https://github.com/tj/n) to handle different node versions!

To start documentation site locally you'd need to install dependencies from the main package and also dependencies from the docs subproject:

```
git clone https://github.com/react-toolbox/react-toolbox.git
npm install
cd docs/
npm install 
npm start
```

Local documentation will be available at http://localhost:8081/

## Authors and Contributors

The project is being initially developed and maintained by the DR UX team.

If you are interested in contributing to the project, please read our [Contributing Guidelines](https://github.digitalriverws.net/ux/react-atlas/blob/master/CONTRIBUTING.md)

This project is developed on Node 4.2.2+. Look into using [nvm-windows](https://github.com/coreybutler/nvm-windows) or [n](https://github.com/tj/n) to handle different node versions.

## Set-Up/Installation for Development

### Windows Users
If running on windows, Follow these steps to ensure you don't run into any 'node-gyp' issues:

[Install VC++ Build Tools Technical Preview](https://www.microsoft.com/en-us/download/details.aspx?id=49512)

>:bulb: [Windows 7 only] requires [.NET Framework 4.5.1](http://www.microsoft.com/en-us/download/details.aspx?id=40773)

[Install Python 2.7](https://www.python.org/downloads/), and add it to your PATH, ```npm config set python python2.7```

Launch cmd, ```npm config set msvs_version 2015``` --global 

### Clone and Start Spec/Style Guide Page
The following commands will clone the repo down, install npm dependencies and start the specs/style guide page.
```
git clone git@github.digitalriverws.net:ux/react-atlas.git
cd react-atlas
npm install
cd docs/
npm install 
cd ..
npm run start
```
Spec page will be at ```localhost:3001```
### A Note on CSS
While the original project that React Altas was forked from used SASS for it's css, we are trying our best to eventually remove that dependency. SASS is great, but there are a few reasons behind this move:
  - Being a superset of CSS, SASS effectively becomes it's own Domain Specific Language(DSL) with it's own quirks and syntax to learn. Effectively, SASS is to CSS what CoffeeScript is to Javascipt. Not a bad thing, it has it's benefits for sure. But since this is a library, we want to be as generic and close to spec as possible.
  - The CSS Spec is ever evolving and now includes native [CSS variables](http://www.w3.org/TR/css-variables/) among many other great improvements.
  - [PostCSS](https://github.com/postcss/postcss) and [CSSNext](http://cssnext.io/) allow us to have much of the same functionality that SASS provides, but allows use to write in the 'future' of the actual CSS spec. This means the styles we implement, while still using a preprocessor in the form of PostCSS, are no longer part of a DSL, but rather they are actual in-spec CSS. PostCSS/CSSNext is to CSS what Babel is to Javascript.

### What the hell is this 'composes' stuff in CSS?
That is [CSS Modules](https://github.com/css-modules/css-modules).

Okay, so we just talked about why we want to get away from DSLs in our CSS, and then we say that we're using a kind of DSL anyways. We get it. But hear us out.

First, the API surface area of CSS Modules is extremely small. In regards to CSS syntax, it adds only 'composes'. Everything else it does is behind the scenes. The primary focus of CSS Modules is to allow locally scoped CSS. This is a big deal and helps solve a lot of problems inherit in regular Globally Scoped CSS. This is an important aspect of the library, and if you wish to contribute, it will be very beneficial for you to read the following articles on CSS Modules to help wrap your head around why it is so awesome:
 - [The End of Global CSS](https://medium.com/seek-ui-engineering/the-end-of-global-css-90d2a4a06284)
 - [CSS Modules - Welcome to the Future](http://glenmaddern.com/articles/css-modules)
 - [CSS Modules Demo](https://css-modules.github.io/webpack-demo/)
 - [Interoperable CSS](http://glenmaddern.com/articles/interoperable-css) <- the low-level 'guts' of CSS Modules for those interested

Because we are using CSS Modules we decided that a CSS framework with [Atomic CSS Principals](https://www.lucidchart.com/techblog/2014/01/31/atomic-css-tool-set/) would be the most benefical base for use to compose from. After some research we ended up picking [Basscss](http://www.basscss.com/) for it's small size, modularity and generic out-of-the-box look. In the future we will most liekly end up pulling all of Basscss into a higher level within the project to allow more flexibilty as we extend into complex components. But for now Basscss is a dependency of React Atlas.

## License 
This project is licensed under the terms of the [MIT license](https://github.com/react-toolbox/react-toolbox/blob/master/LICENSE).

## Atlas?
When thinking about Web Design and Web Development, we came across the art of map making - [Cartography](https://en.wikipedia.org/wiki/Cartography).

>Cartography (from Greek χάρτης khartēs, "map"; and γράφειν graphein, "write") is the study and practice of making maps. Combining science, aesthetics, and technique, cartography builds on the premise that reality can be modeled in ways that communicate spatial information effectively.

After reading about it more, we realized that as Web Designer and Developers, we are essentially modern-day map makers. We combine technology and design to build flat screens that communicate information in a fixed space. With this reasoning in our heads, we decided on Atlas. Atlas is defined as a collection(or a _library_ if you will) of maps. What better name for a library of components that will be used to compose and display complex interfaces/maps?

Plus you know, there's this cool Titan in Greek mythology that literally holds up the world named Atlas.
