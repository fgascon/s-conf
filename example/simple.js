var config = require('..');
var http = require('http');

var server = http.createServer(function (req, res) {
    res.end('Hello!');
});

const httpConfig = config.requireOptions('http');
const PORT = httpConfig.require('port');
const IP = httpConfig.get('ip', '0.0.0.0');

server.listen(PORT, IP, function () {
    const address = server.address();
    console.log('HTTP server listening on %s:%d', address.address, address.port);
});
