const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwT = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const { pool, JWT_SECRET } = require('../config');

const bcrypt = require('bcryptjs');

// JSON WEB TOKEN STRATEGY
passport.use(new JwtStrategy({
    jwtFromRequest:  ExtractJwT.fromHeader('authorization'),
    secretOrKey: JWT_SECRET
}, async (payload, done) => {
    try {
        // Find the user specified in token

        const id = payload.sub;
        pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
            if (error) {
              throw error;
            }
            if (results.rowCount == 1) {
                // user found
                console.log("user found!");
                done(null, id);
            }
            else return done(null, false);
          });
        
    } catch (error) {
        done(error, false);
    }
}));

// LOCAL STRATEGY
passport.use(new LocalStrategy({
    usernameField: 'id'
}, async(id, password, done) => {
    // Find the user given the email
    try {
        pool.query('SELECT password FROM users WHERE id = $1', [id], (error, results) => {
            if(error) {
            throw error
            }
    
            if(results.rowCount != 0) {
            var savedPassword = results.rows[0].password;
            var isValidPassword = bcrypt.compareSync(password, savedPassword);
            if(isValidPassword) return done(null, id);
            }
            done(null, false);
        });
    } catch (error) {
        done(error, false);
    }
}));