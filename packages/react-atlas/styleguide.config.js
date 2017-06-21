const path =  require('path');

module.exports = {
  // Use this to select all components in the src/components folder
  // components: 'src/components/**/[A-Z]*.js',

  // Use this to test a single component.  Change it to the component you are testing and restart the styleguide server
  // Regex should be: 'src/components/NAME_OF_COMPONENT_FOLDER/[A-Z]*.js'
	components: 'src/components/**/[Button|Avatar|Card]*.js',
	contextDependencies: [
		'../react-atlas-core/src',
    	'../react-atlas-theme/src'
	],
	defaultExample: true,
	webpackConfig: {
		module: {
			loaders: [
        { // babel loader
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            // Don‘t try to find .babelrc because we want to force this configuration.
            babelrc: false,
            presets: [require.resolve('babel-preset-react-app')],
            // This is a feature of `babel-loader` for webpack (not Babel itself).
            // It enables caching results in ./node_modules/.cache/babel-loader/ directory for faster rebuilds.
            cacheDirectory: true,
          },
        },
        { //CSS loader
          test: /\.css$/,
          loader: 'style-loader!css-loader',
        },
        { //JSON loader
          test: /\.json$/,
          loader: 'json-loader',
        },
        { //URL loader
          exclude: [
            /\.html$/,
            /\.(js|jsx)$/,
            /\.css$/,
            /\.json$/
          ],
          loader: 'url-loader',
          query: {
            limit: 10000,
            name: 'static/media/[name].[hash:8].[ext]',
          },
        }
      ]
		},
	},
};
