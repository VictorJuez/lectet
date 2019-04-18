const bcrypt = require('bcryptjs');


module.exports = (sequelize, type) => {
    return sequelize.define('user', {
        email: {
          type: type.STRING, 
          unique: true
        },
        password: type.STRING
    }, {
      instanceMethods: {
        sayTitle: function() {
          console.log("hello");
        }
      },
      hooks: {
        beforeSave: async (user, options) => {
          try {
            // Generate a salt
            const salt = await bcrypt.genSalt(10);
            // Generate a password hash
            const passwordHash = await bcrypt.hash(user.password, salt);
            // Re-assigned hash password over original password
            user.password = passwordHash;
          } catch (error) {
            throw error;
          }
        }
      }
    });
}