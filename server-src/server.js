var express = require('express');
var bodyParser = require('body-parser');
var Todo = require('./db/Todo.js');

var app = express();

var port = process.env.PORT || 3000;
var ip = '127.0.0.1';

app.use(express.static(__dirname + '/assets'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, ip, function() {
  console.log('LISTENING ON PORT NUMBER ', port);
});

//handle GET request for all todos
app.get('/api/todos', function(req, res) {
  console.log('INSIDE OF GET');
  Todo.find({}).exec(function(err, todos) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      console.log(todos)
      res.status(200).send(todos);
    }
  });
});

//handle POST request to add todo
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