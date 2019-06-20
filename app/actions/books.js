const Sequelize = require('sequelize');
const { Book, Author, Genre, Theme, Favourite, Sale } = require('../orm/sequelize');

// BOOKS operations
const getBooks = async (request, response) => {
  const books = await Book.findAll({include: [Author]});
  response.status(200).json({books});
}
    
    
const getBookById = async (request, response) => {
  const book = await Book.findByPk(request.params.id, {include: [Author]});
  response.status(200).json({book});
}

const getGenres = async (request, response) => {
  const genres = await Genre.findAll();
  response.status(200).json({genres});
}

const getThemes = async (request, response) => {
  const themes = await Theme.findAll();
  response.status(200).json({themes});
}

const getBooksByGenre = async (request, response) => {
  const books = await Book.findAll({
    where: {
      genreId: request.params.genreId
    },
    include: [Author]
  });
  response.status(200).json({books});
}

const getBooksByTheme = async (request, response) => {
  const books = await Book.findAll({
    where: {
      themeId: request.params.themeId
    },
    include: [Author]
  });
  response.status(200).json({books});
}

const getBestSellers = async (request, response) => {
  const bestSellers = await Sale.findAll({
    order: [
      ['quantity','DESC'],
    ],
  });
  const result = bestSellers.slice();
  response.status(200).json(result);
}

const getFavourites = async (request, response) => {
  const favourites = await Favourite.findAll();
  const favouriteBooks = favourites.map(favourite => favourite.bookId);
  const books = await Book.findAll({
    where: {
      id: {
        [Sequelize.Op.in]: favouriteBooks
      }
    },
    include: [Author]
  });
  response.status(200).json({books});
}

const getBooksByFilter = async (request, response) => {
  var genres = request.query.genre;
  var theme = request.query.theme;
  genres = genres.split(',');
  theme = theme.split(',');

  const books = await Book.findAll({
    where: {
      themeId: theme,
      genreId: genres
    },
    include: [Author]
  });

  response.status(200).json(books);
}

module.exports = {
  getBooks,       // Books
  getBookById,
  getGenres,
  getThemes,
  getBooksByGenre,
  getBooksByTheme,
  getBestSellers,
  getFavourites,
  getBooksByFilter
}