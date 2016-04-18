var express = require('express');
var router = express.Router();

var Post = require('../models/Posts');
var User = require('../models/Users');

/* GET home page. */
router.get('/', function(req, res, next) {
  User.find(function(err, post){
    console.log(post)

  })
  res.json('something')
});



module.exports = router;
