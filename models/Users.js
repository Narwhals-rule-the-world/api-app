var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  id: Number,
  username: String,
  email: String,
  password: String
});

module.exports = mongoose.model("Users", userSchema)
