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
    User.findOne({username: req.body.username})
    .exec(function(err, user) {
      if (err) {
        return done(err);
      }
      if(!user) {
        return bcrypt.genSalt(10)
          .then(function(salt) {
            return bcrypt.hash(req.body.password.trim(), salt);
          })
          .then(function(hashedPassword) {
            var newUser = new User({
              username: req.body.username.trim(),
              password: hashedPassword,
              todo: 'Welcome to Todo It'
            });
            newUser.save()
              .then(function(user) {
                var payload = {
                  sub: user.id,
                  user: user.username
                };

                var token = jwt.sign(payload, 'shhhhh', {
                  expiresIn: '7d'
                });

                return done(null, token);
              })
              .catch(function(err) {
                return done(err);
              });
          });
      } else {
        return done('This username is taken');
      }
    });
  }
);
