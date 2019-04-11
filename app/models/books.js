module.exports = (sequelize, type) => {
    return sequelize.define('book', {
        name: {
          type: type.STRING
        },
        price: type.INTEGER
    })
}