let model = {};

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
        cell.setAttribute('style', 'height: 180px; width: 180px; text-align: center; vertical-align: sub; font-size: 100px; background-color: #d9d9d9;');
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
      controller.checkForWinner();

      if (model.moveCounter % 2 === 1) {
        model.currentPlayer= 'X';
      } else {
        model.currentPlayer = 'O';
      }

      model.moveCounter++;

    } else if (!model.gameOver) {
      alert('Space taken. Please choose another space.');
    }

    if (model.gameOver && !model.winnerAlerted) {
      setTimeout(() => {
        alert(`${model.winner} is the winner!`);
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
    if (controller.win.row() || controller.win.col() || controller.win.minDiag() || controller.win.majDiag()) {
      model.gameOver = true;
      model.winner = model.currentPlayer;
    }

  },

  win: {
    row: () => {
      for (let i = 0; i < model.occupiedSpaces.length; i++) {
        for (let j = 0; j < model.occupiedSpaces[i].length; j++) {
          if (model.occupiedSpaces[i][j] !== model.currentPlayer) {
            break;
          } else if (model.occupiedSpaces[i][j] === model.currentPlayer && j === model.occupiedSpaces[i].length - 1) {
            console.log('true')
            return true;
          }
        }
      }
      return false;
    },
    col: () => {
      for (let i = 0; i < model.occupiedSpaces.length; i++) {
        for (let j = 0; j < model.occupiedSpaces[i].length; j++) {
          if (model.occupiedSpaces[j][i] !== model.currentPlayer) {
            break;
          } else if (model.occupiedSpaces[j][i] === model.currentPlayer && j === model.occupiedSpaces[j].length - 1) {
            return true;
          }
        }
      }
      return false;
    },
    majDiag: () => {
      for (let i = 0; i < model.occupiedSpaces.length; i++) {
        if (model.occupiedSpaces[i][(model.occupiedSpaces.length - 1) - i] !== model.currentPlayer) {
          break;
        } else if (i === model.occupiedSpaces.length - 1 && model.occupiedSpaces[i][(model.occupiedSpaces.length - 1) - i] === model.currentPlayer) {
          return true;
        }
      }

      return false;
    },
    minDiag: () => {
      for (let i = 0; i < model.occupiedSpaces.length; i++) {
        if (model.occupiedSpaces[i][i] !== model.currentPlayer) {
          break;
        } else if (i === model.occupiedSpaces.length - 1 && model.occupiedSpaces[i][i] === model.currentPlayer) {
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
    view.appendBoard(boardSize);
    view.appendResetButton();
    controller.addClickHandlersToCells();
  }
}

controller.initialize();