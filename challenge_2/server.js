const express = require('express');
const path = require('path');
const http = require('http');
const app = express();
const PORT = 3000;

app.use('/index', express.static(path.join(__dirname, 'client', 'index.html')));

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log('Server listening on port', PORT);
});

app.get('/', (req, res, next) => {
  res.redirect('/index');
  next();
});

app.get('/json', (req, res, next) => {
  res.send('hello');
});