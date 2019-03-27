const app = module.exports = require('express')();
const db = require('../actions/ratings');

app.get('/', db.getRatings)
app.get('/:id', db.getRatingById)
app.post('/', db.createRating)
app.put('/:id', db.updateRating)
app.delete('/:id', db.deleteRating)