module.exports = (sequelize, type) => {
    return sequelize.define('user', {
        email: {
          type: type.STRING
        },
        password: type.STRING
    })
}