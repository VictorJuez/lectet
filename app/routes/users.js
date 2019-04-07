const app = module.exports = require('express')();
const db = require('../actions').users;

const { validateBody, schemas } = require('../helpers/routeHelpers');

app.get('/', db.getUsers)
app.get('/:id', db.getUserById)
app.post('/', db.createUser)
app.put('/:id', db.updateUser)
app.delete('/:id', db.deleteUser)
app.post('/login', db.loginUser)

app.post('/singIn', validateBody(schemas.authSchema), db.singIn)
app.post('/singUp', db.singUp)
app.post('/secret', db.secret)

