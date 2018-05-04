var express = require('express');
var router = express.Router();
var User = require('../models/user');
var users = require('../controllers/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('login')
});


router.post('/login', function(req, res, next) {
  User.authenticate(req.body.email, req.body.password, function(err, user) {
    if (err) {
      return next(err);
    }
    return res.redirect('/');
  })
});

router.post('/create', function(req, res, next) {
  var userData = { email: req.body.email, password: req.body.password, username: req.body.username }
  if (req.body.mal_username) {
    userData.mal_username = req.body.mal_username;
  }
  User.create(userData, function(err, user) {
    if (err) {
      return next(err);
    }
    console.log(user);
    return res.redirect('/');
  });
});

module.exports = router;