module.exports = (sequelize, type) => {
    return sequelize.define('event', {
        name: {
          type: type.INTEGER
        },
        description: type.STRING,
        type: type.STRING
    })
}