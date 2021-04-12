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
  }

  increment() {
    this.setState({
      page: this.state.page + 1
    });
  }

  render() {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
      onClick: this.increment.bind(this)
    }), /*#__PURE__*/React.createElement(Checkout, {
      page: this.state.page
    }));
  }

}

class Checkout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const steps = [/*#__PURE__*/React.createElement(F1, null), /*#__PURE__*/React.createElement(F2, null), /*#__PURE__*/React.createElement(F3, null)];
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", null, "Checkout"), steps[this.props.page]);
  }

}

const F1 = props => {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", null, "Name: "), /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: "name"
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", null, "Email: "), /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: "email"
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", null, "Password: "), /*#__PURE__*/React.createElement("input", {
    type: "password",
    id: "password"
  }));
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
