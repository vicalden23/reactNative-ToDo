var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var passport = require('passport');
var User = require('./db/Todo.js');

var signupUserStrategy = require('./passport/user-signup');
var loginUserStrategy = require('./passport/user-login');

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
app.get('/todos', function(req, res) {
  Todo.find({}).exec(function(err, data) {
    res.status(200).send(data);
  });
});

//POST a new todo
app.post('/todos', function(req, res) {
  Todo.findOne({todo: req.body.todo})
    .exec(function(err, todo) {
      if(!todo) {
        var newTodo = new Todo({
          todo: req.body.todo
        });
        newTodo.save(function(err, todo) {
          if(err) {
            res.status(500).send(err);
          }
          res.status(201).send(todo);
        });
      }
    });
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