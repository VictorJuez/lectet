const app = module.exports = require('express')();
const cartController = require('../actions/carts');
const passport = require('passport');
const passportConf = require('../helpers/passport');

const passportJWT = passport.authenticate('jwt',{ session: false });

app.get('/', passportJWT, cartController.getCart);
app.post('/', passportJWT, cartController.createCart);
app.get('/:cartId', passportJWT, cartController.getCartById);
app.post('/:bookId', passportJWT, cartController.addBookToCart);
