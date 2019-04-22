const { Event, Book, Author } = require('../sequelize');

const getAllEvents = async (request, response) => {
    const events = await Event.findAll({
        include: [
            { model: Book, include: [Author]}
        ]
    });
    response.status(200).json({events});
}

const getEventsByBook = async (request, response) => {
    const events = await Event.findAll({
        include: [
            { 
                model: Book, 
                where: {id: request.params.bookId},
                include: [Author]
            }
        ]
    });
    response.status(200).json({events});
}

const getNowEvents = async (request, response) => {
    const currentMonth = new Date().getMonth();
    const events = await Event.findAll({
        include: [
            { model: Book, include: [Author]}
        ]
    });
    var solution = [];
    for (var key in events) {
        if (events.hasOwnProperty(key)) {
            var event = events[key];
            var eventMonth = new Date(event.date).getMonth();
            if(eventMonth == currentMonth) solution.push(event);
        }
    }
    response.status(200).json({'events': solution});
}

const getEventById = async (request, response) => {
    const event = await Event.findByPk(request.params.id, {
        include: [
            { model: Book, include: [Author]}
        ]
    });
    response.status(200).json({event});
}

module.exports = {
    getAllEvents,
    getEventsByBook,
    getNowEvents,
    getEventById
}