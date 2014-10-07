var mongoose = require('mongoose');
var crypto = require('crypto');

module.exports = function(config) {
	mongoose.connect(config.db);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'Error Connection..'));
	db.once('open', function callback() {
		console.log('DB Opened');
	});

	var userSchema = mongoose.Schema({
		firstName: String,
		lastName: String,
		username: String,
		salt: String,
		hashed_pwd: String,
		roles: [String]
	});

	userSchema.methods = {
		authenticate: function(passwordToMatch) {
			return hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
		}
	}

	var User = mongoose.model('User', userSchema);
	User.find({}).exec(function(err, collection) {
		if (collection.length === 0) {
			var salt, hash;
			salt = createSalt();
			hash = hashPwd(salt, 'nadeemabd');
			User.create({
				firstName: 'Nadeem',
				lastName: 'Abdulla',
				username: 'nadeemabd',
				salt: salt,
				hashed_pwd: hash,
				roles: ['admin']
			});
			salt = createSalt();
			hash = hashPwd(salt, 'nadabd');
			User.create({
				firstName: 'Nad',
				lastName: 'Abd',
				username: 'nadabd',
				salt: salt,
				hashed_pwd: hash,
				roles: []
			});
			salt = createSalt();
			hash = hashPwd(salt, 'qwerty');
			User.create({
				firstName: 'qwerty',
				lastName: 'qwerty',
				username: 'qwerty',
				salt: salt,
				hashed_pwd: hash
			});
		};

	});
};

function createSalt() {
	return crypto.randomBytes(128).toString('base64');
}

function hashPwd(salt, pwd) {
	var hmac = crypto.createHmac('sha1', salt);
	return hmac.update(pwd).digest('hex');
}