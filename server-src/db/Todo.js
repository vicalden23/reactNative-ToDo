var mongoose = require('mongoose');

mongoose.connect('mongodb://<vickialden>:<Iamvicki1>@ds163681.mlab.com:63681/yingtodo');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connection open on: ds163681.mlab.com:63681/yingtodo');
});

var todoScehma = new mongoose.Schema({
  todo: {type: String, required: true}
});

var Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
