// import React from 'react';
// import ReactDom from 'react-dom';
// import axios from 'axios';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      page: 0
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
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Checkout, {
      handleSubmit: this.handleSubmit.bind(this),
      page: this.state.page,
      handleInputChange: this.handleInputChange.bind(this)
    }));
  }

}

class Checkout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const steps = [/*#__PURE__*/React.createElement(F1, {
      handleSubmit: this.props.handleSubmit,
      handleInputChange: this.props.handleInputChange
    }), /*#__PURE__*/React.createElement(F2, {
      handleSubmit: this.props.handleSubmit,
      handleInputChange: this.props.handleInputChange
    }), /*#__PURE__*/React.createElement(F3, {
      handleSubmit: this.props.handleSubmit,
      handleInputChange: this.props.handleInputChange
    })];
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", null, "Checkout"), steps[this.props.page]);
  }

}

const F1 = props => {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("form", {
    onSubmit: props.handleSubmit,
    id: "page1"
  }, /*#__PURE__*/React.createElement("label", {
    for: "name"
  }, "Name"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: "name",
    onChange: props.handleInputChange
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("label", {
    for: "email"
  }, "Email"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: "email",
    onChange: props.handleInputChange
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("label", {
    for: "password"
  }, "Password"), /*#__PURE__*/React.createElement("input", {
    type: "password",
    id: "password",
    onChange: props.handleInputChange
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
    type: "submit"
  })));
};

const F2 = props => {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("form", {
    onSubmit: props.handleSubmit,
    id: "page2"
  }, /*#__PURE__*/React.createElement("label", {
    for: "line1"
  }, "Address Line 1"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: "line1",
    onChange: props.handleInputChange
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("label", {
    for: "line2"
  }, "Address Line 2"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: "line2",
    onChange: props.handleInputChange
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("label", {
    for: "city"
  }, "City"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: "city",
    onChange: props.handleInputChange
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("label", {
    for: "state"
  }, "State"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: "state",
    onChange: props.handleInputChange
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("label", {
    for: "shippingZip"
  }, "Zip Code"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: "shippingZip",
    onChange: props.handleInputChange
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("label", {
    for: "phone"
  }, "Phone Number"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: "phone",
    onChange: props.handleInputChange
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
    type: "submit"
  })));
};

const F3 = props => {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("form", {
    onSubmit: props.handleSubmit,
    id: "page3"
  }, /*#__PURE__*/React.createElement("label", {
    for: "cardNumber"
  }, "Credit Card #"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: "cardNumber",
    onChange: props.handleInputChange
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("label", {
    for: "expiry"
  }, "Expiration"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: "expiry",
    onChange: props.handleInputChange
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("label", {
    for: "cvv"
  }, "CVV"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: "cvv",
    onChange: props.handleInputChange
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("label", {
    for: "billingZip"
  }, "Billing Zipcode"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: "billingZip",
    onChange: props.handleInputChange
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
    type: "submit"
  })));
};

const Summary = props => {};

const Next = props => {};

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById('app'));
