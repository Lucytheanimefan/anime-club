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
        animes.update_one(mal_id, { mal_id: mal_id, title: title, average_score: score }, function(err) {
          if (err) {
            console.log(err);
          }
        });
        // console.log('Found anime:')
        console.log(anime);

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