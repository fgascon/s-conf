s-conf
======

Service configuration based on JSON file. The config file path is given as the first command line argument (argv[2]).

## Usage

Call your node service like this:
```$ node index.js config.json```

```js
var config = require('s-conf');
var http = require('http');

http.createServer(function(req, res){
  res.end("Hello!");
}).listen(config.require('http_port'), config.get('http_ip', '0.0.0.0'));
```

*http_port* is mandatory and *http_ip* is optional and default to '0.0.0.0'.

## API

### config.require(name)
To get a mandatory config parameter.

### config.get(name, [defaultValue])
To get an optional config parameter. It will default to ```defaultValue``` if ```name``` is not present in the config file.

