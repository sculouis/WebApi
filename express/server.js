'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');

db.serialize(function () {
  db.run("CREATE TABLE IF NOT EXISTS  Items (info TEXT)");

  var stmt = db.prepare("INSERT INTO Items VALUES (?)");
  for (var i = 0; i < 10; i++) {
    stmt.run("測試" + i);
  }
  stmt.finalize();
});

db.allAsync = function (sql) {
  var that = this;
  return new Promise(function (resolve, reject) {
      that.all(sql, function (err, rows) {
          if (err)
              reject(err);
          else
              resolve(rows);
      });
  });
};

router.get('/', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.write('<h1>Hello from Express.js!</h1>');
  res.end();
});
router.get('/datas', (req, res) => {
     let sql = "SELECT rowid AS id, info FROM Items"
     return  db.allAsync(sql).then(rows => res.json(rows))
    // res.json({test:"測試"})
});

router.post('/', (req, res) => res.json({
  postBody: req.body
}));

app.use(bodyParser.json());
app.use('/api', router); // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;
module.exports.handler = serverless(app);
