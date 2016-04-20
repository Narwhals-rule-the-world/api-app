var express = require('express');
var controller = express.Router();
var User = require('../models/Users');
var Post = require('../models/Posts');
var bcrypt = require('bcrypt');
var Salt = bcrypt.genSaltSync(10);

controller.get('/', function(req, res, next) {
  res.send('It works!');
});

// logout
controller.get('/logout', function(req, res, next) {
  // destroy session
  req.session.user = null;
  res.json({ 'message': 'You have been logged out.'});
});

// create a account
controller.post('/signup', function(req, res, next){
  var userInfo = {
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, Salt)
  };
  User.find({ /*username: userInfo.username,*/ email: userInfo.email }, function(err, users) {
    if (users.length >= 1) {
      res.json({ 'message': 'This account and/or email already exists!'})
    } else if (users.length === 0 || (users.length === 1 && users[0].username !== userInfo.username || users[0].email !== userInfo.email)) {
      User.create(userInfo, function(err, users) {
        req.session.user = userInfo.email;
        req.session.username = userInfo.username;
        res.json({ 'message': 'You have successfully registered an account!'})
      });
    } else {
      res.json({'message': 'error'})
    }
  })
});

// Login
controller.post('/login', function(req, res, next) {
  var userInfo = {
    email: req.body.email,
    password: req.body.password
  };
  console.log(userInfo);
  User.find({ email: userInfo.email }, function(err, user) {
    var isPasswordValid = bcrypt.compareSync(userInfo.password, user[0].password);
    if (isPasswordValid) {
      req.session.user = user[0].email;
      req.session.username = user[0].username;
      res.json({ 'message': 'Logged in successfully'});
    } else {
      res.json({ 'message': 'Invalid username and/or password'});
    }
  });
});

// update
controller.put('/update', function(req, res) {
  var userInfo = {
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, Salt)
  };
  User.findOneAndUpdate({ email: req.session.user }, userInfo, function (err, users) {
    if (err) console.log(err);
    req.session.user = userInfo.email;
    req.session.username = userInfo.username
    res.json({ 'message': 'Account has been updated' })
  })
})

// DELETE
controller.delete('/delete', function(req, res) {
  User.findOneAndRemove({ email: req.session.user }, req.session, function(err, user) {
    if (err) console.log(err);
    res.json({ 'message': 'Account has been deleted' })
  })
})

module.exports = controller;
