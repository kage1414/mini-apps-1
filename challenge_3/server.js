const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const db = require('./database.js');
const helper = require('./helper.js');

const clientPath = path.join(__dirname, 'client');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(clientPath));


app.post('/page1', (req, res) => {

  let entries = Object.entries(req.body);
  if (entries.length === 4) {

    const orderId = helper.generateRandomString(24);
    const userData = req.body;
    userData['orderId'] = orderId;

    db.addUser(userData)
      .then((response) => {
        res.cookie('orderId', response.orderId);
        res.send({
          state: {
            page: 1,
            formData: {}
          },
        });
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
        res.sendStatus(400);
      });
  } else {
    res.sendStatus(400);
  }
});

app.post('/page2', (req, res) => {

  let entries = Object.entries(req.body);
  if (entries.length === 6 || entries.length === 5 && req.body.line2 === undefined) {

    db.getUserId(req.cookies.orderId)
      .then((userId) => {
        const orderData = req.body;
        orderData['orderId'] = req.cookies.orderId;
        orderData['userId'] = userId;
        return db.addOrder(orderData);
      })
      .then((response) => {

      })
      .then((response) => {
        res.send({
          state: {
            page: 2,
            formData: {}
          }
        });
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
        res.sendStatus(400);
      });


  } else {
    res.sendStatus(400);
  }
});

app.post('/page3', (req, res) => {

  let entries = Object.entries(req.body);
  if (entries.length === 5) {

    db.getUserId(req.cookies.orderId)
      .then((userId) => {
        const orderData = req.body;
        orderData['orderId'] = req.cookies.orderId;
        orderData['userId'] = userId;
        return db.addCard(orderData);
      })
      .then((response) => {
        return db.findAllOrderData(req.cookies.orderId);
      })
      .then((orderData) => {
        orderData.user.password = '********';
        orderData.card.number = helper.hideAllButLastFour(orderData.card.number);
        orderData.card.cvv = '***';
        res.send({
          state: {
            page: 3,
            formData: {},
            orderData
          }
        });
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
        res.sendStatus(400);
      });

  } else {
    res.sendStatus(400);
  }
});

app.get('/complete', (req, res) => {

  const orderId = req.cookies.orderId;
  db.completeOrder(orderId);
  res.clearCookie('orderId');
  res.send({
    state: {
      page: 4,
      formData: {},
      orderData: {},
      success: true
    }
  });

});

app.listen(PORT, () => {
  console.log('Listening on port:', PORT);
});