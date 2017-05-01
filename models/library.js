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
		type: Number,
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

//get all librarys

module.exports.getLibraries = function(callback, limit){
	Library.find(callback).limit(limit);
}

//get Single library
module.exports.getLibraryById = function(id,callback){
	Library.findById(id, callback);
}

module.exports.addLibrary = function(library, callback){
	Library.create(library, callback);
}

module.exports.updateLibrary = function(id, library, options, callback){
	var query = {_id: id};
	var update = {
		name: library.name,
		description: library.description,
		location: library.location,
		totalSeats: library.totalSeats,
		seatCounter: library.seatCounter,
		image_url: library.image_url
	}
	Library.findOneAndUpdate(query, update, options, callback);
}

module.exports.updateLibrary = function(id, library, options, callback){
	var query = {_id: id};
	Library.findById(id, function(err, originalLibrary) {
		var update = {
			name: null,
			description: null,
			location: "Berkeley",
			totalSeats: 0,
			seatCounter: 0,
			image_url: null
		}
		if (library.name != null) {
			update.name = library.name;
		} else {
			update.name = originalLibrary.name;
		}

		if (library.description != null) {
			update.description = library.description;
		} else {
			update.description = originalLibrary.description;
		}

		if (library.location != null) {
			update.location = library.location;
		} else {
			update.location = originalLibrary.location;
		}

		if (library.totalSeats != null) {
			update.totalSeats = library.totalSeats;
		} else {
			update.totalSeats = originalLibrary.totalSeats;
		}

		if (library.seatCounter != null) {
			update.seatCounter = library.seatCounter;
		} else {
			update.seatCounter = originalLibrary.seatCounter;
		}

		if (library.image_url != null) {
			update.image_url = library.image_url;
		} else {
			update.image_url = originalLibrary.image_url;
		}
		Library.findOneAndUpdate(query, update, options, callback);
	});
}

module.exports.updateLibraryAddOne = function(id, options, callback){
	var query = {_id: id};
	Library.findOneAndUpdate(query, {$inc: { "seatCounter" : 1 }} , options, callback);
}