var express = require('express');
var app = express();
var bodyParser =  require('body-parser');
var mongoose = require('mongoose');
var mongodb = require("mongodb");
var port = process.env.PORT || 3000;
var morgan      = require('morgan');

var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//app.use(morgan('dev'));

User = require('./models/user');
Library = require('./models/library');

//Connect to Mongoose
mongoose.connect(config.database);
app.set('superSecret', config.secret); // secret variable
var db = mongoose.connection;


app.get('/', function(req,res){
	res.send('Please use /api or api/users or api/libraries');
});

var apiRoutes = express.Router(); 


//authenticate route that returns a token
apiRoutes.post('/authenticate', function(req, res) {

  // find the user
  User.findOne({
    username: req.body.username
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {
        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, app.get('superSecret'), {
          expiresIn: '1440m' // expires in 24 hours
        });
        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }   

    
	}
  });

});

//the sign up must happen before the token is given, so it has been placed before the middleware.
apiRoutes.post('/users', function(req, res) {
	var user = req.body;
	User.addUser(user, function(err, user){
		if (err) {
			throw err;
		}
		res.json(user);
	});
});



//middleware that only allows the HTTP requests after this point to go through if the token exists.
apiRoutes.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
    
  }
});


// User routes
apiRoutes.get('/users', function(req, res) {
	User.getUsers(function(err, users){
		if (err) {
			throw err;
		}
		res.json(users);
	});
});

apiRoutes.get('/users/:_id', function(req, res) {
	User.getUserById(req.params._id, function(err, user){
		if (err) {
			throw err;
		}
		res.json(user);
	});
});

apiRoutes.put('/users/:_id', function(req, res) {
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
apiRoutes.get('/libraries', function(req, res) {
	Library.getLibraries(function(err, libraries){
		if (err) {
			throw err;
		}
		res.json(libraries);
	});
});

apiRoutes.get('/libraries/:_id', function(req, res) {
	Library.getLibraryById(req.params._id, function(err, library){
		if (err) {
			throw err;
		}
		res.json(library);
	});
});

apiRoutes.post('/libraries', function(req, res) {
	var library = req.body;
	Library.addLibrary(library, function(err, library){
		if (err) {
			throw err;
		}
		res.json(library);
	});
});

apiRoutes.put('/libraries/:_id', function(req, res) {
	var id = req.params._id;
	var library = req.body;
	Library.updateLibrary(id, library, {}, function(err, library){
		if (err) {
			throw err;
		}
		res.json(library);
	});
});

apiRoutes.put('/libraries/addOne/:_id', function(req, res) {
	var id = req.params._id;
	Library.updateLibraryAddOne(id, {}, function(err, library){
		if (err) {
			throw err;
		}
		res.json(library);
	});
});

app.use('/api', apiRoutes);

app.listen(port);
console.log('Listening on port:' + port)