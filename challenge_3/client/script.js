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
    let pageNumber = event.target.id;
    let inputs = this.pages[pageNumber];

    for (let i = 0; i < inputs.length; i++) {
      let input = inputs[i];
      console.log(this.state);

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
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Checkout, {
      handleSubmit: this.handleSubmit.bind(this),
      page: this.state.page,
      handleInputChange: this.handleInputChange.bind(this)
    }));
  }

}

class Checkout extends React.Component {
  constructor(props) {
    super(props); // this.handleInputChange = this.handleInputChange.bind(this);
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
    const steps = [/*#__PURE__*/React.createElement(F1, {
      handleSubmit: this.props.handleSubmit,
      handleInputChange: this.props.handleInputChange
    }), /*#__PURE__*/React.createElement(F2, null), /*#__PURE__*/React.createElement(F3, null)];
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
    for: "name"
  }, "Password"), /*#__PURE__*/React.createElement("input", {
    type: "password",
    id: "password",
    onChange: props.handleInputChange
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
    type: "submit"
  })));
};

const F2 = props => {
  return /*#__PURE__*/React.createElement("div", null, "F2");
};

const F3 = props => {
  return /*#__PURE__*/React.createElement("div", null, "F3");
};

const Summary = props => {};

const Next = props => {};

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById('app'));
