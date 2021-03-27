class View {

  constructor () {
    this.renderBoard();
    this.appendResetButton();
  }

  renderBoard() { //
    this.removeBoard();
    this.createTable();
    this.addClickHandlersToCells();
  }

  appendResetButton() { //
    const resetButton = document.createElement('button');
    resetButton.innerHTML = 'Reset';
    resetButton.setAttribute('onclick', 'controller.resetGame()');
    document.body.appendChild(resetButton);
  }

  setCellAttributes(cell, row, col) { //
    cell.setAttribute('class', 'cell');
    cell.setAttribute('style', 'height: 180px; width: 180px; text-align: center; padding: auto; font-size: 100px; background-color: #d9d9d9;');
    cell.setAttribute('row', row);
    cell.setAttribute('column', col);
    return cell;
  }

  addClickHandlersToCells() { //
    const cells = document.getElementsByClassName('cell');
    for (let i = 0; i < cells.length; i++) {
      cells[i].addEventListener('click', (e) => {
        controller.clickHandler(e.target);
      });
    }
  }

  removeBoard() { //
    if (document.getElementById('board')) {
      document.getElementById('board').remove();
    }
  }

  createTable() { //
    const table = document.createElement('table');
    table.setAttribute('id', 'board');
    for (let i = 0; i < 3; i++) {
      let row = document.createElement('tr');
      for (let j = 0; j < 3; j++) {
        let cell = document.createElement('td');
        cell.innerHTML = model.board[i][j];
        cell = this.setCellAttributes(cell, i, j);
        row.appendChild(cell);
      }

      row.setAttribute('class', i);
      table.appendChild(row);
    }
    document.body.prepend(table);
  }

  spaceOccupied() { //
    alert('Space taken. Please choose another space.');
  }

  alertWinner(winner) { //
    setTimeout(() => {
      alert(`${winner} is the winner!`);
    }, 0);
  }
}