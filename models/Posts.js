var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  placeName: String,
  location: String,
  comment: String,
  picture: String,
  time: Date,
  userName: String
});

module.exports = mongoose.model("Post", PostSchema)
