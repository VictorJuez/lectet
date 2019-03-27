/**
 **********************************
 * DATABASE CONNECTION SETTINGS   *
 **********************************
**/

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'pfguwsqduqkxxv',
  host: 'ec2-54-247-85-251.eu-west-1.compute.amazonaws.com',
  database: 'degpai9eklcvs5',
  password: 'ffbab27c92e5005956bf45d8883ea39428b2c3722f63d5607faeb493bdb88ae9',
  port: 5432,
  ssl: true,
})



// AUTHOR operations
const getAuthors = (request, response) => {
  pool.query('SELECT * FROM authors ORDER BY id ASC', (error, results) => {
      if (error) {
      throw error
      }
      response.status(200).json(results.rows)
  })
  }
  
  
const getAuthorById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM authors WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
  
const createAuthor = (request, response) => {
const { name, surname_primary, surname_secondary, nationality, biography } = request.body

pool.query('INSERT INTO authors (name, surname_primary, surname_secondary, nationality, biography) VALUES ($1, $2, $3, $4, $5)', [name, surname_primary, surname_secondary, nationality, biography], (error, results) => {
  if (error) {
    throw error
  }
  response.status(201).send(`Author added`)
})
}

const updateAuthor = (request, response) => {
//const id = parseInt(request.params.id)
const { id, name, surname_primary, surname_secondary, nationality, biography } = request.body

pool.query(
  'UPDATE authors SET name = $2, surname_primary = $3, surname_secondary = $4, nationality = $5, biography = $6 WHERE id = $1',
  [id, name, surname_primary, surname_secondary, nationality, biography],
  (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Author modified with ID: ${id}`)
  }
)
}

const deleteAuthor = (request, response) => {
const id = parseInt(request.params.id)

pool.query('DELETE FROM authors WHERE id = $1', [id], (error, results) => {
  if (error) {
    throw error
  }
  response.status(200).send(`Author deleted with ID: ${id}`)
})
}

// BOOKS operations
const getBooks = (request, response) => {
  pool.query('SELECT * FROM books ORDER BY id ASC', (error, results) => {
      if (error) {
      throw error
      }
      response.status(200).json(results.rows)
  })
  }
  
  
const getBookById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM books WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
  
const createBook = (request, response) => {
const { id, principal_name, secondary_name, id_author, editorial, genre, type, synopsis, price, stock } = request.body

pool.query('INSERT INTO books (id, principal_name, secondary_name, id_author, editorial, genre, type, synopsis, price, stock) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', [id, principal_name, secondary_name, id_author, editorial, genre, type, synopsis, price, stock], (error, results) => {
  if (error) {
    throw error
  }
  response.status(201).send(`Book added with id: ${id}`)
})
}

const updateBook = (request, response) => {
//const id = parseInt(request.params.id)
const { id, principal_name, secondary_name, id_author, editorial, genre, type, synopsis, price, stock } = request.body

pool.query(
  'UPDATE books SET principal_name = $2, secondary_name = $3, id_author = $4, editorial = $5, genre = $6, type = $7, synopsis = $8, price = $9, stock = $10 WHERE id = $1',
  [id, principal_name, secondary_name, id_author, editorial, genre, type, synopsis, price, stock],
  (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Book modified with ID: ${id}`)
  }
)
}

const deleteBook = (request, response) => {
const id = parseInt(request.params.id)

pool.query('DELETE FROM books WHERE id = $1', [id], (error, results) => {
  if (error) {
    throw error
  }
  response.status(200).send(`Book deleted with ID: ${id}`)
})
}

// RATING operations
const getRatings = (request, response) => {
  pool.query('SELECT * FROM ratings', (error, results) => {
      if (error) {
      throw error
      }
      response.status(200).json(results.rows)
  })
  }
  
  
const getRatingById = (request, response) => {
  const user_id = parseInt(request.params.user_id)
  const book_id = parseInt(request.params.book_id)

  pool.query('SELECT * FROM ratings WHERE book_id = $1 AND user_id = $2', [book_id, user_id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
  
const createRating = (request, response) => {
const { book_id, user_id, rating, comments, date } = request.body

pool.query('INSERT INTO ratings (book_id, user_id, rating, comments, date) VALUES ($1, $2, $3, $4, $5)', [book_id, user_id, rating, comments, date], (error, results) => {
  if (error) {
    throw error
  }
  response.status(201).send(`Rating added with book id: ${book_id} and user id: ${user_id}`)
})
}

const updateRating = (request, response) => {
//const id = parseInt(request.params.id)
const { book_id, user_id, rating, comments, date } = request.body

pool.query(
  'UPDATE ratings SET rating = $3, comments = $4, date = $5 WHERE book_id = $1 AND user_id = $2',
  [book_id, user_id, rating, comments, date],
  (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Rating modified with book id: ${book_id} and user id: ${user_id}`)
  }
)
}

const deleteRating = (request, response) => {
const book_id = parseInt(request.params.book_id)
const user_id = parseInt(request.params.user_id)

pool.query('DELETE FROM ratings WHERE book_id = $1 AND user_id = $2', [book_id, user_id], (error, results) => {
  if (error) {
    throw error
  }
  response.status(200).send(`Rating deleted with book id: ${book_id} and user id: ${user_id}`)
})
}

// SALES operations
const getSales = (request, response) => {
  pool.query('SELECT * FROM sales ORDER BY id ASC', (error, results) => {
      if (error) {
      throw error
      }
      response.status(200).json(results.rows)
  })
  }
  
  
const getSaleById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM sales WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
  
const createSale = (request, response) => {
const { buyer, book_buy, hour, price } = request.body

pool.query('INSERT INTO sales (buyer, book_buy, price, hour) VALUES ($1, $2, $3, $4)', [buyer, book_buy, price, hour], (error, results) => {
  if (error) {
    throw error
  }
  response.status(201).send(`Sale added`)
})
}

const updateSale = (request, response) => {
//const id = parseInt(request.params.id)
const { id, buyer, book_buy, price, hour } = request.body

pool.query(
  'UPDATE sales SET buyer = $2, book_buy = $3, price = $4, hour = $5 WHERE id = $1',
  [id, buyer, book_buy, price, hour],
  (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Sale modified with ID: ${id}`)
  }
)
}

const deleteSale = (request, response) => {
const id = parseInt(request.params.id)

pool.query('DELETE FROM sales WHERE id = $1', [id], (error, results) => {
  if (error) {
    throw error
  }
  response.status(200).send(`Sale deleted with ID: ${id}`)
})
}

module.exports = {
  getUsers,       // Users
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  getAuthors,     // Authors
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
  getBooks,       // Books
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  getRatings,      // Ratings
  getRatingById,
  createRating,
  updateRating,
  deleteRating,
  getSales,      // Sales
  getSaleById,
  createSale,
  updateSale,
  deleteSale,
}