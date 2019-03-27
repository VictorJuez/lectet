const app = module.exports = require('express')();

app.get('/', (req, res) => {
  res.send({msg: 'hello! Server is up and running'});
});

//app.use('/auth', require('./auth'));
app.use('/users', require('./users'));
app.use('/authors', require('./authors'));
app.use('/books', require('./books'));
app.use('/sales', require('./sales'));
app.use('/ratings', require('./ratings'));


// the catch all route
app.all('*', (req, res) => {
  res.status(404).send({msg: 'not found'});
});