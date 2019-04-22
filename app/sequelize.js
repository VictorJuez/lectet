const Sequelize = require('sequelize');
const UserModel = require('./models/users');
const AuthorModel = require('./models/authors');
const BookModel = require('./models/books');
const RatingModel = require('./models/ratings');
const EventModel = require('./models/events');
const OrderModel = require('./models/orders');

const sequelize = new Sequelize('degpai9eklcvs5', 'pfguwsqduqkxxv', 'ffbab27c92e5005956bf45d8883ea39428b2c3722f63d5607faeb493bdb88ae9', {
    host: 'ec2-54-247-85-251.eu-west-1.compute.amazonaws.com',
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: true
    }
  });

const User = UserModel(sequelize, Sequelize);
const Author = AuthorModel(sequelize, Sequelize);
const Book = BookModel(sequelize, Sequelize);
const Rating = RatingModel(sequelize, Sequelize);
const Event = EventModel(sequelize, Sequelize);
const Order = OrderModel(sequelize, Sequelize);
const AuthorBook = sequelize.define('author_book', {});
const AuthorEvent = sequelize.define('author_event', {});

Author.belongsToMany(Book, { through: AuthorBook, unique: true });
Book.belongsToMany(Author, { through: AuthorBook, unique: true });
Book.belongsToMany(User, {as: 'ratingUser', through: Rating, unique: true});
User.belongsToMany(Book, {as: 'ratingBook', through: Rating, unique: true});
Author.belongsToMany(Event, { through: AuthorEvent, unique: true });
Event.belongsToMany(Author, { through: AuthorEvent, unique: true});
Book.belongsToMany(User, { as: 'buyer', through: Order, unique:false });
User.belongsToMany(Book, { as: 'orderedBook', through: Order, unique:false });

/*User.prototype.try = function () {
  console.log("custom function!");
}*/

sequelize.sync({ force: true })
.then(() => {
  console.log(`Database & tables created!`);
  //testDb();
});

module.exports = {
  User,
  Author,
  Book,
  Rating,
  Event,
  Order,
  AuthorBook,
  AuthorEvent
}

async function testDb(){
  const book1 = await Book.build({name: 'Chair'});
  await book1.save();

  const author1 = await Author.build({name: 'Pepito'});
  await author1.save();

  const author2 = await Author.build({name: 'Lmao'});
  await author2.save();

  const user1 = await User.build({email: 'jaume@gmail.com', password: 'lmao'});
  await user1.save();

  user1.addOrderedBook(book1, {quantity: '10'});
  user1.addRatingBook(book1, {rating: '5'});
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