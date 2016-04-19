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
  req.session.user = null;
  res.json({ 'message': 'You have been logged out.'});
});

///////////////////////////// create a account
controller.post('/signup', function(req, res, next){
  var userInfo = {
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, Salt)
  };
  User.find({ /*username: userInfo.username,*/ email: userInfo.email }, function(err, users) {
    console.log(users.length);
    if (users.length >= 1) {
      // doesDuplicateExist = true;
      res.json({ 'message': 'This account and/or email already exists!'})
    } else if (users.length === 0 || (users.length === 1 && users[0].username !== userInfo.username || users[0].email !== userInfo.email)) {
      User.create(userInfo, function(err, users) {
        res.json({ 'message': 'You have successfully registered an account!'})
      });
    } else {
      res.json({'message': 'error'})
      // for each person in users
    }
  })
});

// Login
controller.post('/login', function(req, res, next) {
  var userInfo = {
    email: req.body.email,
    password: req.body.password
  };
  User.find({ email: userInfo.email }, function(err, user) {
    var isPasswordValid = bcrypt.compareSync(userInfo.password, user[0].password);
    if (isPasswordValid) {
      req.session.user = user[0].email;
      res.json({ 'message': 'Logged in successfully'});
    } else {
      res.json({ 'message': 'Invalid username and/or password'});
    }
  });
});

// Not sure about this????
// Update
// controller.put('/update/:id', function(req, res) {
//   User.findByIdAndUpdate(req.params.id, req.body, function(err, user) {
//     if (err) console.log(err);
//     res.json({'message': 'Account has been updated'});
//   });
// });
// controller.patch('/update/:id', function(req, res) {
//   User.findByIdAndUpdate(req.params.id, req.body, function(err, user) {
//     if (err) console.log(err);
//     res.json({'message': 'Account has been updated'});
//   });
// });

// update - new =============================================================
// controller.put('/update', function(req, res) {
//   var userInfo = {
//     username: req.body.username,
//     email: req.body.email,
//     password: bcrypt.hashSync(req.body.password, Salt)
//   };
//   User.findOneAndUpdate({ email: userInfo.email }, function(err, users) {
//     users.username = userInfo.username;
//     users.password = userInfo.password;
//   })
//   res.json({'message': 'Account has been updated'});
// })
// ============================================================================

// Not sure about this????
// Delete
controller.delete('/delete/:id', function(req, res) {
  User.findByIdAndRemove(req.params.id, req.body, function(err, user) {
    if (err) console.log(err);
    res.json({ 'message': 'Account has been deleted'});
  });
});

module.exports = controller;
