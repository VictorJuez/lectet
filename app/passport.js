const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwT = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const { JWT_SECRET } = require('../config');
const { User } = require('./sequelize');

// JSON WEB TOKEN STRATEGY
passport.use(new JwtStrategy({
    jwtFromRequest:  ExtractJwT.fromHeader('authorization'),
    secretOrKey: JWT_SECRET
}, async (payload, done) => {
    try {
        // Find the user specified in token
        const user = await User.findByPk(payload.sub);
        
        // If it doesn't exists, handle it
        if(!user) return done(null, false);

        // Otherwise return the user
        return done(null, user);

    } catch (error) {
        done(error, false);
    }
}));

// LOCAL STRATEGY
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async(email, password, done) => {
    try {
        // Find the user given the email
        const user = await User.findOne({email});

        // If not, handle it
        if(!user) return(null, false);

        // Check if password is correct

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