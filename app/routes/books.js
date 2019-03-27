const app = module.exports = require('express')();
const db = require('../actions').books;

app.get('/', db.getBooks)
app.get('/:id', db.getBookById)
app.post('/', db.createBook)
app.put('/:id', db.updateBook)
app.delete('/:id', db.deleteBook)

