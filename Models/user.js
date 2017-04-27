var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	username: {
		type: String,
		required: true
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
		required: true
	}, 
	preferences: {
		type: Array,
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

module.exports.updateUser = function(id, user, options, callback){
	var query = {_id: id};
	var update = {
		username: user.username,
		email: user.email,
		password: user.password,
		currentLibrary: user.currentLibrary,
		preferences: user.preferences
	}
	User.findOneAndUpdate(query, update, options, callback);
}