var mongoose = require('mongoose');
var encrypt = require('../utilities/encryption');

var userSchema = mongoose.Schema({
	firstName: {type: String, required: '{PATH} is required!'},
	lastName: {type: String, required: '{PATH} is required!'},
	username: {
		type: String,
		required: '{PATH} is required!',
		unique: true
	},
	salt: {type: String, required: '{PATH} is required!'},
	hashed_pwd: {type: String, required: '{PATH} is required!'},
	roles: [String]
});

userSchema.methods = {
	authenticate: function(passwordToMatch) {
		return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
	},
	hasRole: function(role) {
		return this.roles.indexOf(role) > -1;
	}
};

function createDefaultUsers() {
	var User = mongoose.model('User', userSchema);
	User.find({}).exec(function(err, collection) {
		if (collection.length === 0) {
			var salt, hash;
			salt = encrypt.createSalt();
			hash = encrypt.hashPwd(salt, 'nadeemabd');
			User.create({
				firstName: 'Nadeem',
				lastName: 'Abdulla',
				username: 'nadeemabd',
				salt: salt,
				hashed_pwd: hash,
				roles: ['admin']
			});
			salt = encrypt.createSalt();
			hash = encrypt.hashPwd(salt, 'nadabd');
			User.create({
				firstName: 'Nad',
				lastName: 'Abd',
				username: 'nadabd',
				salt: salt,
				hashed_pwd: hash,
				roles: []
			});
			salt = encrypt.createSalt();
			hash = encrypt.hashPwd(salt, 'qwerty');
			User.create({
				firstName: 'qwerty',
				lastName: 'qwerty',
				username: 'qwerty',
				salt: salt,
				hashed_pwd: hash
			});
		}

	});
}

exports.createDefaultUsers = createDefaultUsers;