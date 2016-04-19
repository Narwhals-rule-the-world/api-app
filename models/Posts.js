var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  placeName: String,
  lat: Number,
  lng: Number,
  comment: String,
  picture: String,
  time: Date,
  userName: String
});

module.exports = mongoose.model("Post", PostSchema)
