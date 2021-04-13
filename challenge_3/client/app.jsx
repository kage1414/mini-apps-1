// import React from 'react';
// import ReactDom from 'react-dom';
// import axios from 'axios';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
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

  handleInputChange(event) {

    event.preventDefault();
    const id = event.target.id;
    let formData = this.state.formData;
    formData[id] = event.target.value;
    this.setState({formData});
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('submit');

    const id = event.target.id;
    const data = this.state.formData;

    axios.post(`/${id}`, data)
      .then((response) => {
        console.log(response);
        if (response.data) {
          this.setState({
            page: response.data.page
          });
        } else {
          this.setState({
            error: true
          });
        }
      });
  }

  render() {
    return (
      <div>
        <Checkout handleSubmit={this.handleSubmit.bind(this)} page={this.state.page} handleInputChange={this.handleInputChange.bind(this)} formData={this.state.formData} />
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
      <Confirmation formData={this.props.formData} />
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

const Confirmation = (props) => {
  console.log(props);

  let entries = Object.entries(props.formData);

  return (
    <div>
      {entries.map(entry => (<Page entry={entry} key={JSON.stringify(entry)} />))}
    </div>
  );

};

const Page = (props) => {

  return (
    <div>
      <span>{props.entry[0]}</span>
      <span>{props.entry[1]}</span>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
