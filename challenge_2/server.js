const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fileupload = require('express-fileupload');
const controller = ('./controller.js');
const CSV = require('./csv.js');
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
  if (req.body.json) {
    let csv = new CSV(req.body.json, req.body.filter);
    fs.writeFile('./latest.txt', JSON.stringify(csv), (err) => {
      if (err) {
        console.log(err);
      }
    });
    res.send(csv);
    next();
  } else {
    res.status(404);
    next();
  }
});

app.get('/latest', (req, res, next) => {
  fs.readFile(path.join(__dirname, 'latest.txt'), (err, data) => {
    if (err) {
      console.log(err);
    }

    if (data) {
      // let csv = new CSV();
      // let html = csv.csvToHtml(data);
      res.send(JSON.parse(data));
      next();
    } else {
      res.send('<div id="jsonTable">No previous data saved on server</div>');
      next();
    }
  });

});

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log('Server listening on port', PORT);
});