let ghpages = require("gh-pages");
let pjson = require("../package.json");

ghpages.publish(
  "config/styleguide",
  {
    "remote": "origin",
    "message": "Auto-generated commit for React Atlas version: " + pjson.version
  },
  function(err) {
    console.warn("Error publishing Styleguide: ", err);
  }
);
