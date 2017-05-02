var mongoose = require('mongoose');


var preferenceSchema = mongoose.Schema({
	EngineeringLibrary: {
		type: String,
		required:true
	},
	EshlemanGroundFloor: {
		type: String,
		required: true
	},
	EnvironmentalDesignLibrary:{
		type:String,
		required: true
	},
	MusicLibrary: {
		type:String,
		required: true
	},
	MLKLowerStudyArea:{
		type: String,
		required: true
	},
	MLKUpperStudyArea:{
		type: String,
		required: true
	},
	DoeNorthReadingRoom: {
		type: String,
		required: true
	}
});

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
		required: true
	},
	currentLibrary: {
		type: String,
		required: false
	}, 
	preferences: {
		type: preferenceSchema,
		required: true
	},
	timeSpent: {
		type: preferenceSchema,
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