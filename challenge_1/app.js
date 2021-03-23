let model = {
  moveCounter: 0,
  gameOver: false,
  winner: undefined,
  winnerAlerted: false,
  occupiedSpaces: [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ],
  currentPlayer: 'X',
  nextPlayer: 'O'
}

let view = {
  appendResetButton: () => {
    let resetButton = document.createElement('button');
    resetButton.innerHTML = 'Reset';
    resetButton.setAttribute('onclick', 'view.resetDOM()');
    document.body.appendChild(resetButton);
  },

  appendBoard: (boardSize) => {
    let table = document.createElement('table');
    document.body.appendChild(table);
    let i = 0;
    while (i < boardSize) {
      let row = document.createElement('tr');

      let j = 0;
      while (j < boardSize) {
        let cell = document.createElement('td');
        cell.innerHTML = '';
        cell.setAttribute('class', 'cell');
        cell.setAttribute('style', 'height: 200px; width: 200px; text-align: center; vertical-align: sub; font-size: 100px; background-color: #d9d9d9;');
        cell.setAttribute('row', i);
        cell.setAttribute('column', j);
        row.appendChild(cell);
        j++
      }

      row.setAttribute('class', i);
      table.appendChild(row);
      i++;
    }
  },

  resetDOM: (boardSize) => {
    controller.removeDOMElements();
    controller.initialize(boardSize);
  }
}

let controller = {
  addClickHandlersToCells: () => {
    let cells = document.getElementsByClassName('cell')
    for (let i = 0; i < cells.length; i++) {
      cells[i].addEventListener('click', (e) => {
        // console.log(e)
        controller.clickHandler(e.target)
      })
    }
  },

  clickHandler: (target) => {

    if (!controller.isOccupied(target) && !model.gameOver) {
      let row = target.attributes.row.value;
      let column = target.attributes.column.value;
      model.occupiedSpaces[row][column] = model.currentPlayer;
      target.innerHTML = model.currentPlayer;
      controller.checkForWinner(model.currentPlayer)

      if (model.moveCounter % 2 === 1) {
        model.nextPlayer = 'O';
        model.currentPlayer= 'X';
      } else {
        model.nextPlayer = 'X';
        model.currentPlayer = 'O';
      }

      model.moveCounter++;

    } else if (!model.gameOver) {
      alert('Choose another space');
    }

    if (model.gameOver && !model.winnerAlerted) {
      setTimeout(() => {
        alert(`${model.winner.toUpperCase()} is the winner!`);
      }, 0)
      model.winnerAlerted = true;
    }

  },

  removeDOMElements: () => {
    while(document.body.firstChild) {
      document.body.firstChild.remove();
    }
  },

  isOccupied: (target) => {
    let row = target.attributes.row.value;
    let column = target.attributes.column.value;
    if (model.occupiedSpaces[row][column] !== '') {
      return true;
    }
    return false;
  },

  checkForWinner: (player) => {
    let cells = document.getElementsByClassName(player);

    if (controller.win.row(model.currentPlayer) || controller.win.col(model.currentPlayer) || controller.win.minDiag(model.currentPlayer) || controller.win.majDiag(model.currentPlayer)) {
      model.gameOver = true;
      model.winner = model.currentPlayer;
    }

  },

  win: {
    row: (player) => {
      // Check if there are 3 of the same row values with 3 unique column values
      for (let i = 0; i < model.occupiedSpaces.length; i++) {
        for (let j = 0; j < model.occupiedSpaces[i].length; j++) {
          if (model.occupiedSpaces[i][j] !== player) {
            break;
          } else if (model.occupiedSpaces[i][j] === player && j === model.occupiedSpaces[i].length - 1) {
            console.log('true')
            return true;
          }
        }
      }
      return false;
    },
    col: (player) => {
      // Check if there are 3 of the same column values with 3 unique row values
      for (let i = 0; i < model.occupiedSpaces.length; i++) {
        for (let j = 0; j < model.occupiedSpaces[i].length; j++) {
          if (model.occupiedSpaces[j][i] !== player) {
            break;
          } else if (model.occupiedSpaces[j][i] === player && j === model.occupiedSpaces[j].length - 1) {
            return true;
          }
        }
      }
      return false;
    },
    majDiag: (player) => {
      //
      for (let i = 0; i < model.occupiedSpaces.length; i++) {
        if (model.occupiedSpaces[i][(model.occupiedSpaces.length - 1) - i] !== player) {
          break;
        } else if (i === model.occupiedSpaces.length - 1 && model.occupiedSpaces[i][(model.occupiedSpaces.length - 1) - i] === player) {
          return true;
        }
      }

      return false;
    },
    minDiag: (player) => {
      // Check if there are 3 cells each with equivalent row and column values

      for (let i = 0; i < model.occupiedSpaces.length; i++) {
        if (model.occupiedSpaces[i][i] !== player) {
          break;
        } else if (i === model.occupiedSpaces.length - 1 && model.occupiedSpaces[i][i] === player) {
          return true;
        }
      }

      return false;
    }
  },

  initialize: (boardSize = 3) => {
    model.moveCounter = 0;
    model.gameOver = false;
    model.winner = undefined;
    model.winnerAlerted = false;
    model.occupiedSpaces = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ];
    model.currentPlayer = 'X';
    model.nextPlayer = 'O';
    view.appendResetButton();
    view.appendBoard(boardSize);
    controller.addClickHandlersToCells();
  }
}

controller.initialize();