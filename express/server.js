'use strict';
const express = require('express');
let cors = require('cors');
const path = require('path');
const serverless = require('serverless-http');
let app = express().use(cors());
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
router.post('/', (req, res) => {
  let objs = []
  objs.push(req.body)
  action.Insert(objs)
  .then((result) => {
    console.log(`新增筆數:${result}`)
    return res.json(result)
  })
.catch((err) => console.log(err))
});

router.delete('/delete',(req,res) => {
  action.Delete(req.body)
  .then((result) => {
    console.log(`刪除筆數:${result}`)
    return res.json(result)
  })
.catch((err) => err)
})

router.put('/update',(req,res) => {
  action.Update(req.body.queryObj,req.body.updateObj)
  .then((result) => {
    console.log(`更新結果:${result}`)
    return res.json(result)
  })
.catch((err) => err)
})

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router); // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;
module.exports.handler = serverless(app);
