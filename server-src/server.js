var express = require('express');
var bodyParser = require('body-parser');
var Todo = require('./db/Todo.js');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var port = process.env.PORT || 8080;

app.listen(2023, function() {
  console.log('LISTENING PORT NUMBER 2023');
});

app.get('api/todos', function(req, res) {
  Todo.find({}).exec(function(err, todos) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(todos);
    }
  });
});

app.post('/api/todos', function(req, res) {
  Todo.findOne({todo: req.body.todo})
    .exec(function(err, todo) {
      if (!todo) {
        var newTodo = new Todo({
          todo: req.body.todo
        });
        newTodo.save(function(err, todo) {
          if (err) {
            res.status(500).send(err);
          } else {
            res.status(201).send(todo);
          }
        });
      }
    });
});