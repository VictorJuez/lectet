/**
 **********************************
 * THIS IS THE MAIN SERVER FILE   *
 **********************************
**/

// Libraries and global variables
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const routes = require('./routes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express()
const port = process.env.PORT || 3000 // When app executed on local machine, port = 3000, when on Heroku, port = process.env.PORT

// Middlewares
app.use(morgan('dev'))
app.use(express.static('app/static-files')); // Here we define front-end directory
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

// API routes
app.use('/api',routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Start the server
app.listen(port, () => {
    console.log(`App running on port ${port}..`)
  })
