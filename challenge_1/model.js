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
}
