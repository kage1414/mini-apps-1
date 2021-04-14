const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const PORT = 3000;
const helpers = require('./helpers.js');

const staticDir = path.join(__dirname, 'public');

app.use(express.static(staticDir));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.post('/move', (req, res) => {
  console.log('req.body', req.body.currentColor);

  let coord = req.body.coord;
  let board = req.body.board;
  let colors = req.body.colors;
  let currentColor = req.body.currentColor;
  let nextColor = req.body.nextColor;

  for (let i = board.length - 1; i >= 0; i--) {
    if (board[i][coord[1]] === '') {
      colors[i][coord[1]] = currentColor;
      board[i][coord[1]] = 'O';
      const state = {
        colors: colors,
        board: board,
        currentColor: nextColor,
        nextColor: currentColor,
        winner: helpers.checkWins(currentColor, colors),
        tie: helpers.checkTie(colors)
      };
      // console.log(state);
      res.send({state: state});
      break;
    } else if (i === 0 && board[i][coord[1]] !== '') {
      // res.statusMessage('Please choose another column');
      res.status(400);
      res.send('Please choose another column');
    }
  }

});

app.listen(PORT, () => {
  console.log('Listening on port:', PORT);
});