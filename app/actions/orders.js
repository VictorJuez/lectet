const Sequelize = require('sequelize');
const { Order, Book } = require('../sequelize');

const getAllOrders = async (request, response) => {
    const order = await Order.findAll({
        where: {userId: request.user.id},
        include: [Book]
    });
    response.status(200).json({order});
}

const createOrder = async (request, response) => {
    const requestOrder = request.body;
    const order = await Order.create({
        userId: request.user.id
    });

    for (var key in requestOrder) {
        if (requestOrder.hasOwnProperty(key)) {
            var singleOrder = requestOrder[key];
            var book = await Book.findByPk(singleOrder.book);
            await order.addBook(book, { through: { 
                quantity: singleOrder.quantity,
                unitPrice: book.price
            }});
        }
    }
    const solution = await Order.findByPk(order.id, {
        include: [Book]
    })
    response.status(200).json({'order': solution});
}

const getOrderById = async (request, response) => {
    const order = await Order.findByPk(request.params.orderId, {
        include: [Book]
    });
    response.status(200).json({order});
}

module.exports = {
    getAllOrders,
    createOrder,
    getOrderById
}