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

    let goOn = true;

    let pageNumber = event.target.id;
    let inputs = this.pages[pageNumber];

    for (let i = 0; i < inputs.length; i++) {
      let input = inputs[i];
      if (!this.state[input]) {
        console.log(input);
        this.setState({
          error: true
        });
        console.log(inputs[i]);
        goOn = false;
        return;
      }
    }

    if (goOn) {
      this.nextPage();
    }
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
  }

  render() {

    const steps = [
      <F1 handleSubmit={this.props.handleSubmit} handleInputChange={this.props.handleInputChange} />,
      <F2 handleSubmit={this.props.handleSubmit} handleInputChange={this.props.handleInputChange} />,
      <F3 handleSubmit={this.props.handleSubmit} handleInputChange={this.props.handleInputChange} />
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
        <label for="password">Password</label>
        <input type="password" id="password" onChange={props.handleInputChange} />
        <br />
        <input type="submit" ></input>
      </form >
    </div>
  );
};

const F2 = (props) => {

  return (
    <div>
      <form onSubmit={props.handleSubmit} id="page2">
        <label for="line1">Address Line 1</label>
        <input type="text" id="line1" onChange={props.handleInputChange} />
        <br />
        <label for="line2">Address Line 2</label>
        <input type="text" id="line2" onChange={props.handleInputChange} />
        <br />
        <label for="city">City</label>
        <input type="text" id="city" onChange={props.handleInputChange} />
        <br/>
        <label for="state">State</label>
        <input type="text" id="state" onChange={props.handleInputChange} />
        <br />
        <label for="shippingZip">Zip Code</label>
        <input type="text" id="shippingZip" onChange={props.handleInputChange} />
        <br />
        <label for="phone">Phone Number</label>
        <input type="text" id="phone" onChange={props.handleInputChange} />
        <br />
        <input type="submit" ></input>
      </form >
    </div>
  );
};

const F3 = (props) => {

  return (
    <div>
      <form onSubmit={props.handleSubmit} id="page3">
        <label for="cardNumber">Credit Card #</label>
        <input type="text" id="cardNumber" onChange={props.handleInputChange} />
        <br />
        <label for="expiry">Expiration</label>
        <input type="text" id="expiry" onChange={props.handleInputChange} />
        <br />
        <label for="cvv">CVV</label>
        <input type="text" id="cvv" onChange={props.handleInputChange} />
        <br />
        <label for="billingZip">Billing Zipcode</label>
        <input type="text" id="billingZip" onChange={props.handleInputChange} />
        <br />
        <input type="submit" ></input>
      </form >
    </div>
  );
};

const Summary = (props) => {

};

const Next = (props) => {

};

ReactDOM.render(<App />, document.getElementById('app'));
