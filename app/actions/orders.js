const Sequelize = require('sequelize');
const { Order, Book, Sale } = require('../orm/sequelize');

const getAllOrders = async (request, response) => {
    const order = await Order.findAll({
        where: {userId: request.user.id},
        include: [Book]
    });
    response.status(200).json({order});
}

const createOrder = async (request, response) => {
    console.log(request);
    const requestOrder = request.body;
    const order = await Order.create({
        userId: request.user.id,
        name: requestOrder.name,
        surname: requestOrder.surname,
        email: requestOrder.email,
        address: requestOrder.address,
        city: requestOrder.city,
        country: requestOrder.country,
        zip: requestOrder.zip
    });

    for (var key in requestOrder.cart) {
        if (requestOrder.cart.hasOwnProperty(key)) {
            var singleOrder = requestOrder.cart[key];
            var book = await Book.findByPk(singleOrder.book);
            await order.addBook(book, { through: { 
                quantity: singleOrder.quantity,
                unitPrice: book.price
            }});
            
            var sale = await Sale.findOne({
                where: {"bookId": singleOrder.book}
            });
            if(sale) await sale.update({
                "quantity": sale.quantity+singleOrder.quantity
            });
            else {
                sale = await Sale.create({
                    "quantity": singleOrder.quantity
                });
                sale.setBook(book);
            }
            
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