var express = require('express');
var app = express();


app.set('view engine','ejs');
app.use('/assets',express.static('assets'));

var homeRoute = require('./routes/index')
var courseDetailsRoute = require('./routes/courseDetails')
app.use('/courseDetails', courseDetailsRoute)
app.use('/', homeRoute)
app.use('/*',homeRoute)



app.listen(8084);