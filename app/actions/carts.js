const Sequelize = require('sequelize');
const { Cart, Book } = require('../helpers/sequelize');

const getCart = async (request, response) => {
    const cart = await Cart.findOne({
        where: {userId: request.user.id},
        include: [Book]
    });
    response.status(200).json({cart});
}

const createCart = async (request, response) => {
    const requestCart = request.body;
    var cart = await Cart.findOne({
        where: {userId: request.user.id}
    });
    if(cart) await cart.setBooks([]);
    else cart = await Cart.create({
        userId: request.user.id
    });

    for (var key in requestCart) {
        if (requestCart.hasOwnProperty(key)) {
            var cartItem = requestCart[key];
            var book = await Book.findByPk(cartItem.book);
            await cart.addBook(book, { through: { 
                quantity: cartItem.quantity,
                unitPrice: book.price
            }});
        }
    }
    const solution = await Cart.findByPk(cart.id, {
        include: [Book]
    })
    response.status(200).json({'cart': solution});
}

const getCartById = async (request, response) => {
    const cart = await Cart.findByPk(request.params.cartId, {
        include: [Book]
    });
    response.status(200).json({cart});
}

module.exports = {
    getCart,
    createCart,
    getCartById
}