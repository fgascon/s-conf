var fs = require('fs');
var path = require('path');
var Options = require('wrap-options');

function die(message) {
    console.error('[CONFIG]', message);
    process.exit(1);
}

if (!process.argv[2]) {
    die('Config path missing');
}

var configPath = path.resolve(process.argv[2]);

function parse(configText) {
    return new Options(JSON.parse(configText));
}

function loadSync() {
    var configText = fs.readFileSync(configPath, { encoding: 'utf8' });
    return parse(configText);
}

function load(callback) {
    fs.readFile(configPath, { encoding: 'utf8' }, function (err, configText) {
        var config;
        try {
            config = parse(configText);
        } catch (err) {
            return callback(new Error('Invalid config file: ' + err.message));
        }

        callback(null, config);
    });
}

var reloadListeners = [];

function watch(onReload) {
    reloadListeners.push(onReload);
}

function reload(callback) {
    load(function (error, config) {
        callback = callback || function () {};
        if (error) {
            callback(error);
        } else {
            exports.__proto__ = config;
            reloadListeners.forEach(function (listener) {
                listener(exports);
            });
            callback();
        }
    });
}

function Config() {
    this.watch = watch;
    this.reload = reload;
}

exports = module.exports = new Config();

try {
    exports.__proto__ = loadSync();
} catch (err) {
    die('Invalid config file: ' + err.message);
}
