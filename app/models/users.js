module.exports = (sequelize, type) => {
    return sequelize.define('user', {
        email: {
          type: type.STRING, 
          unique: true
        },
        password: type.STRING
    })
}