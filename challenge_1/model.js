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

  move(target) {

    if (!this.gameOver) {
      if (this.spaceIsFree(target)) {
        this.setSpace(target);
        this.checkForWinner();
        this.prepareNextMove();
        view.renderBoard();
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

  }

  setSpace(target) {
    const row = target.attributes.row.value;
    const column = target.attributes.column.value;
    this.board[row][column] = this.currentPlayer;
    target.innerHTML = this.currentPlayer;
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
    const row = target.attributes.row.value;
    const column = target.attributes.column.value;
    if (this.board[row][column] === 'X' || this.board[row][column] === 'O') {
      return true;
    }
    return false;
  }

  setGameOver() {
    this.gameOver = true;
    this.winner = this.currentPlayer;
  }

  rowWin() {
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        if (this.board[i][j] !== this.currentPlayer) {
          break;
        } else if (this.board[i][j] === this.currentPlayer && j === this.board[i].length - 1) {
          return true;
        }
      }
    }
    return false;
  }

  colWin () {
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        if (this.board[j][i] !== this.currentPlayer) {
          break;
        } else if (this.board[j][i] === this.currentPlayer && j === this.board[j].length - 1) {
          return true;
        }
      }
    }
    return false;
  }

  majDiagWin () {
    for (let i = 0; i < this.board.length; i++) {
      if (this.board[i][(this.board.length - 1) - i] !== this.currentPlayer) {
        break;
      } else if (i === this.board.length - 1 && this.board[i][(this.board.length - 1) - i] === this.currentPlayer) {
        return true;
      }
    }
    return false;
  }

  minDiagWin () {
    for (let i = 0; i < this.board.length; i++) {
      if (this.board[i][i] !== this.currentPlayer) {
        break;
      } else if (i === this.board.length - 1 && this.board[i][i] === this.currentPlayer) {
        return true;
      }
    }
    return false;
  }

}
