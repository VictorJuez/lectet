const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwT = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const { pool, JWT_SECRET } = require('../config');
const { User } = require('./sequelize');

const bcrypt = require('bcryptjs');

// JSON WEB TOKEN STRATEGY
passport.use(new JwtStrategy({
    jwtFromRequest:  ExtractJwT.fromHeader('authorization'),
    secretOrKey: JWT_SECRET
}, async (payload, done) => {
    try {
        // Find the user specified in token
        const email = payload.sub;

        User.findOne(
            { where: { email: email}} /* where criteria */
          ).then(user => {
              return done(null, user.id);
          }).catch(function(error){
              done(null, false);
          });
    } catch (error) {
        done(error, false);
    }
}));

// LOCAL STRATEGY
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async(email, password, done) => {
    // Find the user given the email
    try {
        User.findOne(
            { where: { email: email}} /* where criteria */
          ).then(user => {
              if(!user) return done(null, false);  // if no user found (email incorrect)
              var savedPassword = user.password;
              var isValidPassword = bcrypt.compareSync(password, savedPassword);
              if(isValidPassword) return done(null, user.id);
              done(null, false);
          }).catch(function(error){
              throw error;
          });
    } catch (error) {
        done(error, false);
    }
}));