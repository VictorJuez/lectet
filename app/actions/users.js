const JWT = require('jsonwebtoken');
const {JWT_SECRET} = require('../../config');
const { User } = require('../helpers/sequelize');

singToken = (user) => {
  return JWT.sign({
    iss: 'lectet',
    sub: user.id,
    iat: new Date().getTime(),  //current time
    exp: new Date().setDate(new Date().getDate() + 1) //current time + 1 day ahead
  }, JWT_SECRET);
}

// user/signUp
const createUser = async (request, response) => {
  const { name, surname, email, password } = request.body;
  console.log(email);
  
  // Check user with the same email
  const foundUser = await User.findOne({where: {email: email}});
  if(foundUser) {
    return response.status(403).json({error: "Email is already in use"});
  }

  // Create new user
  const newUser = await User.build({name, surname, email, password});
  await newUser.save();

  // Generate token
  const token = singToken(newUser);
  
  response.status(200).json({token: token});
  //response.status(200).json({user: "created"});

}

// user/signIn
const loginUser = (request, response) => {
  const token = singToken(request.user);
  response.status(200).json({token: token});
}

// user/info    
const getUser = async (request, response) => {
  const user = await User.findOne({
    where: {email: request.user.email}
  });

  if(user)response.json(user);
  else response.json({"mssg": "user not found"});
}

const updateUser = (request, response) => {
  // TODO: check params received in the request.body before executing the update
  // Not sending error if one param is wrong
  User.update(
    request.body, /* set attributes' value */
    { where: { id: request.user.id }} /* where criteria */
  ).then(user => {
    response.status(200).json({detail: "user modified successfully"});
  }).catch(function(error){
    response.status(400).json({
      code: error.parent.code,
      detail: error.parent.detail
    });
  });
}

// NOT USING NOW
const getUsers = (request, response) => {
  User.findAll({})
      .then(users => response.json(users))
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

module.exports = {
    getUser,
    createUser,
    updateUser,
    loginUser,
}