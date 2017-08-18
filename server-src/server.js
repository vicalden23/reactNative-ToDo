var express = require('express');
var bodyParser = require('body-parser');
var Todo = require('./db/Todo.js');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/client'));
app.listen(2023, function() {
  console.log('LISTENING PORT NUMBER 2023');
});

app.get('/todos', function(req, res) {
  Todo.find({}).exec(function(err, data) {
    res.status(200).send(data);
  });
});

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