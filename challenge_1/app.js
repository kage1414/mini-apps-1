class Model {

  constructor () {
    this.moveCounter = 0;
    this.gameOver = false;
    this.winner = undefined;
    this.winnerAlerted = false;
    this.currentPlayer = 'X';
    this.board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ];
  }

  checkForWinner() {
    if (controller.win.row() || controller.win.col() || controller.win.minDiag() || controller.win.majDiag()) {
      this.setGameOver();
    }
  }

  nextMove() {
    // view.renderBoard();
    if (this.moveCounter % 2 === 1) {
      this.currentPlayer = 'X';
    } else {
      this.currentPlayer = 'O';
    }
    this.moveCounter++;
  }

  setGameOver() {
    this.gameOver = true;
    this.winner = this.currentPlayer;
  }
}



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

class View {

  constructor () {
    this.renderBoard();
    this.appendResetButton();
  }

  renderBoard() {
    // Written while using DOM to track moves. Will refactor to render and reflect model.board.
    if (document.getElementById('board')) {
      document.getElementById('board').remove();
    }
    let table = document.createElement('table');
    table.setAttribute('id', 'board');
    document.body.prepend(table);
    for (let i = 0; i < 3; i++) {
      let row = document.createElement('tr');

      for (let j = 0; j < 3; j++) {
        let cell = document.createElement('td');
        cell.innerHTML = model.board[i][j];
        cell = view.setCellAttributes(cell, i, j);
        row.appendChild(cell);
      }

      row.setAttribute('class', i);
      table.appendChild(row);
    }
    controller.addClickHandlersToCells();
  }

  appendResetButton() {
    let resetButton = document.createElement('button');
    resetButton.innerHTML = 'Reset';
    resetButton.setAttribute('onclick', 'view.resetDOM()');
    document.body.appendChild(resetButton);
  }

  setCellAttributes(cell, row, col) {
    cell.setAttribute('class', 'cell');
    cell.setAttribute('style', 'height: 180px; width: 180px; text-align: center; padding: auto; font-size: 100px; background-color: #d9d9d9;');
    cell.setAttribute('row', row);
    cell.setAttribute('column', col);
    return cell;
  }

  resetDOM() {
    controller.removeDOMElements();
    model = new Model();
    view.initialize();
  }

}

let model = new Model();
let view = new View();


///////////////////////////////////////////////////////////////////
