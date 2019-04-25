module.exports = (sequelize, type) => {
    return sequelize.define('author', {
        name: {
          type: type.STRING
        },
        lastName: type.STRING,
        description: type.TEXT
    })
}