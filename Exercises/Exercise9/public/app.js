var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var Course;
var { check, validationResult  } = require('express-validator/check')

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
        instructor: String,
        start: String,
        end: String,
        email:String
});

Course = mongoose.model('Course', courseSchema);

var course1 = new Course({_id:'1', code:'1212', title:'Algo & DS', term:'Fall 19', instructor:'Prof Dewan Ahmed',start:'13:10', end:'15:10', email:'dahmed@uncc.edu'});
var course2 = new Course({_id:'2', code:'1212', title:'Algo & DS', term:'Fall 19', instructor:'Prof Ras',start:'11:10', end:'13:00', email:'ras@uncc.edu'});
var course3 = new Course({_id:'3', code:'1234', title:'NBAD', term:'Fall 20', instructor:'Prof Nadia Najjar',start:'13:10', end:'15:30', email:'nanajjar@uncc.edu'});
var course4 = new Course({_id:'4', code:'9876', title:'SSDI', term:'Spring 20', instructor:'Prof Ali Sever',start:'10:00', end:'14:00', email:'asever@uncc.edu'});

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
app.post('/coursedetails',urlencodedParser,[
  check('courseID').isNumeric().withMessage('Course ID must be numbers'),
  check('end').custom((end, {req}) => end > req.body.start).withMessage('End time must be after start time'),
  check('email').isEmail().normalizeEmail()
],function(req,res){
  var errors = validationResult(req);
  if(!errors.isEmpty()){
    console.log('before error', errors.array())
    return res.render('index',{count:req.session.count,errors:errors.array()})
  //return res.status(422).json({ errors: errors.array() });
 }
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

    
    var insertCourse = new Course({_id:newid, courseID:req.body.courseID,title:req.body.title,term:req.body.term,instructor:req.body.instructor , start:req.body.start,end:req.body.end, email:req.body.email});
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