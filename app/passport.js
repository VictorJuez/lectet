const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwT = require('passport-jwt').ExtractJwt;
const { pool, JWT_SECRET } = require('../config');

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