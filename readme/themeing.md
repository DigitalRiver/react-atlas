
# Themeing

## Create Themes
To create a theme for React Atlas first `npm install react-atlas-default-theme` or clone the React Atlas repo. Next make a copy of `react-atlas-default-theme`, then rename the folder to the name of your new theme. Also make sure to change the name in the package.json file inside the new theme folder. Now you can make your CSS changes. After making your styling changes rebuild the new theme package with `node ./node_modules/webpack/bin/webpack.js` inside the theme folder. You are now done making your new theme, you can now publish the npm package to [npm](https://docs.npmjs.com/cli/publish), a [private](https://docs.npmjs.com/private-modules/intro) npm registry or install via the [file](http://stackoverflow.com/questions/15806241/how-to-specify-local-modules-as-npm-package-dependencies) system.

## Themeing Atlas
  After building the new theme, create a atlas configuration file inside of your main application's root folder. Name the config file `atlas.config.js`. Inside the atlas config export a javascript object with the name of the theme you want to switch to, below is an example.

  ```javascript
  module.exports = {
    'theme': 'react-atlas-new-theme'
  }
  ```
  Now run from you main application.
  ```bash
  $ node node_modules/react-atlas/packages/react-atlas/src/setup.js --switch

  $ npm install react-atlas-new-theme
  ```
## Themeing Components
If you don't wan't to theme all the React Atlas components or you want different themes for each component, React Atlas makes it easy to theme
individual components at a time. So after making your new theme/themes create or modify your `atlas.config.js`. You can now export an object with an array called components. The array contains objects that have the component name they want to theme and the name of the theme to use.
```javascript
module.exports = {
  'theme': '',
  'components': [
    {'name': 'Button', 'theme': 'react-atlas-new-theme'}
  ]
}
```
Now run from you main application.
```bash
$ node node_modules/react-atlas/packages/react-atlas/src/setup.js --switch

$ npm install react-atlas-new-theme
```

## Style Component Instance
Sometimes you will need to style a single instance of a component. To achieve this one can pass CSS classes to a component's `className` prop. All components in React Atlas have a `className` prop that can be used to change/overide styles for that instance of the component.
