var express = require('express')
var router = express.Router()

router.get('/', function (req, res) {
    var v=0;
    if (req.session && req.session.count){
        v=req.session.count;
    }
    
    res.render('index',{count:v});
})

module.exports = router;