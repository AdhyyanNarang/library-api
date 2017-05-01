var mongoose = require('mongoose');


var userSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
		index: {unique: true}
	}, 
	email: {
		type: String,
		required: true
	}, 
	password: {
		type: String,
		required: true,
		select: false
	},
	currentLibrary: {
		type: String,
		required: true
	}, 

	preferences: {
		type: Array,
		required: false
	},
	timeSpent: {
		Bechtel: {type: String},
		Doe: {type: String},
		MLK: {type: String},
		EastAsian: {type: String},
		Moffit: {type: String},
		Environmental: {type: String},
		Music: {type: String},
		Haas: {type: String},
		VLSB: {type: String},
		Math: {type: String},
		required: false
	}
});

var User = module.exports = mongoose.model('User', userSchema);

//get all Users

module.exports.getUsers = function(callback, limit){
	User.find(callback).limit(limit);
}

//get Single User

module.exports.getUserById = function(id,callback){
	User.findById(id, callback);
}

module.exports.addUser = function(user, callback){
	User.create(user, callback);
}


// updates all the fields provided by client in the request of the body. The other fields are retained as the old ones.
module.exports.updateUser = function(id, user, options, callback){
	var query = {_id: id};
	User.findById(id, function(err, originalUser) {
		var update = {
			username: null,
			email: null,
			password: null,
			currentLibrary: null,
			preferences: null
		}
		if (user.username != null) {
			update.username = user.username;
		} else {
			update.username = originalUser.username;
		}

		if (user.email != null) {
			update.email = user.email;
		} else {
			update.email = originalUser.email;
		}

		if (user.password != null) {
			update.password = user.password;
		} else {
			update.password = originalUser.password;
		}

		if (user.currentLibrary != null) {
			update.currentLibrary = user.currentLibrary;
		} else {
			update.currentLibrary = originalUser.currentLibrary;
		}

		if (user.preferences != null) {
			update.preferences = user.preferences;
		} else {
			update.preferences = originalUser.preferences;
		}
		User.findOneAndUpdate(query, update, options, callback);
	});
}