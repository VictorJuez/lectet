const app = module.exports = require('express')();
const authorController = require('../actions').authors;

app.get('/:id', authorController.getAuthorById)