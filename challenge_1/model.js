class Model {

  constructor() {
    this.moveCounter = 0;
    this.gameOver = false;
    this.winner = undefined;
    this.winnerAlerted = false;
    this.currentPlayer = 'X';
    this.board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ];
  }

  checkForWinner() {
    if (this.rowWin() || this.colWin() || this.minDiagWin() || this.majDiagWin()) {
      this.setGameOver();
    }
  }

  clickHandler(target) {

    if (!this.gameOver) {
      if (this.spaceIsFree(target)) {
        this.setSpace(target);
        this.checkForWinner();
        this.prepareNextMove();
      } else {
        view.spaceOccupied();
      }
    }

    if (this.gameOver) {
      if (!this.winnerAlerted) {
        view.alertWinner(this.winner);
        this.winnerAlerted = true;
      }
    }

    view.renderBoard();
  }

  setSpace(target) {
    let row = target.attributes.row.value;
    let column = target.attributes.column.value;
    this.board[row][column] = this.currentPlayer;
    target.innerHTML = model.currentPlayer;
  }

  spaceIsFree(target) {
    return !this.isOccupied(target) && !this.gameOver;
  }

  prepareNextMove() {
    if (this.moveCounter % 2 === 1) {
      this.currentPlayer = 'X';
    } else {
      this.currentPlayer = 'O';
    }
    this.moveCounter++;
  }

  isOccupied(target) {
    let row = target.attributes.row.value;
    let column = target.attributes.column.value;
    if (model.board[row][column] === 'X' || model.board[row][column] === 'O') {
      return true;
    }
    return false;
  }

  setGameOver() {
    this.gameOver = true;
    this.winner = this.currentPlayer;
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
