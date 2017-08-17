var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
//create connection to storage
var db = mongoose.createConnection('mongodb://vickialden:<Vickialden1>@ds163681.mlab.com:63681/yingtodo', {
  useMongoClient: true
});

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connection open on: mongodb://localhost/yingtodo');
});

//define schema
var todoSchema = new mongoose.Schema({
  todo: {type: String, required: true}
});

//define model
var Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
