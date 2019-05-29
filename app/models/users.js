const bcrypt = require('bcryptjs');

const User = (sequelize, type) => {
  const UserSequelize = sequelize.define('user', {
      name: type.STRING,
      surname: type.STRING,
      email: {
        type: type.STRING, 
        unique: true
      },
      password: type.STRING
  }, {
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

  // Defining custom methods
  UserSequelize.prototype.isValidPassword = async function (newPassword) {
    try {
      return await bcrypt.compare(newPassword, this.password)
    } catch (error) {
      
    }
   }

  return UserSequelize;
}


module.exports = User;