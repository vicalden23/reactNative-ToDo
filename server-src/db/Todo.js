var mongoose = require('mongoose');

//connect to db
mongoose.connect('mongodb://vickitodo:vickitodo@ds149433.mlab.com:49433/yingtodo');
var db = mongoose.connection;
db.once('open', function() {
  console.log('Mongo connection open on ds149433.mlab.com:49433/yingtodo');
});

//define schema
var todoSchema = new mongoose.Schema({
  todo: {type: String, required: true}
});

//define model
var Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
