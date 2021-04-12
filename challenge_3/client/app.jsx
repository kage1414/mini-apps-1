// import React from 'react';
// import ReactDom from 'react-dom';
// import axios from 'axios';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      page: 0,
    };
  }

  increment() {
    this.setState({
      page: this.state.page + 1
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.increment.bind(this)}/>
        <Checkout page={this.state.page}/>
      </div>
    );
  }
}

class Checkout extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {

    const steps = [
      <F1 />,
      <F2 />,
      <F3 />
    ];

    return (
      <div>
        <span>Checkout</span>
        {steps[this.props.page]}
      </div>
    );
  }
}

const F1 = (props) => {

  return (
    <div>
      <form>
        <span>Name: </span>
        <input type="text" id="name"/>
        <br/>
        <span>Email: </span>
        <input type="text" id="email" />
        <br/>
        <span>Password: </span>
        <input type="password" id="password" />
      </form>
    </div>
  );
};

const F2 = (props) => {

  return (
    <div>F2</div>
  );
};

const F3 = (props) => {

  return (
    <div>F3</div>
  );
};

const Summary = (props) => {

};

const Next = (props) => {

};

ReactDOM.render(<App />, document.getElementById('app'));
