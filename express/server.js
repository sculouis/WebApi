'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
var action = require("../mongoAction")

router.get('/', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.write('<h1>Hello from Express.js!</h1>');
  res.end();
});
router.get('/datas', (req, res) => {
  action.Query()
  .then((result) => {
      console.log(`總筆數:${result.length}`)
      result.forEach(x =>  console.log(x.Description))
      return res.json(result)
    })
  .catch((err) => console.log(err))
});

router.post('/', (req, res) => res.json({
  postBody: req.body
}));

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router); // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;
module.exports.handler = serverless(app);
