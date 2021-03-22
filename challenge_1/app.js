let moveCounter;
let init = {

  appendResetButton: () => {
    let resetButton = document.createElement('button');
    resetButton.innerHTML = 'Reset';
    resetButton.setAttribute('onclick', 'resetDOM()');
    document.body.appendChild(resetButton);
  },

  appendBoard: () => {
    let table = document.createElement('table');
    document.body.appendChild(table);
    let i = 0;
    while (i < 3) {
      let row = document.createElement('tr');

      let j = 0;
      while (j < 3) {
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
  addClickHandlersToCells: () => {
    let cells = document.getElementsByClassName('cell')
    for (let i = 0; i < cells.length; i++) {
      cells[i].addEventListener('click', (e) => {
        clickHandler(e.target)
      })
    }
  }
}

let initialize = () => {
  init.appendResetButton();
  init.appendBoard();
  init.addClickHandlersToCells();
  moveCounter = 0;
}

let isClicked = (target) => {
  var classes = target.className.split(' ');
  for (let i = 0; i < classes.length; i++) {
    if (classes[i] === 'clicked') {
      return true;
    }
  }
  return false;
}

let clickHandler = (target) => {

  if (!isClicked(target)) {
  target.className += ' clicked';

    if (moveCounter % 2 === 0) {
      target.innerHTML = 'X'
    } else {
      target.innerHTML = 'O';
    }
    moveCounter++;
  } else {
    alert('Choose another space')
  }

};

let resetDOM = () => {
  while (document.body.firstChild) {
    document.body.firstChild.remove();
  }
  initialize()
}

initialize();