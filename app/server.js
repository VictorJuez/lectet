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
const cors = require('cors');

const app = express()
const port = process.env.PORT || 3000 // When app executed on local machine, port = 3000, when on Heroku, port = process.env.PORT

// Middlewares
app.use(morgan('dev'))
app.use(express.static('app/public')); // Here we define front-end directory
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(cors());

// API routes
app.use('/backend/swaggerui', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/backend',routes);

// Start the server
app.listen(port, () => {
    console.log(`App running on port ${port}..`)
  })
