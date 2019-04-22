const app = module.exports = require('express')();
const eventsController = require('../actions/events')

app.get('/', eventsController.getAllEvents);
app.get('/book/:bookId', eventsController.getEventsByBook);
app.get('/now', eventsController.getNowEvents);
app.get('/:id', eventsController.getEventById);

