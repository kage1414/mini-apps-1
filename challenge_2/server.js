const express = require('express');
const _ = require('lodash');
const path = require('path');
const bodyParser = require('body-parser');
const fileupload = require('express-fileupload');
const csv = require('./csv.js');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'client')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileupload());

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
  next();
});

app.post('/json', (req, res, next) => {
  // console.log(req.body);
  var csvData = csv.jsonToCsv(req.body.json);
  console.log(csvData);
  res.type('text/csv');
  res.send(csvData);
  next();
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log('Server listening on port', PORT);
});