var User = require('../models/user');


module.exports.new = function(userData, callback) {
  User.create(userData, callback);
}