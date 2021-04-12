const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

const clientPath = path.join(__dirname, 'client');

app.use(express.static(clientPath));

app.listen(PORT, () => {
  console.log('Listening on port:', PORT);
});