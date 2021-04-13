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
    this.setState({
      formData
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const id = event.target.id;
    const data = this.state.formData;
    axios.post(`/${id}`, data).then(response => {
      console.log(typeof response.data);
    });
    this.setState({
      formData: {}
    });
  }

  render() {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Checkout, {
      handleSubmit: this.handleSubmit.bind(this),
      page: this.state.page,
      handleInputChange: this.handleInputChange.bind(this),
      pages: this.state.pages
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
      pages: this.props.pages
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

const Confirmation = props => {
  let objects = Object.values(props.pages);
  return /*#__PURE__*/React.createElement("div", null, objects.map(obj => /*#__PURE__*/React.createElement(Page, {
    page: obj,
    key: JSON.stringify(obj)
  })));
};

const Page = props => {
  let entries = Object.entries(props.page);
  return /*#__PURE__*/React.createElement("div", null, entries.map(entry => /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", null, entry[0]), /*#__PURE__*/React.createElement("span", null, ": "), /*#__PURE__*/React.createElement("span", null, entry[1]))));
};

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById('app'));
