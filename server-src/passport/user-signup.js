var jwt = require('jsonwebtoken');
var Strategy = require('passport-local').Strategy;
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
        console.log("ABOUT TO CREATE A NEW USER")
        var newUser = new User({
          username: req.body.username.trim(),
          password: req.body.password.trim(),
          todo: '[]'
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
      } else {
        return done('This username is taken');
      }
    });
  }
);
