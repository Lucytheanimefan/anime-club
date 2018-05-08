var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Users = require('../controllers/users');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  let users = await Users.all();
  res.render('users', { title: 'Users', users: users });
});

router.get('/login', async function(req, res, next) {
  res.render('login');
});

router.post('/login', function(req, res, next) {
  User.authenticate(req.body.email, req.body.password, function(err, user) {
    if (err) {
      return next(err);
    }
    req.session.userId = user._id;
    req.session.username = user.username;
    req.session.email = user.email;
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
    req.session.userId = user._id;
    req.session.username = user.username;
    req.session.email = user.email;
    return res.redirect('/');
  });
});

module.exports = router;