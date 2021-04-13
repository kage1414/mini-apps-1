const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
const bodyParser = require('body-parser');
const sequelize = require('sequelize');
const cookieParser = require('cookie-parser');
const helper = require('./helper.js');
const db = require('./database.js');

const clientPath = path.join(__dirname, 'client');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(clientPath));


app.post('/page1', (req, res) => {
  console.log(req.cookies);

  let entries = Object.entries(req.body);
  if (entries.length === 4) {
    res.cookie('page', 1);
    res.send({
      request: true,
      page: 1
    });
  } else {
    res.send(false);
  }
});

app.post('/page2', (req, res) => {

  let entries = Object.entries(req.body);
  if (entries.length === 10) {
    res.clearCookie('page');
    res.cookie('page', 2);
    res.send({
      request: true,
      page: 2
    });
  } else {
    res.sendStatus(400);
  }
});

app.post('/page3', (req, res) => {

  let entries = Object.entries(req.body);
  if (entries.length === 15) {
    res.clearCookie('page');
    res.cookie('page', 3);
    res.send({
      request: true,
      page: 3
    });
  } else {
    res.send(false);
  }
});

app.listen(PORT, () => {
  console.log('Listening on port:', PORT);
});