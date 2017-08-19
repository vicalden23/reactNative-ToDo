var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var passport = require('passport');
var User = require('./db/Todo.js');

var signupUserStrategy = require('./passport/user-signup');
var loginUserStrategy = require('./passport/user-login');

var isAuthenticated = require('./middleware/is-authenticated');

var app = express();
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/client'));
app.listen(2023, function() {
  console.log('LISTENING PORT NUMBER 2023');
});

app.use(passport.initialize());
passport.use('user-signup', signupUserStrategy);
passport.use('user-login', loginUserStrategy);

//Sign up a new user
app.post('/api/signup', function(req, res, next) {
  console.log('IN POST SIGNUP')
  return passport.authenticate('user-signup', function(err, token) {
    if (err) {

      return res.status(400).json({
        success: false,
        message: 'There was an error processing the form'
      });
    }

    return res.status(201).json({
      success: true,
      token: token
    });
  })(req, res, next);
});

//Login an existing user
app.post('/api/login', function(req, res, next) {
  console.log('IN POST LOGIN')
  return passport.authenticate('user-login', function(err, token) {
    if (err) {
      if (err.name === 'IncorrectCredentialsError') {
        return res.status(400).json({
          success: false,
          message: err.message
        });
      }

      return res.status(400).json({
        success: false,
        message: 'There was an error processing the form'
      });
    }

    return res.status(201).json({
      success: true,
      token: token
    });
  })(req, res, next);
});

//GET all todos
app.get('/api/todos', isAuthenticated, function(req, res) {
  User.findOne({username: req.username})
    .exec(function(err, user) {
      if (err) {
        console.log(err);
      }
      res.status(200).send(user.todo);
    });
});

//Add or remove a new todo
app.put('/api/todos', isAuthenticated, function(req, res) {
  console.log(req.username)
  User.update({username: req.username}, {$set: {todo: req.body.todo}}, function(err, data) {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).send(req.body.todo);
    }
  )
});

//DELETE a completed todo
app.delete('/todos', function(req, res) {
  console.log(req.body);
  Todo.findOne({todo: req.body.todo})
    .remove()
    .exec(function(err, response) {
      if(err) {
        res.status(500).send(err);
      }
      res.status(204).send(response);
    });
});