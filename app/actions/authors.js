const { Author, Book } = require('../sequelize');

const getAuthorById = async (request, response) => {
  console.log(request.params.id);
  const author = await Author.findByPk(request.params.id, {include: [Book]});
  response.status(200).json({author});
}

module.exports = {
  getAuthorById,
}