var StaticServer = require('static-server');

var server = new StaticServer({
    rootPath: './public/',
    port: 3000
});

server.start(function(err){
    if(err) {
        console.log('server could not start')
        console.log(err);
    }else {
        console.log('server is up and running on port ' + server.port);
    }
});

