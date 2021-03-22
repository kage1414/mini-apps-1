let model = {
  moveCounter: 0,
  gameOver: false,
  winner: undefined
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

    if (!controller.isClicked(target)) {
      target.className += ' clicked';
      let player;
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
    } else {
      alert('Choose another space')
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

    // console.log(cells)

    if (controller.win.row(cells) || controller.win.col(cells) || controller.win.majDiag(cells) || controller.win.minDiag(cells)) {
      model.gameOver = true;
      model.winner = player;
      alert(`${player.toUpperCase()} is the winner!`);
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
        console.log(columns[idx])
        if (columns[idx].length === 3) {
          return true
        }
      }
      return false;
    },
    majDiag: (cells) => {
      //
    },
    minDiag: (cells) => {
      // Check if there are 3 cells each with equivalent row and column values
    }
  },

  initialize: (boardSize = 3) => {
    view.appendResetButton();
    view.appendBoard(boardSize);
    controller.addClickHandlersToCells();
    model.moveCounter = 0;
  }
}

controller.initialize();