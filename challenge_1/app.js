let model = {
  moveCounter: 0,
  gameOver: false;
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
        cell.setAttribute('class', j);
        cell.setAttribute('class', 'cell');
        cell.setAttribute('id', i.toString() + j.toString());
        cell.setAttribute('style', 'height: 200px; width: 200px; text-align: center; vertical-align: sub; font-size: 100px; background-color: #d9d9d9;');
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

      if (model.moveCounter % 2 === 0) {
        target.innerHTML = 'X'
      } else {
        target.innerHTML = 'O';
      }
      model.moveCounter++;
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

  initialize: (boardSize = 3) => {
    view.appendResetButton();
    view.appendBoard(boardSize);
    controller.addClickHandlersToCells();
    model.moveCounter = 0;
  }
}

controller.initialize();