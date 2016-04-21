var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  homeLocation: String
});

module.exports = mongoose.model("User", userSchema)
