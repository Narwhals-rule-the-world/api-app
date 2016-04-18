var express = require('express');
var router = express.Router();
var Post = require('../models/Posts')
var User = require('../models/Users');

console.log(Post)
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/test', function(req, res){

  Post.create({placeName: req.body.placeName}, function(err, post){
    console.log(post)
    res.json(post)
  })

})

router.get('/test', function(req, res){
  Post.find(function(err, posts){
    console.log(posts)
    res.json(posts)
  })

})
module.exports = router;
