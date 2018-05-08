const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


var AnimeSchema = new mongoose.Schema({
  mal_id: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  users: [{
    type: String, // mal_username
  }],
  average_score: {
    type: Number,
  },
  scores: [{
    type: Number,
  }],
  description: {
    type: String
  }
});

const Anime = mongoose.model('Anime', AnimeSchema);
module.exports = Anime;