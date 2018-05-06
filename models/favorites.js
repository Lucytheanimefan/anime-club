var mongoose = require('mongoose');
mongoose.Promise = global.Promise;


var FavoritesSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  anime_list: [{
    anime: { type: mongoose.Schema.ObjectId, ref: 'Anime' },
  }]
})


var Favorites = mongoose.model('Favorites', FavoritesSchema);
module.exports = Favorites;