var express = require('express');
var app = express();
var connectionController = require('./routes/connectionController.js');

app.use('/assets',express.static('assets'));
app.set('view engine','ejs');
app.use('/',connectionController);

app.listen(8084);
