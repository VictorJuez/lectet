const Sequelize = require('sequelize');

const sequelize = new Sequelize('degpai9eklcvs5', 'pfguwsqduqkxxv', 'ffbab27c92e5005956bf45d8883ea39428b2c3722f63d5607faeb493bdb88ae9', {
    host: 'ec2-54-247-85-251.eu-west-1.compute.amazonaws.com',
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: true
    },
    define: {
        // The `timestamps` field specify whether or not the `createdAt` and `updatedAt` fields will be created.
        // This was true by default, but now is false by default
        timestamps: false
      }
  });

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const User = sequelize.define('user', {
// attributes
id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
},
password: {
    type: Sequelize.STRING
    // allowNull defaults to true
}
}, {
// options
});

User.findAll().then(users => {
    console.log("All users:", JSON.stringify(users, null, 4));
  });