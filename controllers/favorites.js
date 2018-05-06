var Favorites = require('../models/favorites');
var Users = require('./users');
var MAL = require('./myanimelist')

module.exports.topanime = async function(callback) {
  var users = await Users.all();
  console.log('Users:')
  console.log(users);

  var completed_requests = 0;
  for (let i = 0; i < users.length; i++) {
  	MAL.mal_for_user(users[i].mal_username, function(status, result){
  		completed_requests += 1;
  		console.log(status);
  		console.log(result);
  		if (completed_requests == users.length) {

            console.log('Done looping through the requests!')
            callback(status, result);
        }
  	})
  	// Get the user's top anime
  }

  // var query = { type: 'topanime' },
  //   update = { expire: new Date() },
  //   options = { upsert: true, new: true, setDefaultsOnInsert: true };
  // Favorites.findOneAndUpdate(query, update, options, function(error, result) {})
}

