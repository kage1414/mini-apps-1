const express = require('express');
const _ = require('lodash');
const fs = require('fs');
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

  // Map keys to an array for index reference
  let idxReference = [];
  let keys = Object.keys(parsed);
  _.map(keys, (key) => {
    if (key !== 'children') {
      idxReference.push(key);
    }
  })

  // Render first line of csv
  let lines = []
  lines.push(idxReference.join(','));

  // Render subsequent lines of children

  let writeValues = (json) => {
    var valArray = [];

    _.each(json, (key) => {
      if (key !== 'children') {
        var idx = idxReference.indexOf(key);
        valArray[idx] = json[idx];
      }
    })

    for (let i = 0; i < idxReference.length; i++) {
      if (!valArray[i]) {
        valArray[i] = '';
      }
    }

    lines.push(valArray.join(','));

    if (json.children.length > 0) {
      _.each(json.children, (child) => {
        writeValues(child);
      })
    }
  }

  csv = lines.join('\n');

  console.log(csv);
  res.send(csv);
  next();
});
