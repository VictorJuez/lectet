const JWT = require('jsonwebtoken');
const {pool, JWT_SECRET} = require('../../config');
const bcrypt = require('bcryptjs');

const { User } = require('../sequelize');

singToken = (userId) => {
  return JWT.sign({
    iss: 'lectet',
    sub: userId,
    iat: new Date().getTime(),  //current time
    exp: new Date().setDate(new Date().getDate() + 1) //current time + 1 day ahead
  }, JWT_SECRET);
}

function encryptPassword(password){
  try {
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);
    return passwordHash;
  } catch (error) {
    throw error
  } 
}

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
        throw error
        }
        response.status(200).json(results.rows)
    })
    }
    
    
const getUserById = (request, response) => {
    User.findAll({})
          .then(users => response.json(users))
  }
    
const createUser = (request, response) => {

  User.create(request.body)
        .then(user => response.json(user));

  /*
  // Generate a salt bcrypt
  var password = encryptPassword(password);
  console.log(password);

  // Generate token
  const token = singToken(id);

  // respond with token
  response.status(200).json({token: token});
  */
}

const updateUser = (request, response) => {
  //const id = parseInt(request.params.id)
  const { id, password, name, surname_primary, surname_secondary, age, email, address } = request.body

  pool.query(
    'UPDATE users SET password = $2, name = $3, surname_primary = $4, surname_secondary = $5, age = $6, email = $7, address = $8 WHERE id = $1',
    [id, password, name, surname_primary, surname_secondary, age, email, address],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = (request, response) => {
  const id = request.params.id;

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

const loginUser = (request, response) => {
  console.log(request.body.id);
  console.log(request.body.password);
  
  const token = singToken(request.body.id);
  response.status(200).json({token: token});
}

// Auth

const secret = (request, response) => {
  console.log("secret function called");
  response.status(200).send("Secret function called!");
}

module.exports = {
    getUsers,       // Users
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    loginUser,
    secret
}