module.exports = (sequelize, type) => {
    return sequelize.define('author', {
        name: {
          type: type.STRING
        },
        lastName: type.STRING,
        address: type.STRING
    })
}