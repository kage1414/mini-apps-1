const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
const bodyParser = require('body-parser');
const sequelize = require('sequelize');
const cookieParser = require('cookie-parser');
const helpers = require('./helpers.js');

const clientPath = path.join(__dirname, 'client');

app.use(express.static(clientPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.post('/page1', (req, res) => {
  console.log('page1');
  console.log(req.body);
  let entries = Object.entries(req.body);
  console.log(entries);
  if (entries.length === 3) {
    let cookie = helpers.generateRandomString(24);
    res.send(true);
  } else {
    res.cookie('page1', 'page1');
    res.send(false);
  }
});

app.post('/page2', (req, res) => {
  console.log('page2');
  console.log(req.body);
});

app.post('/page3', (req, res) => {
  console.log('page3');
  console.log(req.body);
});

app.listen(PORT, () => {
  console.log('Listening on port:', PORT);
});