const app = require('express')();
const userController = require('../actions').users;
const passport = require('passport');
const passportConf = require('../helpers/passport');
const { validateBody, schemas } = require('../helpers/routeHelpers');

const passportSignIn = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt',{ session: false });

app.get('/info', passportJWT, userController.getUser)
app.put('/info', passportJWT, userController.updateUser)
app.post('/signUp', validateBody(schemas.authSchema), userController.createUser)
app.post('/signIn', validateBody(schemas.authSchema), passportSignIn, userController.loginUser)
//app.delete('/:id', userController.deleteUser)

module.exports = app;