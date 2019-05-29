module.exports = (sequelize, type) => {
    return sequelize.define('order', {
        name: {
          type: type.STRING
        },
        surname: type.STRING,
        email: type.STRING,
        address: type.STRING,
        city: type.STRING,
        country: type.STRING,
        zip: type.STRING
    })
}