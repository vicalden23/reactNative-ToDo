var jwt = require('jsonwebtoken');
var User = require('../db/Todo.js');

var isAuthenticated = (req, res, next) => {
  console.log("INSIDE OF isAuthenticated", req)
  if (!req.header('x-access-token')) {
    return res.status(401).send({
      success: false,
      message: 'Please login or sign up'
    });
  }

  var token = req.header('x-access-token');

  // prettier-ignore
  return jwt.verify(
    token,
    'shhhhh',
    function(err, decodedToken) {
      if (err) {
        return res.status(401).send({
          success: false,
          message: 'Please login or sign up'
        });
      }

      var username = decodedToken.user;

      User.findOne({username: username})
        .exec(function(err, user) {
          if (err) {
            return res.status(500).send({
              success: false,
              message: 'Please try again later'
            });
          }
          if (!user) {
            return res.status(401).send({
              success: false,
              message: 'Please sign up'
            });
          }
          req.username = username;
          return next();
        });
    });
};

module.exports = isAuthenticated;
