# React Atlas
React Atlas is a React component library, with a focus on supplying Admin Interface tools. The goal of this repo to is to eventually be the library that can power most of Digital River's complex admin interfaces. With this in mind, we need a fast, generic, composable library that can be dropped into a project and 'just work'.

## Why?
React Atlas originally started off as a fork of [React Toolbox](https://github.com/react-toolbox/react-toolbox). We liked the hierarchy and the way the components were built. However, we didn't want to be married to the Material Design concept, and wanted to make a library that was a little more generic. We hope that React Atlas will be that tool.

## Usage

For inital development and release, we are focusing on a nodejs with webpack environment. As we continue to develop React Atlas we will bring in examples and boilerplates to show it working with other build systems (JSPM, Browserify, UMD, etc.).

With webpack in mind, we reccomend using [Babel Loader](https://github.com/babel/babel-loader), [CSS Loader](https://github.com/webpack/css-loader) and [SASS Loader](https://github.com/jtangelder/sass-loader). We are working toward dropping the Sass and Webpack dependency as soon as it makes sense for us internally. A good starting point is for a webpack workflow is [React Hot Webpack Boilerplate](https://github.com/gaearon/react-hot-boilerplate).

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

Since React Toolbox styles are written in CSS it's pretty easy to customize your components. We have several ways:

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
Run the docs server locally by doing the following commands:

```
cd docs/
npm install 
npm start
```

Local documentation will be available at http://localhost:8081/

## Authors and Contributors

The project is being initially developed and maintained by the DR UX team.

If you are interested in contributing to the project, please read our [Contributing Guidelines](https://github.digitalriverws.net/ux/react-atlas/blob/master/CONTRIBUTING.md)

This project is developed on Node 4.2.2+. Look into using [nvm-windows](https://github.com/coreybutler/nvm-windows) or [n](https://github.com/tj/n) to handle different node versions.

## License 
This project is licensed under the terms of the [MIT license](https://github.com/react-toolbox/react-toolbox/blob/master/LICENSE).
