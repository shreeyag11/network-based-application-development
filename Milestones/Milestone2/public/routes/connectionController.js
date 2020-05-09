var express = require('express');
var conn_utility = require('../utility/connectionDB.js');
var router = express.Router();

router.get('/connections',function(req,res){
  conn_utility.getConnections(conn=>{
    var topics= new Set();

    conn.forEach(element => {
        topics.add(element.conn_topic);  
    });
    res.render('connections',{connection:conn,topic:topics});
  });
});


router.get('/connection', function(req,res){
  conn_utility.getConnection(req.query.conn_id, ele=>{
    if(ele == null){
      res.redirect('/connections');
      return;
    }
    else{
      res.render('connection',{connection:ele});
      return;
    }
  });
});

router.get('/', function(req,res){
  res.render('index');
});
router.get('/index', function(req,res){
  res.render('index');
});


router.get('/savedConnections', function(req,res){
    res.render('savedConnections');
});

router.get('/newConnection', function(req,res){
    res.render('newConnection');
});

router.get('/contact', function(req,res){
     res.render('contact');
});

router.get('/about', function(req,res){
    res.render('about');
});
router.get('/*', function(req,res){
  res.send('Error 404: Page not found.');
});

module.exports=router;