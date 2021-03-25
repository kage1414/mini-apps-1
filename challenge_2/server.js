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
  res.type('text/csv');
  res.attachment(csv.createFilename(req.files.json.name));
  res.send(csv.jsonFileToCsv(req.files.json));
  next();
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log('Server listening on port', PORT);
});