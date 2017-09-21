var mongoose = require('mongoose'),
    passportLocalMongoose = require('passport-local-mongoose');

var User = new mongoose.Schema({
        firstname: { type: String},
	lastname: { type: String},
        status: { type: String},
        role: { type: String},
        dob: { type: String},
        phone: { type: String},
        gin: { type: String},
        pin: { type: String},
        profilepic: { type: String},
        doca: { type: String},
        docb: { type: String},
        country: { type: String},
        address: { type: String},
        facebook_id:{ type: String},
        google_id:{ type: String},
        google_token:{ type: String},
        image:{ type: String},
        facebook_token:{ type: String},
	email: { type: String,required: '{PATH} is required!'},
        created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
});

// Passport-Local-Mongoose will add a username, 
// hash and salt field to store the username, 
// the hashed password and the salt value

// configure to use email for username field
User.plugin(passportLocalMongoose, { usernameField: 'email' });


User.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  next();
});

module.exports = mongoose.model('User', User);