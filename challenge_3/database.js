const Sequelize = require('sequelize');
const config = require('./config');
const db = new Sequelize('checkout', config.username, config.password, {
  host: 'localhost',
  dialect: 'mysql'
});

const User = db.define('users', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  'first_name': {
    type: Sequelize.STRING,
    unique: true
  },
  'last_name': {
    type: Sequelize.STRING,
    unique: true
  },
  email: {
    type: Sequelize.STRING,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    unique: true
  },
  orderId: Sequelize.STRING
}, {
  timestamps: false
});

const Card = db.define('cards', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  number: Sequelize.STRING,
  'expiry_month': Sequelize.STRING,
  'expiry_year': Sequelize.STRING,
  cvv: Sequelize.STRING,
  user: Sequelize.INTEGER,
  zipcode: Sequelize.STRING,
  orderId: Sequelize.STRING
}, {
  timestamps: false
});

const Order = db.define('orders', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  'line_1': Sequelize.STRING,
  'line_2': Sequelize.STRING,
  city: Sequelize.STRING,
  state: Sequelize.STRING,
  zipcode: Sequelize.STRING,
  phone: Sequelize.STRING,
  user: Sequelize.INTEGER,
  completed: Sequelize.BOOLEAN,
  orderId: Sequelize.STRING
}, {
  timestamps: false
});

////////////////////////////////////////
//************************************//
////////////////////////////////////////

module.exports.addUser = (formData) => {

  const data = {
    'first_name': formData.firstName,
    'last_name': formData.lastName,
    email: formData.email,
    password: formData.password,
    orderId: formData.orderId
  };

  return User.findOrCreate({
    where: data
  })
    .then((response) => {
      return response[0].dataValues;
    })
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    });

};

module.exports.getUserId = (orderId) => {

  return User.findAll({
    attributes: ['id'],
    where: {orderId: orderId}
  })
    .then((response) => {
      return response[0].dataValues.id;
    });

};

module.exports.addOrder = (formData) => {

  const data = {
    'line_1': formData.line1,
    'line_2': formData.line2,
    city: formData.city,
    state: formData.state,
    zipcode: formData.shippingZip,
    phone: formData.phone,
    user: formData.userId,
    orderId: formData.orderId
  };

  return Order.create(data);

};

module.exports.addCard = (formData) => {

  const data = {
    number: formData.cardNumber,
    'expiry_month': formData.expiryMonth,
    'expiry_year': formData.expiryYear,
    cvv: formData.cvv,
    zipcode: formData.billingZip,
    user: formData.userId,
    orderId: formData.orderId
  };

  return Card.create(data);

};

module.exports.findAllOrderData = (orderId) => {

  let user;
  let card;
  let order;

  return User.findAll({
    where: {orderId}
  })
    .then((response) => {
      user = response[0].dataValues;
      return Card.findAll({
        where: {orderId}
      });
    })
    .then((response) => {
      card = response[0].dataValues;
      return Order.findAll({
        where: {orderId}
      });
    })
    .then((response) => {
      order = response[0].dataValues;
      const orderData = {user, card, order};
      return orderData;
    });

};

module.exports.completeOrder = (orderId) => {

  Order.findAll({
    where: {orderId}
  })
    .then((order) => {
      if (order[0]) {
        order[0].update({
          completed: true
        });
      }
    });

  User.findAll({
    where: {orderId}
  })
    .then((user) => {
      if (user[0]) {
        user[0].update({
          completed: true
        });
      }
    });

};