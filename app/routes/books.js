const app = module.exports = require('express')();

app.get('/books', db.getBooks)
app.get('/books/:id', db.getBookById)
app.post('/books', db.createBook)
app.put('/books/:id', db.updateBook)
app.delete('/books/:id', db.deleteBook)

