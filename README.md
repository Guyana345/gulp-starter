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

1. Download the branch
Commands to run
npm install
gulp or gulp watch
- this will generate the dist folder that is required and used in the index .html
nodemon/ node server.js - to start the server
or gulp
open your browser and go to 
localhost:3000


TODO/Done:
 CSS
- SCSS option
for SCSS check the SCSS branch
- LESS option
for LESS check the LESS branch

Javascript
-  ES6/ES215 compiling with babel
- upgrade the default tasks
- code structure


Functionality Added:
- error handling with plumber
- concatenate 
- minify/uglify CSS and JavaSript
- complie es6 with gulp-babel convert es6 to es2015
- source maps for CSS and JavaScript for debuging (view console to see where the code come from)
- Scss / Less option : view the respective branch
- Image compression lossless/lossy

optional
- Working with Handlebars and templates
- for zipping the folder use the gulp task: gulp export

Other:
- Deleting files from dist folder : starting with a clean directory

