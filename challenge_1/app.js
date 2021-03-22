let model = {
  moveCounter: 0,
  gameOver: false,
  winner: undefined,
  winnerAlerted: false
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
        cell.innerHTML = ' ';
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
        controller.clickHandler(e.target)
      })
    }
  },

  clickHandler: (target) => {

    let player;
    if (!controller.isClicked(target) && !model.gameOver) {
      target.className += ' clicked';
      if (model.moveCounter % 2 === 0) {
        player = 'x';
      } else {
        player = 'o';
      }

      if (player === 'x') {
        target.innerHTML = 'X'
        target.className += ' x';
      } else {
        target.innerHTML = 'O';
        target.className += ' o';
      }
      model.moveCounter++;
      controller.checkForWinner(player)
    } else if (!model.gameOver) {
      alert('Choose another space')
    }

    if (model.gameOver && !model.winnerAlerted) {
      alert(`${player.toUpperCase()} is the winner!`);
      model.winnerAlerted = true;
    }

  },

  removeDOMElements: () => {
    while(document.body.firstChild) {
      document.body.firstChild.remove();
    }
  },

  isClicked: (target) => {
    var classes = target.className.split(' ');
    for (let i = 0; i < classes.length; i++) {
      if (classes[i] === 'clicked') {
        return true;
      }
    }
    return false;
  },

  checkForWinner: (player) => {
    let cells = document.getElementsByClassName(player);

    if (controller.win.row(cells) || controller.win.col(cells) || controller.win.majDiag(cells) || controller.win.minDiag(cells)) {
      model.gameOver = true;
      model.winner = player;
    }

  },

  win: {
    row: (cells) => {
      // Check if there are 3 of the same row values with 3 unique column values
      let rows = {
        0: [],
        1: [],
        2: []
      }
      for (let i = 0; i < cells.length; i++) {
        rows[cells[i].attributes.row.value].push(cells[i]);
      }
      for (let idx in rows) {
        if (rows[idx].length === 3) {
          return true
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
          console.log(winningCells[cell])
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
          console.log(winningCells[cell])
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