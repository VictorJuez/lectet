const Sequelize = require('sequelize');
const UserModel = require('../models/users');
const AuthorModel = require('../models/authors');
const BookModel = require('../models/books');
const EventModel = require('../models/events');
const OrderModel = require('../models/orders');

const sequelize = new Sequelize('degpai9eklcvs5', 'pfguwsqduqkxxv', 'ffbab27c92e5005956bf45d8883ea39428b2c3722f63d5607faeb493bdb88ae9', {
    host: 'ec2-54-247-85-251.eu-west-1.compute.amazonaws.com',
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: true
    },
    define: {
      timestamps: false
    },
  });

const User = UserModel(sequelize, Sequelize);
const Book = BookModel(sequelize, Sequelize);
const Event = EventModel(sequelize, Sequelize);
const Genre = sequelize.define('genre', {description: Sequelize.STRING});
const Theme = sequelize.define('theme', {description: Sequelize.STRING});
const Favourite = sequelize.define('favourite', {});
const BookEvent = sequelize.define('book_event', {});
const Author = AuthorModel(sequelize, Sequelize);
const AuthorBook = sequelize.define('author_book', {});
const Order = OrderModel(sequelize, Sequelize);
const OrderBook = sequelize.define('order_book', {quantity: Sequelize.INTEGER, unitPrice: Sequelize.DOUBLE});
const Cart = sequelize.define('cart', {});
const CartBook = sequelize.define('cart_book', {quantity: Sequelize.INTEGER, unitPrice: Sequelize.DOUBLE});
const Sale = sequelize.define('sale', {quantity: Sequelize.INTEGER});

Book.belongsToMany(Cart, {through: CartBook, unique:true });
Cart.belongsToMany(Book, {through: CartBook, unique:true });
Cart.belongsTo(User, {foreignKey: { allowNull: false }});
Book.belongsTo(Genre);
Book.belongsTo(Theme);
Book.belongsToMany(Event, { through: BookEvent, unique:true });
Event.belongsToMany(Book, { through: BookEvent, unique:true });
Book.hasOne(Favourite);
Author.belongsToMany(Book, { through: AuthorBook, unique: true });
Book.belongsToMany(Author, { through: AuthorBook, unique: true });
Order.belongsTo(User, {foreignKey: { allowNull: false }});
Order.belongsToMany(Book, { through: OrderBook, unique:true });
Book.belongsToMany(Order, { through: OrderBook, unique:true });
Sale.belongsTo(Book);

module.exports = {
  sequelize,
  User,
  Book,
  Genre,
  Theme,
  Favourite,
  Author,
  Event,
  Order,
  Cart,
  Sale,
  AuthorBook
}


// Test connection with the DB
  /*sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });*/