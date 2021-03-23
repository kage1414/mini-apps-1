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
  nextPlayer: 'X'
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
    // console.log(target.innerText)

    let player = model.nextPlayer;
    if (!controller.isOccupied(target) && !model.gameOver) {
      let row = target.attributes.row.value;
      let column = target.attributes.column.value;
      model.occupiedSpaces[row][column] = model.nextPlayer;
      target.innerHTML = model.nextPlayer;
      if (model.moveCounter % 2 === 0) {
        model.nextPlayer = 'O';
      } else {
        model.nextPlayer = 'X';
      }
      model.moveCounter++;
      controller.checkForWinner(player)
    } else if (!model.gameOver) {
      alert('Choose another space')
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
    console.log('player', player)
    let cells = document.getElementsByClassName(player);

    if (controller.win.row(player) || controller.win.col(player) || controller.win.majDiag(player) || controller.win.minDiag(player)) {
      model.gameOver = true;
      model.winner = player;
    }

  },

  win: {
    row: (player) => {
      // Check if there are 3 of the same row values with 3 unique column values
      for (let i = 0; i < model.occupiedSpaces.length; i++) {
        for (let j = 0; j < model.occupiedSpaces[i].length; j++) {
          console.log(player);
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
    col: (cells) => {
      // Check if there are 3 of the same column values with 3 unique row values
      let columns = {
        0: [],
        1: [],
        2: []
      }
      for (let i = 0; i < cells.length; i++) {
        columns[cells[i].attributes.column.value].push(cells[i]);
      }
      for (let idx in columns) {
        if (columns[idx].length === 3) {
          return true
        }
      }
      return false;
    },
    majDiag: (cells) => {
      //
      const winningCells = {
        row2col0: true,
        row1col1: true,
        row0col2: true
      }

      for (let i = 0; i < cells.length; i++) {
        var cell = `row${cells[i].attributes.row.value}col${cells[i].attributes.column.value}`;
        if (winningCells[cell]) {
          winningCells[cell] = false;
        }
      }

      for (let key in winningCells) {
        if (winningCells[key] === true) {
          return false;
        }
      }

      return true;
    },
    minDiag: (cells) => {
      // Check if there are 3 cells each with equivalent row and column values
      const winningCells = {
        row0col0: true,
        row1col1: true,
        row2col2: true
      }

      for (let i = 0; i < cells.length; i++) {
        var cell = `row${cells[i].attributes.row.value}col${cells[i].attributes.column.value}`;
        if (winningCells[cell]) {
          winningCells[cell] = false;
        }
      }

      for (let key in winningCells) {
        if (winningCells[key] === true) {
          return false;
        }
      }

      return true;
    }
  },

  initialize: (boardSize = 3) => {
    view.appendResetButton();
    view.appendBoard(boardSize);
    controller.addClickHandlersToCells();
    model.moveCounter = 0;
    model.gameOver = false;
    model.winner = undefined;
    model.winnerAlerted = false;
  }
}

controller.initialize();