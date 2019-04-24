module.exports = (sequelize, type) => {
    return sequelize.define('order', {
        quantity: {
          type: type.INTEGER
        }
    })
}