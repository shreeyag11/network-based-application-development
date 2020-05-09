var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var Course;

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.set('view engine','ejs');
app.use(session({secret: 'secret'}));
app.use('/assets',express.static('assets'));

var homeRoute = require('./routes/index')
var courseDetailsRoute = require('./routes/courseDetails')


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    var courseSchema = new mongoose.Schema({
        _id: String,
        code: String,
        title: String,
        term: String,
        instructor: String
});

Course = mongoose.model('Course', courseSchema);

var course1 = new Course({_id:'1', code:'1212', title:'Algo & DS', term:'Fall 19', instructor:'Prof Dewan Ahmed'});
var course2 = new Course({_id:'2', code:'1212', title:'Algo & DS', term:'Fall 19', instructor:'Prof Ras'});
var course3 = new Course({_id:'3', code:'1234', title:'NBAD', term:'Fall 20', instructor:'Prof Nadia Najjar'});
var course4 = new Course({_id:'4', code:'9876', title:'SSDI', term:'Spring 20', instructor:'Prof Ali Sever'});

    course1.save(function (err, course) {
    if (err) {};
    });
    
    course2.save(function (err, course) {
    if (err) {};
    });
    
    course3.save(function (err, course) {
    if (err) {};
    });
    
    course4.save(function (err, course) {
    if (err) {};
    });
});

//count the number of post requests
app.post('/coursedetails',function(req,res,next){
    if(req.session.count)
    {
      req.session.count=req.session.count+1;
    }else{
      req.session.count=1;
    }
    next(); 
});

//add a new id everytime a new document is inserted
app.post('/coursedetails',urlencodedParser,function(req,res){
    var lastid= Course.find().sort({"_id" : -1}).limit(1);
    var newid;
    Course.find({code:req.body.courseID},function (err, courses) {
       // console.log(courses);
    if (err) return console.log(err);
       if(courses){
         newid=courses._id;
       }else{
         newid=lastid+1;
       }
    })

    
    var insertCourse = new Course({_id:newid, courseID:req.body.courseID,title:req.body.title,term:req.body.term,instructor:req.body.instructor });
    Course.findOneAndUpdate(
        {code:req.body.courseID, instructor:req.body.instructor,term:req.body.term}, 
        insertCourse,       
        {upsert: true, new: true, runValidators: true},
        function (err, doc) { 
            console.log(req.body.courseID);
            if (err) {
                console.log(err);
            } else {
                // console.log('Doc saved');
                Course.find(function (err, courses) {
                if (err) return console.log(err);
                res.render('courses',{course:courses});
              });
            }
        });
  });

  //find the course details with respect to course code
  app.post('/course',urlencodedParser,function(req,res,next){
    var search = req.body.searchbox;
    Course.find({code:search},function (err, courses) {
    if (err) return console.log(err);
    res.render('courses',{course:courses});
    })
  });
  
  app.get('/courses',function(req,res){
        Course.find(function (err, courses) {
        if (err) return console.log(err);
        res.render('courses',{course:courses});
      })
  });
  app.use('/courseDetails', courseDetailsRoute)

app.use('/', homeRoute)
app.use('/*',homeRoute)

app.listen(8084);