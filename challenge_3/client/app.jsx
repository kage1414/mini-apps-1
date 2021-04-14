// import React from 'react';
// import ReactDom from 'react-dom';
// import axios from 'axios';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      formData: {}
    };
  }

  nextPage() {
    this.setState({
      page: this.state.page + 1
    });
  }

  findParent(value) {
    for (let page in this.state.pages) {
      for (let ele in this.state.pages[page]) {
        if (ele === value) {
          return page;
        }
      }
    }
  }

  reset() {
    this.setState({
      page: 0
    });
  }

  handleInputChange(event) {

    event.preventDefault();
    const id = event.target.id;
    let formData = this.state.formData;
    formData[id] = event.target.value;
    this.setState({formData});
  }

  handleSubmit(event) {
    event.preventDefault();

    const id = event.target.id;
    const formData = this.state.formData;

    axios.post(`/${id}`, formData)
      .then((response) => {
        this.setState(response.data.state);
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  }

  completeOrder(event) {

    axios.get('/complete')
      .then((response) => {
        this.setState(response.data.state);
      });

  }

  render() {
    return (
      <div>
        <Checkout handleSubmit={this.handleSubmit.bind(this)} page={this.state.page} handleInputChange={this.handleInputChange.bind(this)} formData={this.state.formData} completeOrder={this.completeOrder.bind(this)} orderData={this.state.orderData} success={this.state.success} reset={this.reset.bind(this)} />
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
      <F3 handleSubmit={this.props.handleSubmit} handleInputChange={this.props.handleInputChange} />,
      <Confirmation formData={this.props.formData} completeOrder={this.props.completeOrder} orderData={this.props.orderData} />,
      <Success success={this.props.success} reset={this.props.reset} />
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
        <label for="firstName">First Name</label>
        <input type="text" id="firstName" onChange={props.handleInputChange}/>
        <br/>
        <label for="lastName">Last Name</label>
        <input type="text" id="lastName" onChange={props.handleInputChange} />
        <br />
        <label for="email">Email</label>
        <input type="text" id="email" onChange={props.handleInputChange}/>
        <br />
        <label for="password">Password</label>
        <input type="password" id="password" onChange={props.handleInputChange}/>
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
        <input type="text" id="expiryMonth" onChange={props.handleInputChange} placeholder="month"/>
        <input type="text" id="expiryYear" onChange={props.handleInputChange} placeholder="year"/>
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

const Confirmation = (props) => {

  return (
    <div>
      <div>
        <br/>
        First: {props.orderData.user.first_name}
        <br/>
        Last: {props.orderData.user.last_name}
        <br/>
        Email: {props.orderData.user.email}
        <br/>
        Password: {props.orderData.user.password}
      </div>
      <div>
        <br/>
        Address Line 1: {props.orderData.order.line_1}
        <br/>
        Address Line 2: {props.orderData.order.line_2}
        <br/>
        City: {props.orderData.order.city}
        <br/>
        State: {props.orderData.order.state}
        <br/>
        Zipcode: {props.orderData.order.zipcode}
        <br/>
        Phone: {props.orderData.order.phone}
      </div>
      <div>
        <br/>
        Card Number: {props.orderData.card.number}
        <br/>
        CVV: {props.orderData.card.cvv}
        <br/>
        Expiration: {props.orderData.card.expiry_month}/{props.orderData.card.expiry_year}
        <br/>
        Billing Zipcode: {props.orderData.card.zipcode}
      </div>
      <button onClick={props.completeOrder}>Submit Order</button>
    </div>
  );

};

const Success = (props) => {

  if (props.success) {
    return (
      <div>
        <div>Order Complete!</div>
        <button onClick={props.reset}>Begin a new order</button>
      </div>
    );
  } else {
    return (
      <div>
        <div>Order Failed!</div>
        <button onClick={props.reset}>Restart Order</button>
      </div>
    );
  }
};

ReactDOM.render(<App />, document.getElementById('app'));
