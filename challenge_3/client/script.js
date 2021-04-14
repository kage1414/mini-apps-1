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
    this.setState({
      formData
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const id = event.target.id;
    const formData = this.state.formData;
    axios.post(`/${id}`, formData).then(response => {
      this.setState(response.data.state);
    }).catch(err => {
      if (err) {
        console.log(err);
      }
    });
  }

  completeOrder(event) {
    axios.get('/complete').then(response => {
      this.setState(response.data.state);
    });
  }

  render() {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Checkout, {
      handleSubmit: this.handleSubmit.bind(this),
      page: this.state.page,
      handleInputChange: this.handleInputChange.bind(this),
      formData: this.state.formData,
      completeOrder: this.completeOrder.bind(this),
      orderData: this.state.orderData,
      success: this.state.success,
      reset: this.reset.bind(this)
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
    }), /*#__PURE__*/React.createElement(Confirmation, {
      formData: this.props.formData,
      completeOrder: this.props.completeOrder,
      orderData: this.props.orderData
    }), /*#__PURE__*/React.createElement(Success, {
      success: this.props.success,
      reset: this.props.reset
    })];
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", null, "Checkout"), steps[this.props.page]);
  }

}

const F1 = props => {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("form", {
    onSubmit: props.handleSubmit,
    id: "page1"
  }, /*#__PURE__*/React.createElement("label", {
    for: "firstName"
  }, "First Name"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: "firstName",
    onChange: props.handleInputChange
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("label", {
    for: "lastName"
  }, "Last Name"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: "lastName",
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
    id: "expiryMonth",
    onChange: props.handleInputChange,
    placeholder: "month"
  }), /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: "expiryYear",
    onChange: props.handleInputChange,
    placeholder: "year"
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

const Confirmation = props => {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("br", null), "First: ", props.orderData.user.first_name, /*#__PURE__*/React.createElement("br", null), "Last: ", props.orderData.user.last_name, /*#__PURE__*/React.createElement("br", null), "Email: ", props.orderData.user.email, /*#__PURE__*/React.createElement("br", null), "Password: ", props.orderData.user.password), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("br", null), "Address Line 1: ", props.orderData.order.line_1, /*#__PURE__*/React.createElement("br", null), "Address Line 2: ", props.orderData.order.line_2, /*#__PURE__*/React.createElement("br", null), "City: ", props.orderData.order.city, /*#__PURE__*/React.createElement("br", null), "State: ", props.orderData.order.state, /*#__PURE__*/React.createElement("br", null), "Zipcode: ", props.orderData.order.zipcode, /*#__PURE__*/React.createElement("br", null), "Phone: ", props.orderData.order.phone), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("br", null), "Card Number: ", props.orderData.card.number, /*#__PURE__*/React.createElement("br", null), "CVV: ", props.orderData.card.cvv, /*#__PURE__*/React.createElement("br", null), "Expiration: ", props.orderData.card.expiry_month, "/", props.orderData.card.expiry_year, /*#__PURE__*/React.createElement("br", null), "Billing Zipcode: ", props.orderData.card.zipcode), /*#__PURE__*/React.createElement("button", {
    onClick: props.completeOrder
  }, "Submit Order"));
};

const Success = props => {
  if (props.success) {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", null, "Order Complete!"), /*#__PURE__*/React.createElement("button", {
      onClick: props.reset
    }, "Begin a new order"));
  } else {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", null, "Order Failed!"), /*#__PURE__*/React.createElement("button", {
      onClick: props.reset
    }, "Restart Order"));
  }
};

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById('app'));
