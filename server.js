var path = require('path');
var http = require('http');
var express = require('express');
var app = express();

(function() {

  var webpack = require('webpack');
  var config = require(process.env.WEBPACK_CONFIG ? process.env.WEBPACK_CONFIG : './webpack.config.development');
  var compiler = webpack(config);

  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath,
    stats: {
      colors: true
    }
  }));

  app.use(require('webpack-hot-middleware')(compiler));
})();


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './spec/index.html'));
});

var server = http.createServer(app);

server.listen(process.env.PORT || 3001, '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log("Listening on %j", server.address().port);
});
