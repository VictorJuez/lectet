const app = require('express')();
const userController = require('../actions').users;
const passport = require('passport');
const passportConf = require('../passport');
const { validateBody, schemas } = require('../helpers/routeHelpers');

const passportSignIn = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt',{ session: false });

app.get('/secret', passportJWT, userController.secret)
app.get('/', userController.getUsers)
app.get('/:id', userController.getUserById)
app.post('/', validateBody(schemas.authSchema), userController.createUser)
app.put('/:id', userController.updateUser)
app.delete('/:id', userController.deleteUser)
app.post('/login', validateBody(schemas.authSchema), passportSignIn, userController.loginUser)

//app.post('/singIn', validateBody(schemas.authSchema), userController.singIn)

module.exports = app;