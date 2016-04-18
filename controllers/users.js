var express = require('express');
var controller = express.Router();
var User = require('../models/Users');
var bcrypt = require('bcrypt');
var Salt = bcrypt.genSaltSync(10);

controller.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// logout
controller.get('/logout', function(req, res, next) {
  req.session.user = null;
  req.json({ 'message': 'You have been loggest out.'});
});

// create a account
controller.post('/signup', function(req, res, next){
  var userInfo = {
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, Salt)
  };

  User.create(userInfo, function(err, user){
    // console.log(post)
  res.json({ 'message': 'You have successfully registered an account!'})
  });
});

controller.post('/login', function(req, res, next) {
  var userInfo = {
    email: req.body.email,
    password: req.body.password
  };
  User.find({ email: userInfo.email }, function(err, user) {
    var isPasswordValid = bcrypt.compareSync(userInfo.password, user[0].passwordHash);
    if (isPasswordValid) {
      req.session.user = user[0].email;
      res.json({ 'message': 'Logged in successfully'});
    } else {
      res.json({ 'message': 'Invalid username and/or password'});
    }
  });
});

module.exports = controller;
