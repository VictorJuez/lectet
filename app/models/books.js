module.exports = (sequelize, type) => {
    return sequelize.define('book', {
        name: {
          type: type.STRING
        },
        description: type.TEXT,
        price: type.INTEGER
    })
}