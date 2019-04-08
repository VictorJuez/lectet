const app = module.exports = require('express')();
const db = require('../actions').users;
const passport = require('passport');
const passportConf = require('../passport');

const { validateBody, schemas } = require('../helpers/routeHelpers');

const passportSignIn = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt',{ session: false });

app.get('/secret', passportJWT, db.secret)
app.get('/', db.getUsers)
app.get('/:id', db.getUserById)
app.post('/', db.createUser)
app.put('/:id', db.updateUser)
app.delete('/:id', db.deleteUser)
app.post('/login', passportSignIn, db.loginUser)

//app.post('/singIn', validateBody(schemas.authSchema), db.singIn)

