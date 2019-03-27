const pool = require('../../config')

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
    getSales,      // Sales
    getSaleById,
    createSale,
    updateSale,
    deleteSale,
  }