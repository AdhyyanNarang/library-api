var express = require('express');
var app = express();
var bodyParser =  require('body-parser');
var mongoose = require('mongoose');
var http = require('http').Server(app);
var port       = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

User = require('.models/user');
Library = require('.models/library');

//Connect to Mongoose
mongoose.connect('mongodb://localhost/library');
var db = mongoose.connection;

app.get('/', function(req,res){
	res.send('Please use /api or api/users or api/libraries');
});


// User routes
app.get('/api/users', function(req, res) {
	User.getUsers(function(err, users){
		if (err) {
			throw err;
		}
		res.json(users);
	});
});

app.get('/api/users/:_id', function(req, res) {
	User.getUserById(req.params._id, function(err, user){
		if (err) {
			throw err;
		}
		res.json(user);
	});
});

app.post('/api/users', function(req, res) {
	var user = req.body;
	User.addUser(user, function(err, user){
		if (err) {
			throw err;
		}
		res.json(user);
	});
});


app.put('/api/users/:_id', function(req, res) {
	var id = req.params._id;
	var user = req.body;
	User.updateUser(id, user, {}, function(err, genre){
		if (err) {
			throw err;
		}
		res.json(user);
	});
});


// Library Routes
app.get('/api/libraries', function(req, res) {
	Library.getLibraries(function(err, libraries){
		if (err) {
			throw err;
		}
		res.json(libraries);
	});
});

app.get('/api/libraries/:_id', function(req, res) {
	Library.getLibraryById(req.params._id, function(err, library){
		if (err) {
			throw err;
		}
		res.json(library);
	});
});

app.post('/api/libraries', function(req, res) {
	var library = req.body;
	Library.addLibrary(library, function(err, library){
		if (err) {
			throw err;
		}
		res.json(library);
	});
});


app.put('/api/libraries/:_id', function(req, res) {
	var id = req.params._id;
	var library = req.body;
	Library.updateLibrary(id, library, {}, function(err, library){
		if (err) {
			throw err;
		}
		res.json(library);
	});
});

app.put('/api/libraries/addOne/:_id', function(req, res) {
	var id = req.params._id;
	Library.updateLibraryAddOne(id, {}, function(err, library){
		if (err) {
			throw err;
		}
		res.json(library);
	});
});


app.listen(port);
console.log('Magic happens on port: ' + port);