const pool = require('../../config')

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
        throw error
        }
        response.status(200).json(results.rows)
    })
    }
    
    
const getUserById = (request, response) => {
    const id = request.params.id
  
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
    
const createUser = (request, response) => {
  const { id, password, name, surname_primary, surname_secondary, age, email, address } = request.body

  console.log(request.body);

  pool.query('INSERT INTO users (id, password, name, surname_primary, surname_secondary, age, email, address) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [id, password, name, surname_primary, surname_secondary, age, email, address], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with id: ${id}`)
  })
}

const updateUser = (request, response) => {
  //const id = parseInt(request.params.id)
  const { id, password, name, surname_primary, surname_secondary, age, email, address } = request.body

  pool.query(
    'UPDATE users SET password = $2, name = $3, surname_primary = $4, surname_secondary = $5, age = $6, email = $7, address = $8 WHERE id = $1',
    [id, password, name, surname_primary, surname_secondary, age, email, address],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

const loginUser = (request, response) => {
  const { id, password } = request.body

  console.log(request.body)

  pool.query('SELECT count(*) FROM users WHERE id = $1 and password = $2', [id, password], (error, results) => {
    if(error) {
      throw error
    }
    response.status(200).json(results.rows) //If emit on the count 1 is that the id and password are correct, if emit 0 the opossite
  })
}

module.exports = {
    getUsers,       // Users
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    loginUser
}