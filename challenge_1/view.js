class View {

  constructor () {
    this.renderBoard();
    this.appendResetButton();
  }

  renderBoard() {
    // Written while using DOM to track moves. Will refactor to render and reflect model.board.
    this.removeBoard;
    this.createNewTable();
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
  }

  removeBoard() {
    if (document.getElementById('board')) {
      document.getElementById('board').remove();
    }
  }

  createNewTable() {
    let table = document.createElement('table');
    table.setAttribute('id', 'board');
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
    document.body.prepend(table);
  }

}