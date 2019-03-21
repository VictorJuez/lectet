/**
 **********************************
 * THIS IS THE MAIN SERVER FILE   *
 **********************************
**/

// Libraries and global variables
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3000 // When app executed on local machine, port = 3000, when on Heroku, port = process.env.PORT
const db = require('./queries')       // Database configuration and methods

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

// API routes
app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API!' })
  })

// USERS routes
app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

// AUTHORS routes
app.get('/authors', db.getAuthors)
app.get('/authors/:id', db.getAuthorById)
app.post('/authors', db.createAuthor)
app.put('/authors/:id', db.updateAuthor)
app.delete('/authors/:id', db.deleteAuthor)

// BOOKS routes
app.get('/books', db.getBooks)
app.get('/books/:id', db.getBookById)
app.post('/books', db.createBook)
app.put('/books/:id', db.updateBook)
app.delete('/books/:id', db.deleteBook)

// SALES routes
app.get('/sales', db.getSales)
app.get('/sales/:id', db.getSaleById)
app.post('/sales', db.createSale)
app.put('/sales/:id', db.updateSale)
app.delete('/sales/:id', db.deleteSale)

// RATINGS routes
app.get('/ratings', db.getRatings)
app.get('/ratings/:id', db.getRatingById)
app.post('/ratings', db.createRating)
app.put('/ratings/:id', db.updateRating)
app.delete('/ratings/:id', db.deleteRating)


// console output when app is executed to know it is working.
app.listen(port, () => {
    console.log(`App running on port ${port}..`)
  })
