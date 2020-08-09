const passport = require('passport');
const bcrypt = require('bcrypt');
const user = require('../server/models/user');
const localStrategy = require('passport-local').Strategy;

function serialization() {
  try {
    passport.serializeUser(
      (user, done) => {
        done(null, user.id)
      }
    );
    
    passport.deserializeUser((id, done) => {
      user.findById(id, (err, result) => {
        err ? done(err) : done(null, result);
      });
    });
  }
  catch(err) {
    console.error('error on serialization: ', err);
  }
}

function strategy() {
  passport.use(new localStrategy(
    { usernameField: 'email' },
    (email, password, done) => {
      user.findOne({ email: email  }, (err, result) => {
        if(err) { return done(err); }

        if(!user) { 
          return done(null, false);
        }
        else {
          bcrypt.compare(password, result.password, (err, isEqual) => {
            if(err) {
              return done(err, false);
            }

            !isEqual
              ? done(null, false)
              : done(null, result);
          });
        }
      });
    }
  ));
  serialization();
}

module.exports = strategy;