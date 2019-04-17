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
  User.findAll({})
      .then(users => response.json(users))
    }
    
    
const getUserById = (request, response) => {
    User.findByPk(request.params.id)
          .then(users => response.json(users))
  }
    
const createUser = (request, response) => {
  // Generate a salt bcrypt
  var password = encryptPassword(request.body.password);
  request.body.password = password;

  // Generate token
  const token = singToken(request.body.email);

  User.create(request.body)
        .then(user => {
          // respond with token
          response.status(200).json({token: token});
        })
        .catch(function(error){
          response.status(400).json({
            code: error.parent.code,
            detail: error.parent.detail
          });
        });
}

const updateUser = (request, response) => {
  // TODO: check params received in the request.body before executing the update
  // Not sending error if one param is wrong
  User.update(
    request.body, /* set attributes' value */
    { where: { id: request.params.id }} /* where criteria */
  ).then(user => {
    response.status(200).json({detail: "user modified successfully"});
  }).catch(function(error){
    response.status(400).json({
      code: error.parent.code,
      detail: error.parent.detail
    });
  });
}

const deleteUser = (request, response) => {

  User.destroy(
    {where: {id: request.params.id}}
  ).then(() => {
    response.status(200).json({
      id: request.params.id,
      detail: "deleted successfully"
    })
  });
}

const loginUser = (request, response) => {
  console.log(request.body.email);
  console.log(request.body.password);
  
  const token = singToken(request.body.email);
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