module.exports = (sequelize, type) => {
    return sequelize.define('event', {
        name: {
          type: type.STRING
        },
        description: type.TEXT,
        date: type.DATE
    })
}