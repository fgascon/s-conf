var fs = require('fs');
var path = require('path');

function die(message){
    console.error('[CONFIG]', message);
    process.exit(1);
}

if(!process.argv[2]){
    die("Config path missing");
}

var configPath = path.resolve(process.argv[2]);

function parse(configText){
    return JSON.parse(configText);
}

function loadSync(){
        var configText = fs.readFileSync(configPath, {encoding: 'utf8'});
        return parse(configText);
}

function load(callback){
    fs.readFile(configPath, {encoding: 'utf8'}, function(err, configText){
        var config;
        try{
            config = parse(configText);
        }catch(err){
            return callback(new Error("Invalid config file: "+err.message));
        }
        callback(null, config);
    });
}

try{
    var config = loadSync();
}catch(err){
    die("Invalid config file: "+err.message);
}

exports.require = function(name){
    if(typeof config[name] === 'undefined'){
        die(name+" is required");
    }
    return config[name];
}

exports.get = function(name, defaultValue){
    if(typeof config[name] === 'undefined'){
        return defaultValue;
    }
    return config[name];
};

