const app = module.exports = require('express')();

app.get('/authors', db.getAuthors)
app.get('/authors/:id', db.getAuthorById)
app.post('/authors', db.createAuthor)
app.put('/authors/:id', db.updateAuthor)
app.delete('/authors/:id', db.deleteAuthor)