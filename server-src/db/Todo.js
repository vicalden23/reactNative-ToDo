var mongoose = require('mongoose');

//connect to db
mongoose.connect('mongodb://vickitodo:vickitodo@ds149433.mlab.com:49433/yingtodo');
var db = mongoose.connection;
db.once('open', function() {
  console.log('Mongo connection open on ds149433.mlab.com:49433/yingtodo');
});

//define schema
var userSchema = new mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  todo: {type: String, required: true}
});

//define model
var User = mongoose.model('User', userSchema);

module.exports = User;
