const app = module.exports = require('express')();

app.get('/ratings', db.getRatings)
app.get('/ratings/:id', db.getRatingById)
app.post('/ratings', db.createRating)
app.put('/ratings/:id', db.updateRating)
app.delete('/ratings/:id', db.deleteRating)