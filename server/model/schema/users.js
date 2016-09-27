var mongoose = require('mongoose');
var crypto = require('crypto');


//User Account Schema here
var reg_user = new mongoose.Schema({  
	email              : { type: String, required:true, index: {unique: true}},
	password           : { type: String, required: true},
	salt               : { type: String},
	name               : { type: String},
	gender             : { type: [{type: String, enum: ['Male', 'Female']}], default: 'Male' },
	created_date       : { type: Date, default: Date.now },
	updated            : { type: Date, default: null },
	roles              : { type: String, default: 'user' },
	provider           : { type: String} //, required: 'Provider is required'
});

// save password with encrpted 
reg_user.pre('save', function(next) {
		if (this.password) {
			var md5 = crypto.createHash('md5');
			this.password = md5.update(this.password).digest('hex');
		}

		next();
	}
);

/*reg_user.methods.authenticate = function(password) {
	var md5 = crypto.createHash('md5');
	md5 = md5.update(password).digest('hex');

	return this.password === md5;
};*/

reg_user.statics.findUniqueUsername = function(username, suffix, callback) {
	var _this = this;
	var possibleUsername = username + (suffix || '');

	_this.findOne(
		{name: possibleUsername},
		function(err, user) {
			if (!err) {
				if (!user) {
					callback(possibleUsername);
				}
				else {
					return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
				}
			}
			else {
				callback(null);
			}
		}
	);
};

/*User.pre('save', function(next) {
  var user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
    });
  });
});*/


//Password verification

reg_user.methods.comparePassword = function(password) {
	var md5 = crypto.createHash('md5');
	md5 = md5.update(password).digest('hex');

	return this.password === md5;
};



var regUserSchema = mongoose.model('User', reg_user);  