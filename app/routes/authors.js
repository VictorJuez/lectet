const app = module.exports = require('express')();
const db = require('../actions/authors');

app.get('/', db.getAuthors)
app.get('/:id', db.getAuthorById)
app.post('/', db.createAuthor)
app.put('/:id', db.updateAuthor)
app.delete('/:id', db.deleteAuthor)