var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var ConnectionDB = require('../utility/ConnectionDB');
// var {getConnections, getConnection, getTopics} = require('../utility/ConnectionDB')
//const connectionDB = new ConnectionDB();
var UserDB = require('../utility/UserDB');
var UserProfileDB = require('../utility/UserProfileDB');
var Connection = require('../models/connection');
const UserProfile = require('../models/UserProfile');
const User = require('../models/user');
var router = express.Router();
var bodyParser = require('body-parser');
var UserConnection = require('../models/UserConnection');

var urlencodedParser = bodyParser.urlencoded({ extended: false });


let err = new Array(1);

//Login
router.get('/login', function(req, res, next) {
	if (req.session.UserSession) {
		res.redirect('/myconnections');
	} else {
		res.render('login');
	}
});

router.post('/login',urlencodedParser, async function(req, res, next) {
	if (req.session.UserSession) {
		res.redirect('/myconnections');
	} else {
		// var userdata = await; UserDB.addUser();5
		// //console.log("controller:",req.body);
		var user = await UserDB.getUser();
		//var user = new User(userdata.user_id, userdata.user_fname, userdata.user_lname, userdata.user_email, userdata.address1, userdata.city, userdata.state, userdata.zip, userdata.country);
		//console.log("inside login check data: ",user);
		req.session.UserSession = user;
		req.session.user_Profile = new UserProfile(user, []);

		// var data = {
		// 	"user":user,
		// 	"UserSession": req.session.UserSession
		// };
	
		res.redirect('myconnections');
	}
});


router.get('/', function(req, res, next) {
	res.render('index', {
		UserSession: req.session.UserSession
	});
});


router.post('/newConnection',urlencodedParser, async function(req,res){
	// var lastid= await ConnectionDB.getConnections().sort({"_id" : -1}).limit(1);
	if (req.session.UserSession) {
		var lastid= await ConnectionDB.getLastConnectionId();
			// console.log("connections in controller: ",lastid);
			// console.log("lastID: ",lastid[0].conn_id);
			var newid=lastid[0].conn_id+1;

		//console.log(req.body);
		var insertConnection = new Connection(newid, req.body.name,req.body.topic,req.body.details,req.body.place,req.session.UserSession._user_fname,req.body.date,req.body.timeFrom,req.body.timeTo);
		// console.log('insertConnection',insertConnection);
		await ConnectionDB.addConnection(req.session.UserSession._user_id,insertConnection);
		//adding connection to UserProfile
		try {
			var getConn = await UserProfileDB.getUserProfile(req.session.UserSession._user_id);
			console.log("getConn",getConn);
			if(getConn.length!=0){
				console.log("if");
				await UserProfileDB.addNewConn(newid,req.session.UserSession._user_id,"yes");
			}
			else {
				console.log("rsvp");
				await UserProfileDB.createNewConn(newid,req.session.UserSession._user_id,"yes");
			}
			res.redirect('myconnections');
		} catch (e) {
			err.push(404)
			res.redirect('/connections')
		}
	} else {
		res.redirect('/login');
	}

});


  
//Connections Page
router.get('/connections', async function(req, res, next) {
	var connections = [];
	var status = null;
	var topics = await ConnectionDB.getTopics();
	let connectionsList = await ConnectionDB.getConnections();
	connectionsList.forEach((connection) => {
		connections.push(connection);
	});
	// new Connection(Connection.conn_id, Connection.conn_name, Connection.conn_topic, Connection.conn_details, Connection.conn_location, Connection.conn_host, Connection.conn_date, Connection.conn_timeFrom, Connection.conn_timeTo, Connection.conn_image
	if (err.length > 0) {
		status = err.pop();
	}
	var data = {
		"topics": topics,
		"connections": connectionsList,
		"UserSession": req.session.UserSession
	};

	res.render('connections', {
		data: data,
		UserSession: data.UserSession
	});
});

//Connection Page
router.get('/connection/:id', async function(req, res, next) {
	// ////console.log(req.params);
	var id = req.params.id;
	var connection;
	// ////console.log("inside connection/id");
	// ////console.log(req.params.id);
	if (validate(id)) {
		try {
			connection = await ConnectionDB.getConnection(id);
			// ////console.log(connection);
			//connection = new Connection(connection.conn_id, connection.conn_name, connection.conn_topic, connection.conn_details, connection.conn_location, connection.conn_host, connection.conn_date, connection.conn_timeFrom, connection.conn_timeTo, connection.conn_image);

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
router.get('/myconnections', async function(req, res, next) {
	if (req.session.UserSession) {
		var xyz = await UserProfileDB.getUserProfile(req.session.UserSession._user_id);
		console.log("inside myconn:", xyz);
		let userProfileList = [];
		for(let i=0; i<xyz[0].userConnections.length; i++){
			let conn = await ConnectionDB.getConnection(xyz[0].userConnections[i].conn_id);
			userProfileList.push(new UserConnection(conn, xyz[0].userConnections[i].rsvp));
		}
		//console.log('userProfileList in Saved Connections:',userProfileList);
		let data = {
			"user_Profile": userProfileList,
		};
		res.render('savedConnections', {
			UserSession: req.session.UserSession,
			userConnections: data.user_Profile
		});
	} else {
		res.redirect('/login')
	}
});

//RSVP Connections
router.post('/myconnections',urlencodedParser, async function(req, res, next) {
	console.log("shreeya", req.body);
	var rsvp_id = req.body.id;
	if (req.body.rsvp == "yes" || req.body.rsvp == "no" || req.body.rsvp == "maybe") {
		var rsvp = req.body.rsvp;
	}
	if (req.session.UserSession) {
		try {
			var getConn = await UserProfileDB.getUserProfile(req.session.UserSession._user_id);
			console.log("getConn",getConn);
			if(getConn.length!=0){
				console.log("if");
				let updateCheck = await UserProfileDB.addNewConn(rsvp_id,req.session.UserSession._user_id,rsvp);
				console.log('UpdateCheck:',updateCheck);
				if(updateCheck==undefined){
					await UserProfileDB.updateConn(rsvp_id,req.session.UserSession._user_id,rsvp);
					console.log('updated!!!');
				}
			}
			else {
				console.log("rsvp");
				await UserProfileDB.createNewConn(rsvp_id,req.session.UserSession._user_id,rsvp);

			}
			res.redirect('myconnections');
		} catch (e) {
			err.push(404)
			res.redirect('/connections')
		}
	} else {
		res.redirect('/login');
	}
});

//Delete Connections
router.get('/myconnectionsDelete',async function(req, res, next) {
	var code = req.query.connectionId;
	if (req.session.UserSession) {
		try {
			await UserProfileDB.removeConn(req.session.UserSession._user_id,code);
			res.redirect('myconnections');
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
