var express = require('express');
var router = express.Router();
var favorites = require('../controllers/favorites');

/* GET users listing. */
router.get('/', function(req, res, next) {
  favorites.topanime(function(status, result) {
    res.render('favorites', { title: 'Favorites', anime: result })
  });
});



module.exports = router;