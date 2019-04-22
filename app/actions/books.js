const Sequelize = require('sequelize');
const { Book, Genre, Theme, Favourite } = require('../sequelize');

// BOOKS operations
const getBooks = async (request, response) => {
  const books = await Book.findAll();
  response.status(200).json({books});
}
    
    
const getBookById = async (request, response) => {
  const book = await Book.findByPk(request.params.id);
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
    }
  });
  response.status(200).json({books});
}

const getBooksByTheme = async (request, response) => {
  const books = await Book.findAll({
    where: {
      themeId: request.params.themeId
    }
  });
  response.status(200).json({books});
}

const getBestSellers = (request, response) => {

}

const getFavourites = async (request, response) => {
  const favourites = await Favourite.findAll();
  const favouriteBooks = favourites.map(favourite => favourite.bookId);
  const books = await Book.findAll({
    where: {
      id: {
        [Sequelize.Op.in]: favouriteBooks
      }
    }
  });
  response.status(200).json({books});
}

module.exports = {
  getBooks,       // Books
  getBookById,
  getGenres,
  getThemes,
  getBooksByGenre,
  getBooksByTheme,
  getBestSellers,
  getFavourites
}