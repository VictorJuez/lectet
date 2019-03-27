const pool = require('../../config')

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

  module.exports = {
    getBooks,       // Books
    getBookById,
    createBook,
    updateBook,
    deleteBook
  }