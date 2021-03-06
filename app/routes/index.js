const app = module.exports = require('express')();
var express = require('express');

app.use('/', express.static('app/public/backend'));

//app.use('/auth', require('./auth'));
app.use('/user', require('./users'));
app.use('/authors', require('./authors'));
app.use('/books', require('./books'));
app.use('/events', require('./events'));
app.use('/orders', require('./orders'));
app.use('/cart', require('./carts'));


// the catch all route
app.all('*', (req, res) => {
  res.status(404).send({msg: 'not found'});
});