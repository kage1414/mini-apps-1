import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      board: [
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '']
      ],
      colors: [
        [' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ']
      ],
      currentColor: 'Yellow',
      nextColor: 'Red',
      winner: null,
      tie: false
    };
  }

  move(event) {
    if (!this.state.winner && !this.state.tie) {

      let currentState = {
        coord: event.currentTarget.dataset.coordinate.split(','),
        board: this.state.board,
        colors: this.state.colors,
        currentColor: this.state.currentColor,
        nextColor: this.state.nextColor
      };

      axios.post('/move', currentState)
        .then((response) => {
          this.setState(response.data.state);
        })
        .catch((error) => {
          alert(error.response.data);
        });
    } else {
      alert(`Game Over! ${this.state.winner ? this.state.winner + ' is the Winner!' : 'Tie!'}\nRefresh Page To Begin New Game`);
    }
  }

  render() {
    return (
      <div>
        <h1>Connect Four</h1>
        <h3>Click a Column</h3>
        {this.state.winner &&
          <Winner winner={this.state.winner} />}
        {this.state.tie &&
          <Tie />}
        <Table board={this.state.board} move={this.move.bind(this)} colors={this.state.colors}/>
      </div>
    );
  }
}

const Table = (props) => {

  return (
    <div>
      <table>
        <tbody>
          {props.board.map((row, idx) => {
            return <Row row={row} x={idx} key={'row' + idx} move={props.move} colors={props.colors} board={props.board} />;
          })}
        </tbody>
      </table>
    </div>
  );

};

const Row = (props) => {

  return (
    <tr>
      {props.row.map((cell, idx) => {
        let coordinate = [props.x, idx];
        return <Cell cell={cell} y={idx} x={props.x} coordinate={coordinate} colors={props.colors} key={props.board[props.x][idx] + 'col' + idx} move={props.move} />;
      })}
    </tr>
  );

};

const Cell = (props) => {

  return (
    <td data-coordinate={props.coordinate} onClick={props.move} style={{color: props.colors[props.coordinate[0]][props.coordinate[1]]}}>{props.cell}</td>
  );

};

const Winner = (props) => {
  return (
    <div>{props.winner} is the winner!</div>
  );
};

const Tie = (props) => {
  return (
    <div>Tie!</div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));