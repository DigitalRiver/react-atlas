const path = require('path');
const http = require('http');
const express = require('express');
const app = express();

(function() {

  const webpack = require('webpack');
  const config = require(process.env.WEBPACK_CONFIG ? process.env.WEBPACK_CONFIG : './webpack.config.development');
  const compiler = webpack(config);

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
