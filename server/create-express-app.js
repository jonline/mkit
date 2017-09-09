const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const apiRouter = require('./api-router');
var cors = require('cors');

function createExpressApp(database) {
  const app = express();

  app.use(express.static(path.join(__dirname, 'public')));
  app.use(bodyParser.json());
  app.use(cors());

  app.use('/api', apiRouter(database));
  // app.use('*', (req, res) => {
  //   return res.sendFile(path.join(__dirname, 'public/index.html'))
  // });

  return app;
}

module.exports = createExpressApp;
