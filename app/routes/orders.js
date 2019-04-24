const app = module.exports = require('express')();
const orderController = require('../actions/orders');
const passport = require('passport');
const passportConf = require('../passport');

const passportJWT = passport.authenticate('jwt',{ session: false });

app.get('/', passportJWT, orderController.getAllOrders);
app.post('/', passportJWT, orderController.createOrder);
app.get('/:orderId', passportJWT, orderController.getOrderById);

