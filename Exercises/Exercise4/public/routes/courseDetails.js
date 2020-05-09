var express = require('express');

var router = express.Router();
var session = require('express-session');
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false });
var coursedetails = require('../models/course');

router.get('/', function(req, res){
  if (req.session.theCourse == null) {
    res.render('index');
  } else {
        var course = req.session.theCourse;
        res.render('details', {course: course});
  }
});

router.post('/', urlencodedParser, function(req, res){
  console.log(req.body);
  var course = coursedetails.course(req.body.courseID, req.body.title, req.body.term, req.body.instructor);
  req.session.theCourse = course;
  res.render('details', {course: course});
});

  module.exports = router;
