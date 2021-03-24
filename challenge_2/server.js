const express = require('express');
const _ = require('lodash');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'client')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log('Server listening on port', PORT);
});

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
  next();
});

app.post('/json', (req, res, next) => {
  let parsed = JSON.parse(req.body.json);
  let keys = Object.keys(parsed);
  let csv = '';
  _.map(keys, (key, idx) => {
    if (idx === keys.length - 1) {
      csv += key + '\n';
    } else {
      csv += key + ',';
    }
  });

  res.send(csv);
  next();
});
