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

const routes = require('./routes');

app.set('root', `${__dirname}/..`);

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use(express.static('./static-files')); // Here we define front-end directory

// API routes
app.use(routes);

// console output when app is executed to know it is working.
app.listen(port, () => {
    console.log(`App running on port ${port}..`)
  })
