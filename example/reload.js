var config = require('..');
var http = require('http');

process.on('SIGUSR2', function () {
    config.reload();
});

function serverHandler(req, res) {
    res.end('Hello!');
}

var server;

function initializeServer() {
    const httpConfig = config.requireOptions('http');
    const PORT = httpConfig.require('port');
    const IP = httpConfig.get('ip', '0.0.0.0');

    if (server) {
        console.log('Close the server');
        server.close();
    }

    server = http.createServer(serverHandler);
    server.listen(PORT, IP, function () {
        const address = server.address();
        console.log('HTTP server listening on %s:%d', address.address, address.port);
    });
}

initializeServer();

config.watch(initializeServer);
