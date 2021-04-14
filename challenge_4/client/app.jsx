import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Test Test Test</h1>
        <Table />
      </div>
    );
  }
}

class Table extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <h2>SubTest</h2>
    );
  }

}

ReactDOM.render(<App />, document.getElementById('app'));