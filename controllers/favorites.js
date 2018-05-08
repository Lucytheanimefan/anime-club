const Favorites = require('../models/favorites');
const Users = require('./users');
const MAL = require('./myanimelist');
const Anime = require('../models/anime')
const animes = require('../controllers/animes')

module.exports.topanime = async function(callback) {
  const users = await Users.all();
  console.log('Users:')
  console.log(users);

  var completed_requests = 0;
  for (let i = 0; i < users.length; i++) {
    MAL.mal_for_user(users[i].mal_username, function(status, result) {
      completed_requests += 1;
      // console.log(status);
      // console.log(result);

      //var completed_anime_reqs = 0;
      for (let j = 0; j < result.length; j++) {
        //completed_anime_reqs += 1;
        let anime = result[j];
        let mal_id = anime['anime_id'];
        let title = anime['anime_title'];
        let score = anime['score'];
        if (score >= 8) {
          const findAnimeQuery = animes.find_by_mal_id(mal_id);
          var updateAnimeQuery;
          findAnimeQuery.then(function(anime) {
            if (anime && anime.users != null && !anime.users.includes(users[i].mal_username) ) {
            	console.log(anime.users);
            	console.log('Update score: ' + title);
              updateAnimeQuery = animes.update_score(anime._id, score, users[i].mal_username);
            } else if (!anime){
            	console.log('Create new anime');
              updateAnimeQuery = Anime.create({ mal_id: mal_id, title: title, average_score: score, scores: [score], users: [users[i].mal_username] });
              //updateAnimeQuery = animes.update_one(mal_id, { mal_id: mal_id, title: title, average_score: score });
            }
            else {
            	console.log('Do nothing');
            }
            return updateAnimeQuery;
          }).then(function(updatedAnime) {
          }).catch(function(err) {
            console.log(err);
            return callback(err);
          })
        }
      }

      if (completed_requests == users.length) {
        console.log('Done looping through the requests!')
        callback(status, result);
      }
    })
    // Get the user's top anime
  }

  // Write the new top anime to the db

}