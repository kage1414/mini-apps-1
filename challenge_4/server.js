const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const PORT = 3000;

const staticDir = path.join(__dirname, 'public');

app.use(express.static(staticDir));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.listen(PORT, () => {
  console.log('Listening on port:', PORT);
});