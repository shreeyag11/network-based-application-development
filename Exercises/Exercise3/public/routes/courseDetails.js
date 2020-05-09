var express = require('express');

var router = express.Router();


router.get('/',function(req,res){
  var courseDetail = require('./../models/Course');
  courseDetails = courseDetail.course(req.query.courseID, req.query.title, req.query.term, req.query.instructor)
  res.render('details', {course: courseDetails})
});

  module.exports = router;
