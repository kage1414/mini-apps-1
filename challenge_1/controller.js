class Controller {

  resetGame() {
    model = new Model();
    view.renderBoard();
  }

  clickHandler(target) {
    this.move(target);
  }

  move(target) {

    if (!model.gameOver) {
      if (this.spaceIsFree(target)) {
        this.setSpace(target);
        this.prepareNextMove();
        this.checkForWinner();
        this.checkForTie();
        view.renderBoard();
      } else {
        view.spaceOccupied();
      }
    }

    if (model.gameOver && !model.winnerAlerted) {
      if (model.winner) {
        view.alertWinner(model.winner);
        model.winnerAlerted = true;
      }
      if (model.tie) {
        view.alertTie();
        model.winnerAlerted = true;
      }
    }

  }

  setSpace(target) {
    const row = target.attributes.row.value;
    const column = target.attributes.column.value;
    model.board[row][column] = model.currentPlayer;
    target.innerHTML = model.currentPlayer;
  }

  spaceIsFree(target) {
    return !this.isOccupied(target) && !model.gameOver;
  }

  isOccupied(target) {
    const row = target.attributes.row.value;
    const column = target.attributes.column.value;
    if (model.board[row][column] === 'X' || model.board[row][column] === 'O') {
      return true;
    }
    return false;
  }

  prepareNextMove() {
    if (model.moveCounter % 2 === 1) {
      model.currentPlayer = 'X';
    } else {
      model.currentPlayer = 'O';
    }
    model.moveCounter++;
  }

  checkForWinner() {
    if (this.rowWin() || this.colWin() || this.minDiagWin() || this.majDiagWin()) {
      this.setGameOver();
    }
  }

  checkForTie() {
    if (model.moveCounter === 9) {
      this.setTie();
    }
  }

  setGameOver() {
    model.gameOver = true;
    model.winner = model.currentPlayer;
  }

  setTie() {
    model.tie = true;
    model.gameOver = true;
  }

  allSpacesOccupied() {
    for (let i = 0; i < model.board.length; i++) {
      for (let j = 0; j < model.board[i].length; j++) {
        if (model.board[i][j] === '') {
          return false;
        }
      }
    }
    return true;
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