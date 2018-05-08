var Anime = require('../models/anime');

module.exports.all = function() {
  return Anime.find({}).exec();
}

module.exports.find_by_mal_id = function(mal_id) {
  return Anime.findOne({ mal_id: mal_id }).exec();
}

module.exports.update_one = function(mal_id, update_object, callback) {
  return Anime.update({ mal_id: mal_id }, update_object, {upsert: true, setDefaultsOnInsert: true}).exec()
  	//, function(err) { callback(err) });
}

module.exports.update_score = function(id, new_score, mal_username){
	return Anime.update({ _id: id }, {$push: {scores: new_score, users: mal_username}}).exec();
}