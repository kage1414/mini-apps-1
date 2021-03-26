const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fileupload = require('express-fileupload');
const controller = ('./controller.js');
const csv = require('./csv.js');
const _ = require('lodash');
const fs = require('fs');

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
  var csvData = csv.jsonToCsv(req.body.json);
  fs.writeFile('./latest.csv', csvData, (err) => {
    if (err) {
      console.log(err);
    }
  });
  let html = csv.csvToHtml(csvData);
  res.send(html);
  next();
});

app.get('/latest', (req, res, next) => {
  fs.readFile(path.join(__dirname, 'latest.csv'), (err, data) => {
    let html = csv.csvToHtml(data);
    res.send(html);
    next();
  });

});

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log('Server listening on port', PORT);
});