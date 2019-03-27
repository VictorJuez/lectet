const app = module.exports = require('express')();
const db = require('../actions').users;

app.get('/', db.getUsers)
app.get('/:id', db.getUserById)
app.post('/', db.createUser)
app.put('/:id', db.updateUser)
app.delete('/:id', db.deleteUser)
app.post('/login', db.loginUser)

