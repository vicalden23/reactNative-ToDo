var jwt = require('jsonwebtoken');
var User = require('../db/Todo.js');

var isAuthenticated = function(req, res, next) {
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

      var userId = decodedToken.sub;

      User.findOne({_id: userId})
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
          req.userId = userId;
          return next();
        });
    });
};

module.exports = isAuthenticated;
