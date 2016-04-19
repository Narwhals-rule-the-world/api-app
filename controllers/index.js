var express = require('express');
var controller = express.Router();
var Post = require('../models/Posts');
var User = require('../models/Users');

// console.log(Post)
/* GET users listing. */
controller.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

controller.post('/post', function(req, res){
  var postInfo = {
    placeName: req.body.placeName,
    location: req.body.location,
    comment: req.body.comment,
    picture: req.body.picture,
    time: req.body.time,
    userName: req.body.userName
  };
  Post.create(postInfo, function(err, post){
    console.log(post)
    res.json({'message': 'You have successfully made a post!'})
  });
});

controller.get('/test', function(req, res){
  Post.find(function(err, posts){
    console.log(posts)
    res.json(posts)
  })
})

module.exports = controller;
