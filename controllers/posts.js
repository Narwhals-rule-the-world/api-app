var express = require('express');
var postController = express.Router();
var Post = require('../models/Posts');
var User = require('../models/Users');

// console.log(Post)

// user sends a lat and lng
// this route responds with a list of reviews near that area
// within the 'radius' parameter
postController.post('/search', function(req, res, next) {
  var location = {
    lat: parseFloat(req.body.lat),
    lng: parseFloat(req.body.lng),
    radius: parseFloat(req.body.radius)
  };
  console.log(location);
  // find the locations from the database

  Post.find({ lat:
                { $lt: location.lat + location.radius,
                  $gt: location.lat - location.radius },
              lng:
                { $lt: location.lng + location.radius,
                  $gt: location.lng - location.radius } },
    function(err, posts){
      if (err) console.log(err);
      else res.json(posts);

  });
});

postController.post('/create', function(req, res){
  var postInfo = {
    placeName: req.body.placeName,
    lat: req.body.lat,
    lng: req.body.lng,
    comment: req.body.comment,
    picture: req.body.picture,
    time: req.body.time,
    userName: req.session.username
  };
  Post.create(postInfo, function(err, post){
    console.log(post);
    res.json({'message': 'You have successfully made a post!'});
  });
});

postController.get('/test', function(req, res){
  Post.find(function(err, posts){
    console.log(posts)
    res.json(posts)
  })
})

module.exports = postController;
