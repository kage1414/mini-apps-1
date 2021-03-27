class Model {

  constructor () {
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
    if (controller.win.row() || controller.win.col() || controller.win.minDiag() || controller.win.majDiag()) {
      this.setGameOver();
    }
  }

  nextMove() {
    // view.renderBoard();
    if (this.moveCounter % 2 === 1) {
      this.currentPlayer = 'X';
    } else {
      this.currentPlayer = 'O';
    }
    this.moveCounter++;
  }

  setGameOver() {
    this.gameOver = true;
    this.winner = this.currentPlayer;
  }
}