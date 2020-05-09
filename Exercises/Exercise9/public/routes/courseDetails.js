var express = require('express');
var router = express.Router();
var session = require('express-session');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var coursedetails = require('../models/course');

router.get('/', function(req, res){
  if (req.session.theCourse == null) {
    res.redirect('/');
  } else {
        var course = req.session.theCourse;
        res.render('details', {course: course});
  }
});

router.use((req, res, next) => {
    var count;
      if (req.session && req.session.count){
        req.session.count=req.session.count+1;
      }else{
        req.session.count=1;
      }
    count=req.session.count;
    //console.log(req.session);
    console.log("The number of post request is: "+ count); 
  next()
})

router.post('/', urlencodedParser, function(req, res){
  var course = coursedetails.course(req.body.courseID, req.body.title, req.body.term, req.body.instructor, req.body.start, req.body.end,req.body.email);
  req.session.theCourse = course;
  res.render('details', {course: course});
});

  module.exports = router;
