var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var bcrypt = require('bcrypt');


var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: false,
    trim: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
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

UserSchema.statics.authenticate = function(email, password, callback) {
  User.findOne({ email: email })
    .exec(function(err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        let err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, function(err, result) {
        return callback(err, user);
      })
    });
}

var User = mongoose.model('User', UserSchema);
module.exports = User;