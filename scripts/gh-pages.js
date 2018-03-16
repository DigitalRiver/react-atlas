var ghpages = require('gh-pages');
var pjson = require('../packages/react-atlas/package.json');

ghpages.publish('../packages/react-atlas/styleguide', {
  remote: 'origin',
  message: 'Auto-generated commit for React Atlas version: ' + pjson.version
}, function(err) {console.warn("Error publishing Styleguide: ", err)});
