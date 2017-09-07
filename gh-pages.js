var ghpages = require('gh-pages');

ghpages.publish('packages/react-atlas/styleguide', {
  remote: 'origin'
}, function(err) {});