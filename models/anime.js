const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


var AnimeSchema = new mongoose.Schema({
  mal_id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true
  },
  users: [{
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }],
  average_score: {
    type:Number
  },
  description: {
    type:String
  }
})


var Anime = mongoose.model('Anime', AnimeSchema);
module.exports = Anime;