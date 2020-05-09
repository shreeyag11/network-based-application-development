var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var ConnectionDB = require('../utility/ConnectionDB');
var userDB = require('../utility/UserDB');
var Connection = require('../models/connection');
const UserProfile = require('../models/UserProfile');
const User = require('../models/user');
var router = express.Router();

let err = new Array(1);

//Login
router.get('/login', function(req, res, next) {
	if (req.session.UserSession) {
		res.redirect('/myconnections');
	} else {
		res.render('login');
	}
});

router.post('/login', function(req, res, next) {
	if (req.session.UserSession) {
		res.redirect('/myconnections');
	} else {
		var userdata = userDB.getUser();
		var user = new User(userdata.user_id, userdata.user_fname, userdata.user_lname, userdata.user_email, userdata.address1, userdata.city, userdata.state, userdata.zip, userdata.country);
		req.session.UserSession = user;
		req.session.user_Profile = new UserProfile(user, []);
		res.redirect('/myconnections');
	}
});


router.get('/', function(req, res, next) {
	res.render('index', {
		UserSession: req.session.UserSession
	});
});

//Connections Page
router.get('/connections', function(req, res, next) {
	var connections = [];
	var status = null;
	var topics = new ConnectionDB().getTopics();

	new ConnectionDB().getConnections().forEach(connection => {
		connections.push(new Connection(connection.conn_id, connection.conn_name, connection.conn_topic, connection.conn_details, connection.conn_location, connection.conn_host, connection.conn_date, connection.conn_timeFrom, connection.conn_timeTo, connection.conn_image));
	});

	if (err.length > 0) {
		status = err.pop();
	}
	var data = {
		"topics": topics,
		"connections": connections,
		"UserSession": req.session.UserSession
	};

	res.render('connections', {
		data: data,
		UserSession: data.UserSession
	});
});

//Connection Page
router.get('/connection/:id', function(req, res, next) {
	var id = req.params.id;
	var connection;
	if (validate(id)) {
		try {
			connection = new ConnectionDB().getConnection(id);
			connection = new Connection(connection.conn_id, connection.conn_name, connection.conn_topic, connection.conn_details, connection.conn_location, connection.conn_host, connection.conn_date, connection.conn_timeFrom, connection.conn_timeTo, connection.conn_image);

			var data = {
				"connection": connection,
				"UserSession": req.session.UserSession
			};
			res.render('connection', {
				data: data,
				UserSession: data.UserSession
			});
		} catch (e) {
			err.push(404);
			res.redirect('/connections');
		}
	} else {
		err.push(400);
		res.redirect('/connections');
	}

});

//User Specific Connections
router.get('/myconnections', function(req, res, next) {
	if (req.session.UserSession) {
		let data = {
			"user_Profile": req.session.user_Profile,
		};
		res.render('savedConnections', {
			UserSession: data.user_Profile.user,
			userConnections: data.user_Profile.userConnections
		});
	} else {
		res.redirect('/login')
	}
});

//RSVP Connections
router.get('/myconnections/rsvp', function(req, res, next) {
	var rsvp_id = req.query.id;
	if (req.query.rsvp.toUpperCase() == "YES" || req.query.rsvp.toUpperCase() == "NO" || req.query.rsvp.toUpperCase() == "MAYBE") {
		var rsvp = req.query.rsvp;
	}
	if (req.session.UserSession) {
		try {
			var user_Profile = new UserProfile(req.session.user_Profile.user, req.session.user_Profile.userConnections);
			var connection = new ConnectionDB().getConnection(rsvp_id);
			var connection = new Connection(connection.conn_id, connection.conn_name, connection.conn_topic, connection.conn_details, connection.conn_location, connection.conn_host, connection.conn_date, connection.conn_timeFrom, connection.conn_timeTo, connection.conn_image);
			user_Profile.addConn(connection, rsvp);
			req.session.user_Profile = user_Profile;
			res.render('savedConnections', {
				UserSession: req.session.user_Profile.user,
				userConnections: req.session.user_Profile.userConnections
			});
		} catch (e) {
			err.push(404)
			res.redirect('/connections')
		}
	} else {
		res.redirect('/login');
	}
});

//Delete Connections
router.get('/myconnections/delete', function(req, res, next) {
	var code = req.query.connectionId;
	if (req.session.UserSession) {
		try {
			var user_Profile = new UserProfile(req.session.user_Profile.user, req.session.user_Profile.userConnections);
			var connection = new ConnectionDB().getConnection(code);
			var connection = new Connection(connection.conn_id, connection.conn_name, connection.conn_topic, connection.conn_details, connection.conn_location, connection.conn_host, connection.conn_date, connection.conn_timeFrom, connection.conn_timeTo, connection.conn_image);
			user_Profile.removeConn(connection);
			req.session.user_Profile = user_Profile;
			res.render('savedConnections', {
				UserSession: req.session.user_Profile.user,
				userConnections: req.session.user_Profile.userConnections
			});
		} catch (e) {
			err.push(404)
			res.redirect('/connections')
		}
	} else {
		res.redirect('/login')
	}
});

// Sign out
router.get('/signout', function(req, res, next) {
	req.session.destroy();
	res.render('index', {
		UserSession: undefined
	});
})

//Creating New Connection
router.get('/newConnection', function(req, res, next) {
	if (!req.session.UserSession) {
		res.render('newConnection')
	}else{
	res.render('newConnection', {
		UserSession: req.session.user_Profile.user
	});
}
});

router.get('/contact', function(req, res, next) {
	if (!req.session.UserSession) {
		res.render('contact')
	}else{
	res.render('contact', {
		UserSession: req.session.user_Profile.user
});
	}

});


router.get('/about', function(req, res, next) {
	if (!req.session.UserSession) {
		res.render('about')
	}else{
	res.render('about', {
		UserSession: req.session.user_Profile.user
	});
}
});

router.get('/*', function(req, res, next) {
	if (!req.session.UserSession) {
		res.render('Error404')
	}else{
	res.render('Error404', {
		UserSession: req.session.user_Profile.user
	});
}  

});

function validate(id) {
	if (id !== undefined) {
		if (Number.isInteger(Number.parseInt(id))) {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
}


module.exports = router;
