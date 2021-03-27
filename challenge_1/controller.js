class Controller {

  constructor() {

  }

  resetGame() {
    model = new Model();
    view.renderBoard();
  }

  clickHandler(target) { //
    this.move(target);
  }

  move(target) { //

    if (!model.gameOver) {
      if (this.spaceIsFree(target)) {
        this.setSpace(target);
        this.checkForWinner();
        this.prepareNextMove();
        view.renderBoard();
      } else {
        view.spaceOccupied();
      }
    }

    if (model.gameOver) {
      if (!model.winnerAlerted) {
        view.alertWinner(model.winner);
        model.winnerAlerted = true;
      }
    }

  }

  checkForWinner() { //
    if (this.rowWin() || this.colWin() || this.minDiagWin() || this.majDiagWin()) {
      this.setGameOver();
    }
  }

  setSpace(target) { //
    const row = target.attributes.row.value;
    const column = target.attributes.column.value;
    model.board[row][column] = model.currentPlayer;
    target.innerHTML = model.currentPlayer;
  }

  spaceIsFree(target) { //
    return !this.isOccupied(target) && !model.gameOver;
  }

  prepareNextMove() { //
    if (model.moveCounter % 2 === 1) {
      model.currentPlayer = 'X';
    } else {
      model.currentPlayer = 'O';
    }
    model.moveCounter++;
  }

  isOccupied(target) { //
    const row = target.attributes.row.value;
    const column = target.attributes.column.value;
    if (model.board[row][column] === 'X' || model.board[row][column] === 'O') {
      return true;
    }
    return false;
  }

  setGameOver() {
    model.gameOver = true;
    model.winner = model.currentPlayer;
  }

  rowWin() {
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
  }

  colWin () {
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
  }

  majDiagWin () {
    for (let i = 0; i < model.board.length; i++) {
      if (model.board[i][(model.board.length - 1) - i] !== model.currentPlayer) {
        break;
      } else if (i === model.board.length - 1 && model.board[i][(model.board.length - 1) - i] === model.currentPlayer) {
        return true;
      }
    }
    return false;
  }

  minDiagWin () {
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