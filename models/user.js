var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var bcrypt = require('bcrypt');


var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: false,
    trim: true,
  },
  username: {
    type: String,
    required: true,
  }
  mal_username: {
    type: String,
    required: false,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    default: 'user',
    required: true,
  }
})

//hashing a password before saving it to the database
UserSchema.pre('save', function(next) {
  var user = this;
  if (user.password) {
    if (user.password.length > 0) {
      console.log('Trying to hash');
      bcrypt.hash(user.password, 10, function(err, hash) {
        if (err) {
          console.log('Error after save: ' + err);
          return next(err);
        }
        user.password = hash;
        console.log('Saved password successfully');
        next(null, user);
      });
    }
  } else if (user.netid !== null) {
    return next(null, user);
  }
});

var User = mongoose.model('User', UserSchema);
module.exports = User;