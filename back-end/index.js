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

// console output when app is executed to know it is working.
app.listen(port, () => {
    console.log(`App running on port ${port}..`)
  })
