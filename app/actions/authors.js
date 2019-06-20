const { Author, Book } = require('../orm/sequelize');

const getAuthorById = async (request, response) => {
  console.log(request.params.id);
  const author = await Author.findByPk(request.params.id, {include: [Book]});
  response.status(200).json({author});
}

const getAllAuthors = async (request, response) => {
  const authors = await Author.findAll();
  response.status(200).json(authors);
}

module.exports = {
  getAuthorById,
  getAllAuthors
}