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
const Order = sequelize.define('order', {});
const OrderBook = sequelize.define('order_book', {quantity: Sequelize.INTEGER, unitPrice: Sequelize.DOUBLE});

Genre.hasMany(Book);
Theme.hasMany(Book);
Book.belongsToMany(Event, { through: BookEvent, unique:true });
Event.belongsToMany(Book, { through: BookEvent, unique:true });
Book.hasOne(Favourite);
Author.belongsToMany(Book, { through: AuthorBook, unique: true });
Book.belongsToMany(Author, { through: AuthorBook, unique: true });
Order.belongsTo(User, {foreignKey: { allowNull: false }});
Order.belongsToMany(Book, { through: OrderBook, unique:true });
Book.belongsToMany(Order, { through: OrderBook, unique:true });

/*
const Rating = RatingModel(sequelize, Sequelize);
const AuthorEvent = sequelize.define('author_event', {});

Book.belongsToMany(User, {as: 'ratingUser', through: Rating, unique: true});
User.belongsToMany(Book, {as: 'ratingBook', through: Rating, unique: true});
Author.belongsToMany(Event, { through: AuthorEvent, unique: true });
Event.belongsToMany(Author, { through: AuthorEvent, unique: true});
Book.belongsToMany(User, { as: 'buyer', through: Order, unique:false });
User.belongsToMany(Book, { as: 'orderedBook', through: Order, unique:false });*/

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
  Event,
  Order,
  AuthorBook
}

async function testDb(){

  const author1 = await Author.create({
    name: 'John',
    lastName: 'Boyne',
    description: 'is an Irish novelist.[1] He is the author of eleven novels for adults and six novels for younger readers. His novels are published in over 50 languages.'
  });

  const author2 = await Author.build({
    name: 'Joanne',
    lastName: 'Rowling',
    description: 'writing under the pen names J. K. Rowling and Robert Galbraith, is a British novelist, philanthropist, film producer, television producer and screenwriter, best known for writing the Harry Potter fantasy series. The books have won multiple awards, and sold more than 500 million copies,[2] becoming the best-selling book series in history.[3] They have also been the basis for a film series, over which Rowling had overall approval on the scripts[4] and was a producer on the final films in the series.[5]'
  });
  await author2.save();

  const user1 = await User.create({email: 'jaume@gmail.com', password: 'lmao'});

  const genre1 = await Genre.create({description: "dark"});

  const genre2 = await Genre.create({description: "cold"});

  const theme1 = await Theme.create({description: "theme1"});

  const theme2 = await Theme.create({description: "theme2"});

  const book1 = await Book.build({
    name: 'Harry Potter and the Philosopher\'s Stone',
    description: 'is a fantasy novel written by British author J. K. Rowling. The first novel in the Harry Potter series and Rowling\'s debut novel, it follows Harry Potter, a young wizard who discovers his magical heritage on his eleventh birthday, when he receives a letter of acceptance to Hogwarts School of Witchcraft and Wizardry. Harry makes close friends and a few enemies during his first year at the school, and with the help of his friends, Harry faces an attempted comeback by the dark wizard Lord Voldemort, who killed Harry\'s parents, but failed to kill Harry when he was just 15 months old.',
    price: 13
  });
  await book1.save();

  const book2 = await Book.build({
    name: 'The Boy in the Striped Pyjamas',
    description: 'Holocaust novel by Irish novelist John Boyne. Unlike the months of planning Boyne devoted to his other books, he said that he wrote the entire first draft of The Boy in the Striped Pyjamas in two and a half days, barely sleeping until he got to the end.[1] He did, however, commit to nearly 20 years of research, reading and researching about the Holocaust as a teenager before the idea for the novel even came to him. As of March 2010, the novel had sold more than five million copies around the world.[2] In both 2007 and 2008, it was the best selling book of the year in Spain, and it has also reached number one on the New York Times bestseller list,[3] as well as in the UK and Australia.[not verified in body] The book was adapted in 2008 as a film of the same name.',
    price: 8
  });
  
  await book2.save().then(book2 => book2.addAuthor(author1));
  await book1.addAuthor(author2);
  //await book2.addAuthor(author1);

  await theme1.addBook(book1);
  await genre2.addBook(book1);
  await theme1.addBook(book2);
  await genre1.addBook(book2);
  const fav = await Favourite.build();
  book2.setFavourite(fav);

  const fav2 = await Favourite.build();
  book1.setFavourite(fav2);

  // new Date(year, month-1, day, hours+2, minutes, seconds, milliseconds)
  const event1 = await Event.create({
    name: 'Summer book event',
    date: new Date(2019, 4-1, 1, 17+2, 30)
  })
  const event2 = await Event.create({
    name: 'Summer book event',
    date: new Date(2019, 4-1, 1, 17+2, 30)
  })
  await book1.addEvent(event1);
  await book2.addEvent(event2);

  //user1.addOrderedBook(book1, {quantity: '10'});
  //user1.addRatingBook(book1, {rating: '5'});
  const order = await Order.create({
    userId: user1.id
  });
 
  await order.addBook(book1, { through: { quantity: 10 }});
  await order.addBook(book2, { through: {quantity: 3}});
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