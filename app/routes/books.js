const app = module.exports = require('express')();
const bookController = require('../actions').books;

app.get('/genres', bookController.getGenres);
app.get('/themes', bookController.getThemes);
app.get('/genre/:genreId', bookController.getBooksByGenre)
app.get('/theme/:themeId', bookController.getBooksByTheme)
app.get('/bestsellers', bookController.getBestSellers)
app.get('/favourites', bookController.getFavourites)
app.get('/filter', bookController.getBooksByFilter)
app.get('/', bookController.getBooks);
app.get('/:id', bookController.getBookById);
