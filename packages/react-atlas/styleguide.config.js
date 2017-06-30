const path =  require('path');
const loaders = require('loaders');

module.exports = {
  require: [
    path.join(__dirname, 'src/assets/font-awesome/css/font-awesome.min.css')
  ],
  // Use this to select all components in the src/components folder
  // components: 'src/components/**/[A-Z]*.js',

  // Use this to test a single component.  Change it to the component you are testing and restart the styleguide server
  // Regex should be: 'src/components/NAME_OF_COMPONENT_FOLDER/[A-Z]*.js'
  components: 'src/components/**/[Button|Avatar|Card|Dropdown|Hint]*.js',
  ignore: ['**/__tests__/**', '**/*.test.js', '**/*.test.jsx', '**/*.spec.js', '**/*.spec.jsx', '**/index.js'],
  contextDependencies: [
    '../react-atlas-core/src',
    '../react-atlas-theme/src'
  ],
  defaultExample: true,
  webpackConfig: {
    module: {
      loaders: loaders.all,
    },
  },
};