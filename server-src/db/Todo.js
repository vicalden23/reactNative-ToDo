var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/yingtodo');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('openUri', function() {
  useMongoClient: true
  console.log('Connection open on: mongodb://localhost/yingtodo');
});

var todoSchema = new mongoose.Schema({
  todo: {type: String, required: true}
});

var Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
