const pool = require('../../config')

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

module.exports = {
    getRatings,      // Ratings
    getRatingById,
    createRating,
    updateRating,
    deleteRating
}