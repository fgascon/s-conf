var config = require('..');
var http = require('http');

var server = http.createServer(function(req, res){
    res.end("Hello!");
});

server.listen(config.require('http_port'), config.get('http_ip', '0.0.0.0'), function(){
    var address = server.address();
    console.log("HTTP server listening on %s:%d", address.address, address.port);
});

