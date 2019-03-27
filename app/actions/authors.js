const pool = require('../../config')

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

  module.exports = {
    getAuthors,     
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor
  }