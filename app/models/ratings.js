module.exports = (sequelize, type) => {
    return sequelize.define('rating', {
        rating: {
          type: type.INTEGER
        },
        comment: type.STRING
    })
}