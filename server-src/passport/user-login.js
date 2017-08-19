var jwt = require('jsonwebtoken');
var Strategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');
var User = require('../db/Todo.js');

module.exports = new Strategy(
  {
    usernameField: 'username',
    passwordField: 'password',
    session: false,
    passReqToCallback: true
  },
  function(req, username, password, done) {
    console.log("ABOUT TO QUERY DB", req.body)
    User.findOne({username: req.body.username})
    .exec(function(err, user) {
      if (err) {
        return done(err);
      }
      if(!user) {
        var error = new Error('Incorrect username or password');
        error.name = 'IncorrectCredentialsError';

        return done(error);
      }
      return bcrypt.compare(req.body.password, user.password).then(function(isMatch) {
        if (!isMatch) {
          var err = new Error('Incorrect username or password');
          err.name = 'IncorrectCredentialsError';

          return done(err);
        }

        var payload = {
          sub: user.id,
          user: user.username
        };

        var token = jwt.sign(payload, 'shhhhh', {
          expiresIn: '7d'
        });

        return done(null, token);
      });
    });
  }
);
