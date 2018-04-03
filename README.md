# gulp-starter
working with gulp for javascript applications yarn add or npm install to install all the dependences you'll need

Gulp starter file:
npm modules: (As of initial commit)
  "devDependencies": {
    "gulp": "^3.9.1",
    "gulp-autoprefixer": "^5.0.0",
    "gulp-concat": "^2.6.1",
    "gulp-livereload": "^3.8.1",
    "gulp-minify-css": "^1.2.4",
    "gulp-uglify": "^3.0.0"
  },
  "dependencies": {
    "static-server": "^2.2.0"
  }
  
Using static server dependency:
A simple web server created
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

TODO:
-- Handle Erros
-- CSS
--- SCSS option
--- LESS option
-- Javascript
--- ES6/ES215 compiling with babel
--* upagrade the default tasks
-code structure
-adding source maps

Other:
--
