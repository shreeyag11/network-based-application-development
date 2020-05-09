var fs = require('fs');
var http = require('http');
var server = http.createServer(function(req, res){
    console.log(`Request was made ${req.url}`);
    res.writeHead(200, {'Content-Type':'text/plain'});
    fs.readFile('./public/views/viewTextInBrowser.txt','utf8',function(err,data){
        res.end(data);
    });
});

server.listen(8080, '127.0.0.1');
console.log('Listening to port 8080');

