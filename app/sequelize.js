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
const Book = BookModel(sequelize, Sequelize);
const Event = EventModel(sequelize, Sequelize);
const Genre = sequelize.define('genre', {description: Sequelize.STRING});
const Theme = sequelize.define('theme', {description: Sequelize.STRING});
const Favourite = sequelize.define('favourite', {});
const BookEvent = sequelize.define('book_event', {});
const Author = AuthorModel(sequelize, Sequelize);
const AuthorBook = sequelize.define('author_book', {});

const Rating = RatingModel(sequelize, Sequelize);
const Order = OrderModel(sequelize, Sequelize);
const AuthorEvent = sequelize.define('author_event', {});


/*
Book.belongsToMany(User, {as: 'ratingUser', through: Rating, unique: true});
User.belongsToMany(Book, {as: 'ratingBook', through: Rating, unique: true});
Author.belongsToMany(Event, { through: AuthorEvent, unique: true });
Event.belongsToMany(Author, { through: AuthorEvent, unique: true});
Book.belongsToMany(User, { as: 'buyer', through: Order, unique:false });
User.belongsToMany(Book, { as: 'orderedBook', through: Order, unique:false });*/
Genre.hasMany(Book);
Theme.hasMany(Book);
Book.belongsToMany(Event, { through: BookEvent, unique:true });
Event.belongsToMany(Book, { through: BookEvent, unique:true });
Book.hasOne(Favourite);
Author.belongsToMany(Book, { through: AuthorBook, unique: true });
Book.belongsToMany(Author, { through: AuthorBook, unique: true });

/*User.prototype.try = function () {
  console.log("custom function!");
}*/

sequelize.sync({ force: true })
.then(() => {
  console.log(`Database & tables created!`);
  testDb();
});

module.exports = {
  User,
  Book,
  Genre,
  Theme,
  Favourite,
  Author,
  Rating,
  Event,
  Order,
  AuthorBook,
  AuthorEvent
}

async function testDb(){

  const author1 = await Author.build({name: 'Pepito'});
  await author1.save();

  const author2 = await Author.build({name: 'Lmao'});
  await author2.save();

  const user1 = await User.build({email: 'jaume@gmail.com', password: 'lmao'});
  await user1.save();

  const genre1 = await Genre.build({description: "dark"});
  await genre1.save();

  const genre2 = await Genre.build({description: "cold"});
  await genre2.save();

  const theme1 = await Theme.build({description: "theme1"});
  await theme1.save();

  const theme2 = await Theme.build({description: "theme2"});
  await theme2.save();

  const book1 = await Book.build({name: 'Chair'});
  await book1.save();

  const book2 = await Book.build({name: 'Table'});
  await book2.save();

  await theme1.addBook(book1);
  await genre2.addBook(book1);
  await theme1.addBook(book2);
  await genre1.addBook(book2);
  const fav = await Favourite.build();
  book2.setFavourite(fav);

  const fav2 = await Favourite.build();
  book1.setFavourite(fav2);

  await author1.addBook(book1);
  await author2.addBook(book2);
  await author2.addBook(book1);

  //user1.addOrderedBook(book1, {quantity: '10'});
  //user1.addRatingBook(book1, {rating: '5'});
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