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
    this.pages = {
      page1: ['name', 'email', 'password'],
      page2: ['line1', 'line2', 'city', 'state', 'shippingZip', 'phone'],
      page3: ['cardNumber', 'expiry', 'cvv', 'billingZip']
    };
  }

  nextPage() {
    this.setState({
      page: this.state.page + 1
    });
  }

  handleInputChange(event) {
    event.preventDefault();
    let obj = {};
    let key = event.target.id;
    let value = event.target.value;
    obj[key] = value;
    this.setState(obj);
  }

  handleSubmit(event) {
    this.setState({
      error: false
    });
    event.preventDefault();

    let pageNumber = event.target.id;
    let inputs = this.pages[pageNumber];

    for (let i = 0; i < inputs.length; i++) {
      let input = inputs[i];
      console.log(this.state)
      if (!this.state[input]) {
        this.setState({
          error: true
        });
        console.log(inputs[i]);
        return;
      }
    }

    this.nextPage();
  }

  render() {
    return (
      <div>
        <Checkout handleSubmit={this.handleSubmit.bind(this)} page={this.state.page} handleInputChange={this.handleInputChange.bind(this)} />
      </div>
    );
  }
}

class Checkout extends React.Component {

  constructor(props) {
    super(props);
    // this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    event.preventDefault();
    let obj = {};
    let key = event.target.id;
    let value = event.target.value;
    obj[key] = value;
    this.setState(obj);
  }

  render() {

    const steps = [
      <F1 handleSubmit={this.props.handleSubmit} handleInputChange={this.props.handleInputChange} />,
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
      <form onSubmit={props.handleSubmit} id="page1">
        <label for="name">Name</label>
        <input type="text" id="name" onChange={props.handleInputChange} />
        <br/>
        <label for="email">Email</label>
        <input type="text" id="email" onChange={props.handleInputChange} />
        <br />
        <label for="name">Password</label>
        <input type="password" id="password" onChange={props.handleInputChange} />
        <br />
        <input type="submit" ></input>
      </form >
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
