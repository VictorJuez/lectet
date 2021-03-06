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

  const genre1 = await Genre.create({ description: "Action" });
  const genre2 = await Genre.create({ description: "Academic" });
  const genre3 = await Genre.create({ description: "Fiction" });
  const genre5 = await Genre.create({ description: "History" });


  const theme1 = await Theme.create({ description: "Descriptive" });
  const theme2 = await Theme.create({ description: "Teenager" });
  const theme3 = await Theme.create({ description: "Comic" });

  const book1 = await Book.build({
    name: 'Harry Potter and the Philosopher\'s Stone',
    description: 'is a fantasy novel written by British author J. K. Rowling. The first novel in the Harry Potter series and Rowling\'s debut novel, it follows Harry Potter, a young wizard who discovers his magical heritage on his eleventh birthday, when he receives a letter of acceptance to Hogwarts School of Witchcraft and Wizardry. Harry makes close friends and a few enemies during his first year at the school, and with the help of his friends, Harry faces an attempted comeback by the dark wizard Lord Voldemort, who killed Harry\'s parents, but failed to kill Harry when he was just 15 months old.',
    price: 13
  });
  await book1.save();
  await book1.setGenre(genre3);
  await book1.setTheme(theme2);
  await book1.addAuthor(author2);

  const book2 = await Book.build({
    name: 'Harry Potter and The Chamber of Secrets',
    description: 'is a fantasy novel written by British author J. K. Rowling. The first novel in the Harry Potter series and Rowling\'s debut novel, it follows Harry Potter, a young wizard who discovers his magical heritage on his eleventh birthday, when he receives a letter of acceptance to Hogwarts School of Witchcraft and Wizardry. Harry makes close friends and a few enemies during his first year at the school, and with the help of his friends, Harry faces an attempted comeback by the dark wizard Lord Voldemort, who killed Harry\'s parents, but failed to kill Harry when he was just 15 months old.',
    price: 15
  });
  await book2.save();
  await book2.setGenre(genre3);
  await book2.setTheme(theme2);
  await book2.addAuthor(author2);

  const book3 = await Book.build({
    name: 'Harry Potter and The Prisoner of Azkaban',
    description: 'is a fantasy novel written by British author J. K. Rowling. The first novel in the Harry Potter series and Rowling\'s debut novel, it follows Harry Potter, a young wizard who discovers his magical heritage on his eleventh birthday, when he receives a letter of acceptance to Hogwarts School of Witchcraft and Wizardry. Harry makes close friends and a few enemies during his first year at the school, and with the help of his friends, Harry faces an attempted comeback by the dark wizard Lord Voldemort, who killed Harry\'s parents, but failed to kill Harry when he was just 15 months old.',
    price: 11
  });
  await book3.save();
  await book3.setGenre(genre3);
  await book3.setTheme(theme2);
  await book3.addAuthor(author2);

  const book4 = await Book.build({
    name: 'Harry Potter and The Goblet of Fire',
    description: 'is a fantasy novel written by British author J. K. Rowling. The first novel in the Harry Potter series and Rowling\'s debut novel, it follows Harry Potter, a young wizard who discovers his magical heritage on his eleventh birthday, when he receives a letter of acceptance to Hogwarts School of Witchcraft and Wizardry. Harry makes close friends and a few enemies during his first year at the school, and with the help of his friends, Harry faces an attempted comeback by the dark wizard Lord Voldemort, who killed Harry\'s parents, but failed to kill Harry when he was just 15 months old.',
    price: 14
  });
  await book4.save();
  await book4.setGenre(genre3);
  await book4.setTheme(theme2);
  await book4.addAuthor(author2);

  const book5 = await Book.build({
    name: 'The Boy in the Striped Pyjamas',
    description: 'Holocaust novel by Irish novelist John Boyne. Unlike the months of planning Boyne devoted to his other books, he said that he wrote the entire first draft of The Boy in the Striped Pyjamas in two and a half days, barely sleeping until he got to the end.[1] He did, however, commit to nearly 20 years of research, reading and researching about the Holocaust as a teenager before the idea for the novel even came to him. As of March 2010, the novel had sold more than five million copies around the world.[2] In both 2007 and 2008, it was the best selling book of the year in Spain, and it has also reached number one on the New York Times bestseller list,[3] as well as in the UK and Australia.[not verified in body] The book was adapted in 2008 as a film of the same name.',
    price: 8
  });
  await book5.save().then(book2 => book2.addAuthor(author1));
  await book5.setGenre(genre5);
  await book5.setTheme(theme1);

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
  await book6.setGenre(genre5);
  await book6.setTheme(theme1);
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
  await book7.setGenre(genre5);
  await book7.setTheme(theme1);
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
  await book8.setGenre(genre3);
  await book8.setTheme(theme2);
  await book8.addAuthor(author5);

  const book9 = await Book.build({
    name: 'A Game of Thrones: part 2',
    description: "Winter is coming. Such is the stern motto of House Stark, the northernmost of the fiefdoms that owe allegiance to King Robert Baratheon in far-off King's Landing. There Eddard Stark of Winterfell rules in Roberts name.",
    price: 40
  });
  await book9.save();
  await book9.setGenre(genre3);
  await book9.setTheme(theme2);
  await book9.addAuthor(author5);

  const book10 = await Book.build({
    name: 'A Game of Thrones: part 3',
    description: "Winter is coming. Such is the stern motto of House Stark, the northernmost of the fiefdoms that owe allegiance to King Robert Baratheon in far-off King's Landing. There Eddard Stark of Winterfell rules in Roberts name.",
    price: 40
  });
  await book10.save();
  await book10.setGenre(genre3);
  await book10.setTheme(theme2);
  await book10.addAuthor(author5);

  const book11 = await Book.build({
    name: 'A Game of Thrones: part 4',
    description: "Winter is coming. Such is the stern motto of House Stark, the northernmost of the fiefdoms that owe allegiance to King Robert Baratheon in far-off King's Landing. There Eddard Stark of Winterfell rules in Roberts name.",
    price: 40
  });
  await book11.save();
  await book11.setGenre(genre3);
  await book11.setTheme(theme2);
  await book11.addAuthor(author5);

  const book12 = await Book.build({
    name: 'A Game of Thrones: part 5',
    description: "Winter is coming. Such is the stern motto of House Stark, the northernmost of the fiefdoms that owe allegiance to King Robert Baratheon in far-off King's Landing. There Eddard Stark of Winterfell rules in Roberts name.",
    price: 40
  });
  await book12.save();
  await book12.setGenre(genre3);
  await book12.setTheme(theme2);
  await book12.addAuthor(author5);

  const book13 = await Book.build({
    name: 'A Game of Thrones: part 6',
    description: "Winter is coming. Such is the stern motto of House Stark, the northernmost of the fiefdoms that owe allegiance to King Robert Baratheon in far-off King's Landing. There Eddard Stark of Winterfell rules in Roberts name.",
    price: 40
  });
  await book13.save();
  await book13.setGenre(genre3);
  await book13.setTheme(theme2);
  await book13.addAuthor(author5);

  const author6 = await Author.create({
    name: 'Dav',
    lastName: 'Pilkey',
    description: 'Dav Pilkey was born on March 4th, 1966 in Cleveland, OH. His father (David, Sr.) was a steel salesman, and his mother (Barbara) was the organist at a local church. Dav\'s older sister (Cindy) was a highly-skilled professional tattletale. I don\'t remember much about my early childhood, except that I was almost always happy. My parents tell me that I used to laugh in my sleep all the time, even as an infant. When I wasn\'t laughing, I kept myself busy by drawing. While the other kids in the neighborhood were outside playing baseball and football, I was inside drawing animals, monsters, and super-hero guys. Life was pretty cool when I was little...and then school started.'
  });
  const book14 = await Book.build({
    name: 'Dog Man: Brawl of the Wild: From the Creator of Captain Underpants',
    description: "George and Harold have created a new hero who digs into deception, claws after crooks, and rolls over robbers. When Greg the police dog and his cop companion are injured on the job, a life-saving surgery changes the course of history, and Dog Man is born.",
    price: 7
  });
  await book14.save();
  await book14.setGenre(genre1);
  await book14.setTheme(theme3);
  await book14.addAuthor(author6);

  const book15 = await Book.build({
    name: 'Dog Man: Lord of the Fleas',
    description: "George and Harold have created a new hero who digs into deception, claws after crooks, and rolls over robbers. When Greg the police dog and his cop companion are injured on the job, a life-saving surgery changes the course of history, and Dog Man is born.",
    price: 6
  });
  await book15.save();
  await book15.setGenre(genre1);
  await book15.setTheme(theme3);
  await book15.addAuthor(author6);

  const book16 = await Book.build({
    name: 'Dog Man: Unleashed ',
    description: "George and Harold have created a new hero who digs into deception, claws after crooks, and rolls over robbers. When Greg the police dog and his cop companion are injured on the job, a life-saving surgery changes the course of history, and Dog Man is born.",
    price: 8
  });
  await book16.save();
  await book16.setGenre(genre1);
  await book16.setTheme(theme3);
  await book16.addAuthor(author6);

  const book17 = await Book.build({
    name: 'Dog Man and Cat Kid: From the Creator of Captain Underpants',
    description: "George and Harold have created a new hero who digs into deception, claws after crooks, and rolls over robbers. When Greg the police dog and his cop companion are injured on the job, a life-saving surgery changes the course of history, and Dog Man is born.",
    price: 9
  });
  await book17.save();
  await book17.setGenre(genre1);
  await book17.setTheme(theme3);
  await book17.addAuthor(author6);

  const book18 = await Book.build({
    name: 'Dog Man: For Whom the Ball Rolls',
    description: "George and Harold have created a new hero who digs into deception, claws after crooks, and rolls over robbers. When Greg the police dog and his cop companion are injured on the job, a life-saving surgery changes the course of history, and Dog Man is born.",
    price: 5
  });
  await book18.save();
  await book18.setGenre(genre1);
  await book18.setTheme(theme3);
  await book18.addAuthor(author6);

  const book19 = await Book.build({
    name: 'Dog Man: Fetch-22',
    description: "George and Harold have created a new hero who digs into deception, claws after crooks, and rolls over robbers. When Greg the police dog and his cop companion are injured on the job, a life-saving surgery changes the course of history, and Dog Man is born.",
    price: 10
  });
  await book19.save();
  await book19.setGenre(genre1);
  await book19.setTheme(theme3);
  await book19.addAuthor(author6);

  const author7 = await Author.create({
    name: 'David',
    lastName: 'Flanagan',
    description: 'David Flanagan is a computer programmer who spends most of his time writing about JavaScript and Java. His books with O\'Reilly include Java in a Nutshell, Java Examples in a Nutshell, Java Foundation Classes in a Nutshell, JavaScript: The Definitive Guide, and JavaScript Pocket Reference. David has a degree in computer science and engineering from the Massachusetts Institute of Technology. He lives with his wife and children in the U.S. Pacific Northwest between the cities of Seattle, Washington and Vancouver, British Columbia. David has a blog at www.davidflanagan.com.'
  });
  const book20 = await Book.build({
    name: 'Java in a Nutshell',
    description: "The latest edition of Java in a Nutshell is designed to help experienced Java programmers get the most out of Java 7 and 8, but it’s also a learning path for new developers. Chock full of examples that demonstrate how to take complete advantage of modern Java APIs and development best practices, the first section of this thoroughly updated book provides a fast-paced, no-fluff introduction to the Java programming language and the core runtime aspects of the Java platform.",
    price: 25
  });
  await book20.save();
  await book20.setGenre(genre2);
  await book20.setTheme(theme1);
  await book20.addAuthor(author7);

  const book21 = await Book.build({
    name: 'JavaScript Pocket Reference',
    description: "The latest edition of Java in a Nutshell is designed to help experienced Java programmers get the most out of Java 7 and 8, but it’s also a learning path for new developers. Chock full of examples that demonstrate how to take complete advantage of modern Java APIs and development best practices, the first section of this thoroughly updated book provides a fast-paced, no-fluff introduction to the Java programming language and the core runtime aspects of the Java platform.",
    price: 28
  });
  await book21.save();
  await book21.setGenre(genre2);
  await book21.setTheme(theme1);
  await book21.addAuthor(author7);

  const book22 = await Book.build({
    name: 'jQuery Pocket Reference',
    description: "The latest edition of Java in a Nutshell is designed to help experienced Java programmers get the most out of Java 7 and 8, but it’s also a learning path for new developers. Chock full of examples that demonstrate how to take complete advantage of modern Java APIs and development best practices, the first section of this thoroughly updated book provides a fast-paced, no-fluff introduction to the Java programming language and the core runtime aspects of the Java platform.",
    price: 21
  });
  await book22.save();
  await book22.setGenre(genre2);
  await book22.setTheme(theme1);
  await book22.addAuthor(author7);

  const book23 = await Book.build({
    name: 'The Ruby Programming Language',
    description: "The latest edition of Java in a Nutshell is designed to help experienced Java programmers get the most out of Java 7 and 8, but it’s also a learning path for new developers. Chock full of examples that demonstrate how to take complete advantage of modern Java APIs and development best practices, the first section of this thoroughly updated book provides a fast-paced, no-fluff introduction to the Java programming language and the core runtime aspects of the Java platform.",
    price: 21
  });
  await book23.save();
  await book23.setGenre(genre2);
  await book23.setTheme(theme1);
  await book23.addAuthor(author7);

  const book24 = await Book.build({
    name: 'Java Enterprise in a Nutshell',
    description: "The latest edition of Java in a Nutshell is designed to help experienced Java programmers get the most out of Java 7 and 8, but it’s also a learning path for new developers. Chock full of examples that demonstrate how to take complete advantage of modern Java APIs and development best practices, the first section of this thoroughly updated book provides a fast-paced, no-fluff introduction to the Java programming language and the core runtime aspects of the Java platform.",
    price: 50
  });
  await book24.save();
  await book24.setGenre(genre2);
  await book24.setTheme(theme1);
  await book24.addAuthor(author7);

  const book25 = await Book.build({
    name: 'Canvas Pocket Reference',
    description: "The latest edition of Java in a Nutshell is designed to help experienced Java programmers get the most out of Java 7 and 8, but it’s also a learning path for new developers. Chock full of examples that demonstrate how to take complete advantage of modern Java APIs and development best practices, the first section of this thoroughly updated book provides a fast-paced, no-fluff introduction to the Java programming language and the core runtime aspects of the Java platform.",
    price: 12
  });
  await book25.save();
  await book25.setGenre(genre2);
  await book25.setTheme(theme1);
  await book25.addAuthor(author7);

  const author8 = await Author.create({
    name: 'William',
    lastName: 'Shakespeare',
    description: 'William Shakespeare was an English poet and playwright, widely regarded as the greatest writer in the English language and the world\'s preeminent dramatist. He is often called England\'s national poet and the "Bard of Avon". His surviving works, including some collaborations, consist of 38 plays, 154 sonnets, two long narrative poems, and several other poems. His plays have been translated into every major living language and are performed more often than those of any other playwright.'
  });
  const book26 = await Book.build({
    name: 'Macbeth',
    description: "Dark and violent, Macbeth is also the most theatrically spectacular of Shakespeare's tragedies. Promised a golden future as ruler of Scotland by three sinister witches, Macbeth murders the king to ensure his ambitions are realized. But he soon learns the meaning of terror - killing once, he must kill again and again, and the dead return to haunt him. A story of war and witchcraft, Macbeth also explores the relationship between husband and wife, and the risks they are prepared to take to achieve their desires.",
    price: 2
  });
  await book26.save();
  await book26.setGenre(genre5);
  await book26.setTheme(theme1);
  await book26.addAuthor(author8);

  const book27 = await Book.build({
    name: 'King Lear',
    description: "Dark and violent, Macbeth is also the most theatrically spectacular of Shakespeare's tragedies. Promised a golden future as ruler of Scotland by three sinister witches, Macbeth murders the king to ensure his ambitions are realized. But he soon learns the meaning of terror - killing once, he must kill again and again, and the dead return to haunt him. A story of war and witchcraft, Macbeth also explores the relationship between husband and wife, and the risks they are prepared to take to achieve their desires.",
    price: 5
  });
  await book27.save();
  await book27.setGenre(genre5);
  await book27.setTheme(theme1);
  await book27.addAuthor(author8);

  const book28 = await Book.build({
    name: 'Hamlet: Prince of Denmark',
    description: "Dark and violent, Macbeth is also the most theatrically spectacular of Shakespeare's tragedies. Promised a golden future as ruler of Scotland by three sinister witches, Macbeth murders the king to ensure his ambitions are realized. But he soon learns the meaning of terror - killing once, he must kill again and again, and the dead return to haunt him. A story of war and witchcraft, Macbeth also explores the relationship between husband and wife, and the risks they are prepared to take to achieve their desires.",
    price: 10
  });
  await book28.save();
  await book28.setGenre(genre5);
  await book28.setTheme(theme1);
  await book28.addAuthor(author8);

  const book29 = await Book.build({
    name: 'Othello',
    description: "Dark and violent, Macbeth is also the most theatrically spectacular of Shakespeare's tragedies. Promised a golden future as ruler of Scotland by three sinister witches, Macbeth murders the king to ensure his ambitions are realized. But he soon learns the meaning of terror - killing once, he must kill again and again, and the dead return to haunt him. A story of war and witchcraft, Macbeth also explores the relationship between husband and wife, and the risks they are prepared to take to achieve their desires.",
    price: 6
  });
  await book29.save();
  await book29.setGenre(genre5);
  await book29.setTheme(theme1);
  await book29.addAuthor(author8);

  const author9 = await Author.create({
    name: 'CGP',
    lastName: 'Books',
    description: 'If you\'ve been in school in the last twenty years, or know anybody that has, chances are you\'ll have come across CGP - 90% of UK schools use our books! Every year CGP helps millions of students do brilliantly in their exams. We have over 1000 bestselling revision and practice books for ages 5-18 and beyond, covering Primary, 11+, Key Stage 3, GCSE, A-Level, Functional Skills and more. We\'re the UK\'s No.1 Educational Publisher, but success hasn\'t gone to our heads - we\'re still dedicated to making the best books at the lowest prices... and we\'re not afraid to throw in some fun along the way!'
  });
  const book30 = await Book.build({
    name: 'Grade 9-1 GCSE Physics',
    description: "This fantastic CGP Revision Guide is perfectly matched to the Higher Level Grade 9-1 AQA GCSE Physics course. Every topic is explained with clear, succinct study notes, examples and diagrams - and there are practice questions at the end of every page to test you on what you’ve learned (with answers and mark schemes included). We’ve covered all the crucial new elements of the Grade 9-1 course, including the required practicals, maths skills and Working Scientifically. What’s more, a free Online Edition of the whole book is included - just use the unique access code printed inside the cover to access it on a PC, Mac or tablet! And to make sure you’re 100% prepared for the final exams, a matching Physics Exam Practice Workbook is also available from CGP",
    price: 6
  });
  await book30.save();
  await book30.setGenre(genre2);
  await book30.setTheme(theme1);
  await book30.addAuthor(author9);

  const book31 = await Book.build({
    name: 'Grade 9-1 GCSE Chemistry',
    description: "This fantastic CGP Revision Guide is perfectly matched to the Higher Level Grade 9-1 AQA GCSE Chemistry course. Every topic is explained with clear, succinct study notes, examples and diagrams - and there are practice questions at the end of every page to test you on what you’ve learned (with answers and mark schemes included). We’ve covered all the crucial new elements of the Grade 9-1 course, including the required practicals, maths skills and Working Scientifically. What’s more, a free Online Edition of the whole book is included - just use the unique access code printed inside the cover to access it on a PC, Mac or tablet! And to make sure you’re 100% prepared for the final exams, a matching Chemistry Exam Practice Workbook is also available from CGP",
    price: 6
  });
  await book31.save();
  await book31.setGenre(genre2);
  await book31.setTheme(theme1);
  await book31.addAuthor(author9);

  const book32 = await Book.build({
    name: 'Grade 9-1 GCSE Biology',
    description: "This fantastic CGP Revision Guide is perfectly matched to the Higher Level Grade 9-1 AQA GCSE Biology course. Every topic is explained with clear, succinct study notes, examples and diagrams - and there are practice questions at the end of every page to test you on what you’ve learned (with answers and mark schemes included). We’ve covered all the crucial new elements of the Grade 9-1 course, including the required practicals, maths skills and Working Scientifically. What’s more, a free Online Edition of the whole book is included - just use the unique access code printed inside the cover to access it on a PC, Mac or tablet! And to make sure you’re 100% prepared for the final exams, a matching Biology Exam Practice Workbook is also available from CGP",
    price: 6
  });
  await book32.save();
  await book32.setGenre(genre2);
  await book32.setTheme(theme1);
  await book32.addAuthor(author9);

  const author10 = await Author.create({
    name: 'James',
    lastName: 'Holland',
    description: 'James Holland was born in Salisbury, Wiltshire, and studied history at Durham University. A member of the British Commission for Military History and the Guild of Battlefield Guides, he also regularly contributes reviews and articles in national newspapers and magazines and appears on national radio. His many books include Fortress Malta, Italy\'s Sorrow, The Battle of Britain and his fictional WW2 series featuring Sergeant Jack Tanner.'
  });
  const book33 = await Book.build({
    name: 'Normandy ‘44',
    description: "D-Day and the 76 days of bitter fighting in Normandy that followed have come to be seen as a defining episode in the Second World War. Its story has been endlessly retold, and yet it remains a narrative burdened by both myth and assumed knowledge. In this reexamined history, James Holland presents a broader overview, one that challenges much of what we think we know about D-Day and the Normandy campaign. The sheer size and scale of the Allies’ war machine ultimately dominates the strategic, operational and tactical limitations of the German forces. This was a brutal campaign. In terms of daily casualties, the numbers were worse than for any one battle during the First World War.",
    price: 13
  });
  await book33.save();
  await book33.setGenre(genre5);
  await book33.setTheme(theme1);
  await book33.addAuthor(author10);

  const book34 = await Book.build({
    name: 'Burma \'44',
    description: "In February 1944, a rag-tag collection of clerks, drivers, doctors, muleteers, and other base troops, stiffened by a few dogged Yorkshiremen and a handful of tank crews managed to hold out against some of the finest infantry in the Japanese Army, and then defeat them in what was one of the most astonishing battles of the Second World War.",
    price: 30
  });
  await book34.save();
  await book34.setGenre(genre5);
  await book34.setTheme(theme1);
  await book34.addAuthor(author10);

  const book35 = await Book.build({
    name: 'Big Week: The Biggest Air Battle of World War Two',
    description: "During the third week of February 1944, the combined Allied air forces launched their first-ever round-the-clock bomber offensive against Germany. The aim was to smash the main factories and production centres of the Luftwaffe and at the same time draw the German fighter force up into the air and into battle.",
    price: 20
  });
  await book35.save();
  await book35.setGenre(genre5);
  await book35.setTheme(theme1);
  await book35.addAuthor(author10);

  const author11 = await Author.create({
    name: 'Kentaro',
    lastName: 'Miura',
    description: 'Kentaro Miura was born in Chiba City, Chiba Prefecture, Japan, in 1966. In 1976, at the early age of 10, Miura made his first manga, entitled Miuranger, that was published for his classmates in a school publication; the manga ended up spanning 40 volumes. In 1977, Miura created his second manga called Ken e no michi (剣への道 The Way to the Sword), using India ink for the first time. When he was in middle school in 1979, Miura\'s drawing techniques improved greatly as he started using professional drawing techniques. His first dōjinshi was published, with the help of friends, in a magazine in 1982.'
  });
  const book36 = await Book.build({
    name: 'Berserk Deluxe Volume 1',
    description: "Have you got the Guts? Kentaro Miura's Berserk has outraged, horrified, and delighted manga and anime fanatics since 1989, creating an international legion of hardcore devotees and inspiring a plethora of TV series, feature films, and video games. And now the badass champion of adult fantasy manga is presented in an oversized 7\" x 10\" deluxe hardcover edition, nearly 700 pages amassing the first three Berserk volumes, with following volumes to come to serve up the entire series in handsome bookshelf collections. No Guts, no glory!",
    price: 28
  });
  await book36.save();
  await book36.setGenre(genre1);
  await book36.setTheme(theme3);
  await book36.addAuthor(author11);

  const book37 = await Book.build({
    name: 'Berserk Deluxe Volume 2',
    description: "The reigning king of adult fantasy manga now in deluxe 7x10 hardcover editions! Born in tragedy, raised in abuse and neglect, young Guts is hardened into a warrior of fearsome prowess and fearless will, drawing the attention of the charismatic Griffith, commander of the elite mercenary legion, the Band of the Hawk. This crossroad will take Guts to fame and glory... and to damnation! Collects Berserk volumes 4, 5, and 6. Kentaro Miura's Berserk has cast its enormous shadow for three decades, creating an international legion of acolytes and inspiring a parade of TV series, feature films, and video games. And now celebrating its thirtieth anniversary, the entire Berserk series is being released in handsome oversized bookshelf format, each collecting three volumes of the original manga.",
    price: 27
  });
  await book37.save();
  await book37.setGenre(genre1);
  await book37.setTheme(theme3);
  await book37.addAuthor(author11);

  const book38 = await Book.build({
    name: 'Berserk Deluxe Volume 3',
    description: "The acclaimed adult fantasy manga now in 7x10 deluxe hardcover editions! The hundred-year war between the kingdoms of Midland and Tudor nears an end as the legendary Band of the Hawk mercenaries, led by the charismatic Griffith and his fearless berserker champion Guts, turn the tide in Midland's favour. But impending victory ignites a secret war within Midland, as those seeking courtly favor see the ambitious Griffith as an obstacle to power. And nothing is more powerful than an enemy unseen] Collects Berserk volumes 7-9. Kentaro Miura's Berserk has reigned in darkness for three decades, creating an international legion of acolytes and inspiring anime TV series and feature films, video and card games, and a phalanx of related products. And now celebrating its thirtieth anniversary, the entire Berserk series is being released in handsome oversized bookshelf editions, each collecting three volumes of the original manga.",
    price: 37
  });
  await book38.save();
  await book38.setGenre(genre1);
  await book38.setTheme(theme3);
  await book38.addAuthor(author11);

  const fav = await Favourite.build();
  book2.setFavourite(fav);

  const fav2 = await Favourite.build();
  book1.setFavourite(fav2);

  const fav3 = await Favourite.build();
  book20.setFavourite(fav3);

  const fav4 = await Favourite.build();
  book25.setFavourite(fav4);

  const fav5 = await Favourite.build();
  book15.setFavourite(fav5);

  const fav6 = await Favourite.build();
  book18.setFavourite(fav6);

  const fav7 = await Favourite.build();
  book13.setFavourite(fav7);

  const fav8 = await Favourite.build();
  book7.setFavourite(fav8);

  // new Date(year, month-1, day, hours+2, minutes, seconds, milliseconds)
  const event1 = await Event.create({
    name: 'Usborne book event',
    date: new Date(2019, 6 - 1, 1, 17 + 2, 30),
    description:'Lorem ipsum dolor sit amet, massa dolor nisl semper deserunt rhoncus, tellus sed placerat diam. Viverra vivamus vitae. Tempus eros pellentesque nullam ac amet quam, mauris luctus lacus dapibus ligula duis. Odio aliquam. Ut vivamus amet mauris ac sed. Donec dictum, elit sed sed justo eu netus. Orci libero amet mauris enim, lectus est fermentum volutpat dignissimos, accumsan a magna cursus euismod ultricies, vestibulum arcu. Nunc in leo enim ante, tristique enim sapien ipsum mi arcu dui, leo egestas ultricies sociosqu. Ut tortor pellentesque amet consequat elit, vitae egestas at. Et quisque tellus suspendisse, vitae adipiscing vel.'
  })
  const event2 = await Event.create({
    name: 'The open book event',
    date: new Date(2019, 6 - 1, 1, 17 + 2, 30),
    description: 'Sed ut, ac accumsan. Nec id sodales eget vel tortor vel, ultricies enim justo ut, ac rhoncus non, sunt tortor augue. Luctus tellus vel amet risus. Justo pellentesque proin pede. Nec dictum est, ullamcorper accumsan, natoque accumsan pellentesque pellentesque, wisi orci orci adipiscing ut. Lorem purus donec eros magnis, velit ad risus turpis magna sollicitudin cras, velit. Suspendisse per elit consectetuer turpis eget, in interdum natoque est justo in aliquam, ipsum suspendisse dolor erat in.'
  })
  const event3 = await Event.create({
    name: 'Feria del libro la Rioja 2018',
    date: new Date(2019, 8 - 1, 1, 17 + 2, 30),
    description:'Orci et a sed nisl incidunt amet. Quam placerat donec aliquam leo, tempus tellus vel nullam faucibus sit, platea nam voluptates tellus ut, leo arcu volutpat. Amet eum accumsan nec, in enim viverra vehicula sapien, odio at tempor, hendrerit luctus sapien. Dictumst aliquam pede, aliquam commodo etiam, in sociosqu conubia et mauris nulla suspendisse, fringilla diam convallis nunc sed fermentum pretium, eu et velit. Aliquet duis, posuere amet maecenas egestas integer. Dolor iure morbi. Fringilla sit quam at nulla vehicula nullam, potenti accumsan est praesent odio, tortor parturient ut turpis placerat amet. Ullamcorper nulla quisque nunc adipiscing, in neque faucibus. Volutpat aliquam eget, est vitae sed adipiscing nunc imperdiet, at nulla integer placeat eget arcu, eu at erat ut justo lorem, vel et dictum. Risus lorem non duis. A blandit, tellus odio vulputate.'
  })
  const event4 = await Event.create({
    name: 'Feria del libro Juan Filloy',
    date: new Date(2019, 20 - 1, 1, 17 + 2, 30),
    description: 'Class nunc ante, adipisicing aenean felis elementum amet. Urna curabitur sagittis ut non at mi. Hendrerit erat non wisi massa tristique, nunc placerat ante interdum ultrices dui pellentesque. Tincidunt venenatis porta non vehicula et, lectus rhoncus bibendum fusce pulvinar, sit ut neque, ipsum vitae, sit justo sit. Vitae fugit at id nibh vestibulum, quam praesent eros platea cum non sit, class scelerisque luctus lacinia eget. Ut dignissim luctus mi magna donec et, ligula rhoncus lacus et, rutrum eu ante, purus praesent. Cras vel enim libero lorem, tincidunt lectus felis montes, mauris a volutpat donec, volutpat velit dolor eu id tincidunt ultrices. Vel mauris, pellentesque nunc iaculis morbi minim a eleifend. Fermentum placerat euismod sit nec elit posuere, sodales est cras. Vitae enim ipsum sollicitudin, quisque dapibus felis ultrices elit penatibus ullamcorper. Molestie libero blandit ac massa, neque ultricies.'
  })
  const event5 = await Event.create({
    name: 'Feria internacional del libro',
    date: new Date(2019, 15 - 1, 1, 17 + 2, 30),
    description: 'Metus morbi sed nibh lorem vestibulum, tellus rutrum mi at pulvinar arcu tellus, velit urna vel morbi, metus eget ut non in. Quis et id, nascetur integer morbi, vel donec ac arcu sit. Leo nonummy velit praesent in, a dui dolor ante suspendisse et elit. Nulla nibh dolor amet amet, in nibh duis aliquam laoreet nostra. Faucibus lorem dolor cras nascetur ligula metus.'
  })
  const event6 = await Event.create({
    name: 'Kent Police open day book event',
    date: new Date(2019, 22 - 1, 1, 17 + 2, 30),
    description:'Wisi mauris mauris. Eros tincidunt justo magna eros, et feugiat orci praesent interdum, ut feugiat eros morbi vel massa, auctor vitae orci, tortor donec tempor enim et mauris. Placerat quisque mollis sem. Sollicitudin a. Quis sit proin eleifend vitae, amet molestie, duis ac mollis sed vitae tristique, laoreet nec erat nam feugiat enim pretium, non porta nibh nullam eu viverra et.'
  })
  await book1.addEvent(event1);
  await book23.addEvent(event2);
  await book8.addEvent(event3);
  await book11.addEvent(event4);
  await book15.addEvent(event5);
  await book6.addEvent(event6);
}