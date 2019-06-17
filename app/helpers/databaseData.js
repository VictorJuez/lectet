const {
  sequelize,
  User,
  Book,
  Genre,
  Theme,
  Favourite,
  Author,
  Event,
  Order,
  AuthorBook
} = require('./sequelize');

sequelize.sync({ force: true })
  .then(() => {
    console.log(`Database & tables created!`);
    testDb();
  });

async function testDb() {

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

  const user1 = await User.create({ email: 'jaume@gmail.com', password: 'lmao' });

  const genre6 = await Genre.create({ description: "Fantasy" });
  const genre1 = await Genre.create({ description: "Action" });
  const genre2 = await Genre.create({ description: "Mistery" });
  const genre3 = await Genre.create({ description: "Drama" });
  const genre4 = await Genre.create({ description: "Thriller" });
  const genre5 = await Genre.create({ description: "Biography" });

  const theme1 = await Theme.create({ description: "Family" });
  const theme2 = await Theme.create({ description: "Teenager" });
  const theme3 = await Theme.create({ description: "Learn" });
  const theme4 = await Theme.create({ description: "Descriptive" });

  const book1 = await Book.build({
    name: 'Harry Potter and the Philosopher\'s Stone',
    description: 'is a fantasy novel written by British author J. K. Rowling. The first novel in the Harry Potter series and Rowling\'s debut novel, it follows Harry Potter, a young wizard who discovers his magical heritage on his eleventh birthday, when he receives a letter of acceptance to Hogwarts School of Witchcraft and Wizardry. Harry makes close friends and a few enemies during his first year at the school, and with the help of his friends, Harry faces an attempted comeback by the dark wizard Lord Voldemort, who killed Harry\'s parents, but failed to kill Harry when he was just 15 months old.',
    price: 13
  });
  await book1.save();
  await book1.setTheme(theme2);
  await book1.setGenre(genre2);
  await book1.addAuthor(author2);

  const book2 = await Book.build({
    name: 'Harry Potter and The Chamber of Secrets',
    description: 'is a fantasy novel written by British author J. K. Rowling. The first novel in the Harry Potter series and Rowling\'s debut novel, it follows Harry Potter, a young wizard who discovers his magical heritage on his eleventh birthday, when he receives a letter of acceptance to Hogwarts School of Witchcraft and Wizardry. Harry makes close friends and a few enemies during his first year at the school, and with the help of his friends, Harry faces an attempted comeback by the dark wizard Lord Voldemort, who killed Harry\'s parents, but failed to kill Harry when he was just 15 months old.',
    price: 15
  });
  await book2.save();
  await book2.setTheme(theme2);
  await book2.setGenre(genre2);
  await book2.addAuthor(author2);

  const book3 = await Book.build({
    name: 'Harry Potter and The Prisoner of Azkaban',
    description: 'is a fantasy novel written by British author J. K. Rowling. The first novel in the Harry Potter series and Rowling\'s debut novel, it follows Harry Potter, a young wizard who discovers his magical heritage on his eleventh birthday, when he receives a letter of acceptance to Hogwarts School of Witchcraft and Wizardry. Harry makes close friends and a few enemies during his first year at the school, and with the help of his friends, Harry faces an attempted comeback by the dark wizard Lord Voldemort, who killed Harry\'s parents, but failed to kill Harry when he was just 15 months old.',
    price: 11
  });
  await book3.save();
  await book3.setTheme(theme2);
  await book3.setGenre(genre2);
  await book3.addAuthor(author2);

  const book4 = await Book.build({
    name: 'Harry Potter and The Goblet of Fire',
    description: 'is a fantasy novel written by British author J. K. Rowling. The first novel in the Harry Potter series and Rowling\'s debut novel, it follows Harry Potter, a young wizard who discovers his magical heritage on his eleventh birthday, when he receives a letter of acceptance to Hogwarts School of Witchcraft and Wizardry. Harry makes close friends and a few enemies during his first year at the school, and with the help of his friends, Harry faces an attempted comeback by the dark wizard Lord Voldemort, who killed Harry\'s parents, but failed to kill Harry when he was just 15 months old.',
    price: 14
  });
  await book4.save();
  await book4.setTheme(theme2);
  await book4.setGenre(genre2);
  await book4.addAuthor(author2);

  const book5 = await Book.build({
    name: 'The Boy in the Striped Pyjamas',
    description: 'Holocaust novel by Irish novelist John Boyne. Unlike the months of planning Boyne devoted to his other books, he said that he wrote the entire first draft of The Boy in the Striped Pyjamas in two and a half days, barely sleeping until he got to the end.[1] He did, however, commit to nearly 20 years of research, reading and researching about the Holocaust as a teenager before the idea for the novel even came to him. As of March 2010, the novel had sold more than five million copies around the world.[2] In both 2007 and 2008, it was the best selling book of the year in Spain, and it has also reached number one on the New York Times bestseller list,[3] as well as in the UK and Australia.[not verified in body] The book was adapted in 2008 as a film of the same name.',
    price: 8
  });
  await book5.save().then(book2 => book2.addAuthor(author1));
  await book5.setTheme(theme4);
  await book5.setGenre(genre5);

  const author3 = await Author.create({
    name: 'Anne',
    lastName: 'Frank',
    description: 'Was a German-born Jewish diarist'
  });

  const book6 = await Book.build({
    name: 'The Diary of Anne Frank',
    description: ' book of the writings from the Dutch language diary kept by Anne Frank while she was in hiding for two years with her family during the Nazi occupation of the Netherlands',
    price: 9
  });
  await book6.save();
  await book6.setTheme(theme2);
  await book6.setGenre(genre2);
  await book6.addAuthor(author3);

  const author4 = await Author.create({
    name: 'Henry David',
    lastName: 'Thoreau',
    description: 'Was an American essayist, poet, philosopher, abolitionist, naturalist, tax resister, development critic, surveyor, yogi,[3] and historian. A leading transcendentalist,[4] Thoreau is best known for his book Walden'
  });

  const book7 = await Book.build({
    name: 'Walden',
    description: 'The text is a reflection upon simple living in natural surroundings. The work is part personal declaration of independence, social experiment, voyage of spiritual discovery, satire, and—to some degree—a manual for self-reliance.',
    price: 18
  });
  await book7.save();
  await book7.setTheme(theme3);
  await book7.setGenre(genre5);
  await book7.addAuthor(author4);

  const author5 = await Author.create({
    name: 'George',
    lastName: 'R. R. Martin',
    description: 'George Raymond Richard Martin, also known as GRRM, is an American novelist and short story writer in the fantasy, horror, and science fiction genres, screenwriter, and television producer.'
  });
  const book8 = await Book.build({
    name: 'A Game of Thrones: A Song of Ice and Fire, Book 1',
    description: "Winter is coming. Such is the stern motto of House Stark, the northernmost of the fiefdoms that owe allegiance to King Robert Baratheon in far-off King's Landing. There Eddard Stark of Winterfell rules in Roberts name.",
    price: 40
  });
  await book8.save();
  await book8.setTheme(theme2);
  await book8.setGenre(genre6);
  await book8.addAuthor(author5);

  const book9 = await Book.build({
    name: 'A Game of Thrones: part 2',
    description: "Winter is coming. Such is the stern motto of House Stark, the northernmost of the fiefdoms that owe allegiance to King Robert Baratheon in far-off King's Landing. There Eddard Stark of Winterfell rules in Roberts name.",
    price: 40
  });
  await book9.save();
  await book9.setTheme(theme2);
  await book9.setGenre(genre6);
  await book9.addAuthor(author5);

  const book10 = await Book.build({
    name: 'A Game of Thrones: part 3',
    description: "Winter is coming. Such is the stern motto of House Stark, the northernmost of the fiefdoms that owe allegiance to King Robert Baratheon in far-off King's Landing. There Eddard Stark of Winterfell rules in Roberts name.",
    price: 40
  });
  await book10.save();
  await book10.setTheme(theme2);
  await book10.setGenre(genre6);
  await book10.addAuthor(author5);

  const book11 = await Book.build({
    name: 'A Game of Thrones: part 4',
    description: "Winter is coming. Such is the stern motto of House Stark, the northernmost of the fiefdoms that owe allegiance to King Robert Baratheon in far-off King's Landing. There Eddard Stark of Winterfell rules in Roberts name.",
    price: 40
  });
  await book11.save();
  await book11.setTheme(theme2);
  await book11.setGenre(genre6);
  await book11.addAuthor(author5);

  const book12 = await Book.build({
    name: 'A Game of Thrones: part 5',
    description: "Winter is coming. Such is the stern motto of House Stark, the northernmost of the fiefdoms that owe allegiance to King Robert Baratheon in far-off King's Landing. There Eddard Stark of Winterfell rules in Roberts name.",
    price: 40
  });
  await book12.save();
  await book12.setTheme(theme2);
  await book12.setGenre(genre6);
  await book12.addAuthor(author5);

  const book13 = await Book.build({
    name: 'A Game of Thrones: part 6',
    description: "Winter is coming. Such is the stern motto of House Stark, the northernmost of the fiefdoms that owe allegiance to King Robert Baratheon in far-off King's Landing. There Eddard Stark of Winterfell rules in Roberts name.",
    price: 40
  });
  await book13.save();
  await book13.setTheme(theme2);
  await book13.setGenre(genre6);
  await book13.addAuthor(author5);


  const fav = await Favourite.build();
  book2.setFavourite(fav);

  const fav2 = await Favourite.build();
  book1.setFavourite(fav2);

  // new Date(year, month-1, day, hours+2, minutes, seconds, milliseconds)
  const event1 = await Event.create({
    name: 'Summer book event',
    date: new Date(2019, 6 - 1, 1, 17 + 2, 30)
  })
  const event2 = await Event.create({
    name: 'Summer book event',
    date: new Date(2019, 6 - 1, 1, 17 + 2, 30)
  })
  await book1.addEvent(event1);
  await book2.addEvent(event2);

  //user1.addOrderedBook(book1, {quantity: '10'});
  //user1.addRatingBook(book1, {rating: '5'});
  const order = await Order.create({
    userId: user1.id
  });

  await order.addBook(book1, { through: { quantity: 10 } });
  await order.addBook(book2, { through: { quantity: 3 } });
}