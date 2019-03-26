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

app.use(express.static('static-files'));

// API routes
app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API!' })
    //response.sendFile('front-end/index.html', {root: __dirname })
  })

// USERS routes

/*
  Show all the information about all the users on the DataBase.
*/
app.get('/users', db.getUsers)

/*
  Show the information of the user that have the id give by parameter.
*/
app.get('/users/:id', db.getUserById)

/*
  Create a user on the DataBase with the information given by parameter.
*/
app.post('/users', db.createUser)

/*
  Update all the information of a user given this new information by the parameters.
*/
app.put('/users/:id', db.updateUser)

/*
  Delete from the DataBase the user that have the id pass by parameter.
*/
app.delete('/users/:id', db.deleteUser)

app.post('/users/login', db.loginUser)

// AUTHORS routes

/*
  Show all the information about all the authors that are contain on the DataBase.
*/
app.get('/authors', db.getAuthors)

/*
  Show the information of the author that have the id pass by parameter.
*/
app.get('/authors/:id', db.getAuthorById)

/*
  Create a new author with the information given by parameter. (The id of
    the author is generate by the DataBase)
*/
app.post('/authors', db.createAuthor)

/*
    Update the information of the author that have the id pass by parameter.
*/
app.put('/authors/:id', db.updateAuthor)

/*
    Delete from the DataBase the information of the author that have the id
    given by parameter.
*/
app.delete('/authors/:id', db.deleteAuthor)

// BOOKS routes

/*
    Show all the information of all the books contain on the DataBase.
*/
app.get('/books', db.getBooks)

/*
    Show the information of the book that have the id pass by parameter.
*/
app.get('/books/:id', db.getBookById)

/*
    Create on the DataBase a new book with the information given by parameter.
*/
app.post('/books', db.createBook)

/*
    Update the information of the book that have the id pass by parameter.
*/
app.put('/books/:id', db.updateBook)

/*
    Delete from the DataBase the information of the book that have the id
    given by parameter.
*/
app.delete('/books/:id', db.deleteBook)

// SALES routes

/*
    Show the information of all the sales contain on the DataBase.
*/
app.get('/sales', db.getSales)

/*
    Return the information of the sale that have the id given by parameter.
*/
app.get('/sales/:id', db.getSaleById)

/*
    Create on the DataBase a new sale with the information pass by parameter.
    (The id of the sales are generate by the DataBase)
*/
app.post('/sales', db.createSale)

/*
    Update the information of the sale that have the id given by parameter.
*/
app.put('/sales/:id', db.updateSale)

/*
    Delete from the DataBase the information of the sale that have the id
    given by parameter.
*/
app.delete('/sales/:id', db.deleteSale)

// RATINGS routes

/*
    Show the information of all the ratings that are contain on the DataBase.
*/
app.get('/ratings', db.getRatings)

/*
    Show the information of the ratings that have the id of the user and the id
    of the book that are given by parameter.
*/
app.get('/ratings/:id', db.getRatingById)

/*
    Create on the DataBase a new rating with the information given by parameter.
*/
app.post('/ratings', db.createRating)

/*
    Update the information of the rating that have the id given by parameter.
*/
app.put('/ratings/:id', db.updateRating)

/*
    Delete from the DataBase the information of the rating that have the id
    given by parameter.
*/
app.delete('/ratings/:id', db.deleteRating)


// console output when app is executed to know it is working.
app.listen(port, () => {
    console.log(`App running on port ${port}..`)
  })
