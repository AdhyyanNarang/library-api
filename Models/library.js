var mongoose = require('mongoose');

var librarySchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	}, 
	description: {
		type: String,
		required: true
	},
	location: {
		type: String,
		required: true
	}, 
	totalSeats: {
		type: String,
		required: true
	},
	seatCounter: {
		type: Number,
		required: true
	}, 
	image_url: {
		type: String,
		required: true
	}
});

var Library = module.exports = mongoose.model('Library', librarySchema);

//get all Users

module.exports.getLibraries = function(callback, limit){
	Library.find(callback).limit(limit);
}

//get Single User

module.exports.getLibraryById = function(id,callback){
	Library.findById(id, callback);
}

module.exports.addLibrary = function(library, callback){
	Library.create(library, callback);
}

module.exports.updateLibary = function(id, library, options, callback){
	var query = {_id: id};
	var update = {
		name: library.name,
		description: library.description,
		location: library.location,
		totalSeats: library.totalSeats,
		seatCounter: library.seatCounter,
		image_url: library.image_url
	}
	User.findOneAndUpdate(query, update, options, callback);
}

module.exports.updateLibaryAddOne = function(id, library, options, callback){
	var query = {_id: id};
	var update = {
		seatCounter: seatCounter + 1
	}
	User.findOneAndUpdate(query, update, options, callback);
}