# React Atlas
React Atlas originally started off as a fork of [React Toolbox](https://github.com/react-toolbox/react-toolbox). WE liked the way the hierarchy and the way the components were built. However, we didn't want to be married to the Material Design concept, and wanted to make a library that was a little more generic. We hope that React Atlas will be that tool.

## Usage

Although there are other ways to use React Atlas, right now, the recommended way is to create a Webpack workflow with [Babel Loader](https://github.com/babel/babel-loader), [CSS Loader](https://github.com/webpack/css-loader) and [SASS Loader](https://github.com/jtangelder/sass-loader). A good starting point is [React Hot Webpack Boilerplate](https://github.com/gaearon/react-hot-boilerplate).

Once you have the workflow ready, you can just require and use the components:

```jsx
import React from 'react';
import Button from 'react-toolbox/lib/button';

const CustomButton = () => (
  <Button label="Hello world" raised accent />
);

export default CustomButton;
```

The previous code creates a React button component based on React toolbox button. It's important to notice that requiring a module from the exposed root of the package will import the **SASS** of the component. 

We encourage you to work with webpack but if you want to use React Toolbox in an old fashioned way you must generate a build with all the css and javascript and include it in your `index.html`. Then you can use the components exposed in the `window` object.

## App component

There are some components in React Toolbox that requires special positioning. For example, `Dialog` and `Drawer` components block the scroll showing a fixed positioned overlay. To handle these cases, React Toolbox needs some styling in your root node. This can be achieved wrapping your app with a non intrusive `App` wrapper component:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import ToolboxApp from 'react-toolbox/lib/app';
import App from './my-app';

ReactDOM.render(
  <ToolboxApp>
    <App />
  </ToolboxApp>
, document.getElementById('app'));

```

## Customization

Since React Toolbox styles are written in CSS it's pretty easy to customize your components. We have several ways:

### Via React Toolbox Loader

Thanks to the power of SASS, all components in React Toolbox are configured from a variables file. The best way to customize your build is to create a custom configuration SASS file overriding configuration variables like colors or sizes.

With [toolbox-loader](https://github.com/react-toolbox/toolbox-loader) you can tell webpack where your configuration file is and it will prepend your config to each SASS build. This will result in your customized CSS for React Toolbox Components. For now you can browse the configuration files and override what you want. 

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

## Authors and Contributors

The project is being initially developed and maintained by the DR UX team. We want to create reference components so any contribution is very welcome.

To work in the project you'd need a `node` version with ES6 syntax. Although the project is built using Babel we use some ES6 features in the development server. Also, the packages has been tested with `node 4.2.1`. Consider using [nvm](https://github.com/creationix/nvm) or [n](https://github.com/tj/n) to handle different node versions!

We reccomend forking this repo to your personal profile, then cloning your fork, and then adding this main repo as your upstream.

Once you have done that, you can run the docs server locally by doing the following commands:

```
cd docs/
npm install 
npm start
```

Local documentation will be available at http://localhost:8081/

## License 
This project is licensed under the terms of the [MIT license](https://github.com/react-toolbox/react-toolbox/blob/master/LICENSE).
