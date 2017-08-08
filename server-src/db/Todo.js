var mongoose = require('mongoose');

//create connection to storage
var db = mongoose.createConnection('mongodb://localhost/yingtodo');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  useMongoClient: true
  console.log('Connection open on: mongodb://localhost/yingtodo');
});

//define schema
var todoSchema = new mongoose.Schema({
  todo: {type: String, required: true}
});

//define model
var Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
