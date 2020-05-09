var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.set('view engine','ejs');
app.use(session({secret: 'secret'}));
app.use('/assets',express.static('assets'));

var homeRoute = require('./routes/index')
var courseDetailsRoute = require('./routes/courseDetails')
app.use('/courseDetails', courseDetailsRoute)
app.use('/', homeRoute)
app.use('/*',homeRoute)

app.listen(8084);