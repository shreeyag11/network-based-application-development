var fs = require('fs');
var http = require('http');

var server = http.createServer(function(req, res){
    console.log(`Request was made ${req.url}`);
    if(req.url === '/contact'){
        res.writeHead(200, {'Content-Type':'text/html'});
        fs.createReadStream('../views/contact.html').pipe(res);
    }else if(req.url === '/about'){
        res.writeHead(200, {'Content-Type':'text/html'});
        fs.createReadStream('../views/about.html').pipe(res);
    }
    });

server.listen(8080, '127.0.0.1');
console.log('Listening to port 8080');

