let controller = {

  addClickHandlersToCells: () => {
    let cells = document.getElementsByClassName('cell');
    for (let i = 0; i < cells.length; i++) {
      cells[i].addEventListener('click', (e) => {
        controller.clickHandler(e.target);
      });
    }
  },

  clickHandler: (target) => {

    if (!controller.isOccupied(target) && !model.gameOver) {
      let row = target.attributes.row.value;
      let column = target.attributes.column.value;
      model.board[row][column] = model.currentPlayer;
      target.innerHTML = model.currentPlayer;
      model.checkForWinner();

      model.nextMove();

    } else if (!model.gameOver) {
      alert('Space taken. Please choose another space.');
    }

    if (model.gameOver && !model.winnerAlerted) {
      setTimeout(() => {
        alert(`${model.winner} is the winner!`);
      }, 0);
      model.winnerAlerted = true;
    }

  },

  removeDOMElements: () => {
    document.body.innerHTML = '';
  },

  isOccupied: (target) => {
    let row = target.attributes.row.value;
    let column = target.attributes.column.value;
    if (model.board[row][column] === 'X' || model.board[row][column] === 'O') {
      return true;
    }
    return false;
  },

  win: {
    row: () => {
      for (let i = 0; i < model.board.length; i++) {
        for (let j = 0; j < model.board[i].length; j++) {
          if (model.board[i][j] !== model.currentPlayer) {
            break;
          } else if (model.board[i][j] === model.currentPlayer && j === model.board[i].length - 1) {
            return true;
          }
        }
      }
      return false;
    },
    col: () => {
      for (let i = 0; i < model.board.length; i++) {
        for (let j = 0; j < model.board[i].length; j++) {
          if (model.board[j][i] !== model.currentPlayer) {
            break;
          } else if (model.board[j][i] === model.currentPlayer && j === model.board[j].length - 1) {
            return true;
          }
        }
      }
      return false;
    },
    majDiag: () => {
      for (let i = 0; i < model.board.length; i++) {
        if (model.board[i][(model.board.length - 1) - i] !== model.currentPlayer) {
          break;
        } else if (i === model.board.length - 1 && model.board[i][(model.board.length - 1) - i] === model.currentPlayer) {
          return true;
        }
      }

      return false;
    },
    minDiag: () => {
      for (let i = 0; i < model.board.length; i++) {
        if (model.board[i][i] !== model.currentPlayer) {
          break;
        } else if (i === model.board.length - 1 && model.board[i][i] === model.currentPlayer) {
          return true;
        }
      }

      return false;
    }
  }
};