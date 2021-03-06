var gulp = require('gulp');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var autoPrefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var del = require('del');
var zip = require('gulp-zip');



//Handlebars plugins
var handlebars = require('gulp-handlebars');
var handlebarsLib = require('handlebars');
var declare = require('gulp-declare');
var wrap = require('gulp-wrap');

//image compression
var imagemin = require('imagemin');
var imageminPngquant = require('imagemin-pngquant');
var imagemin = require('gulp-imagemin');
var imageminJpegRecompress = require('imagemin-jpeg-recompress');

//File paths
var DIST_PATH = 'public/dist';
var SCRIPTS_PATH = 'public/scripts/**/*.js';
var HTML_PATH = 'public/**/*.html';
var CSS_PATH = 'public/css/*.css';
var TEMPLATES_PATH = 'templates/**/*.hbs';
var IMAGES_PATH  = 'public/images/**/*.{png,jpeg,jpg,svg,gif}';


//clean
gulp.task('clean', function(){
    return del.sync([
        DIST_PATH
    ])
});


//styles
gulp.task('styles', function () {
    console.log('starting styles task');
    
    return gulp.src(['public/css/reset.css', CSS_PATH])
        .pipe(plumber( function(err) {
            console.log('Styles task Error');
            console.log(err);
            this.emit('end');
        }))
        .pipe(sourcemaps.init())
        .pipe(autoPrefixer())
		.pipe(concat('styles.css'))
        .pipe(minifyCss())
        .pipe(sourcemaps.write())
		.pipe(gulp.dest(DIST_PATH))
		.pipe(livereload());
});

//scripts + working with babel
gulp.task('scripts', function(){
    console.log('starting scripts task');

    return gulp.src(SCRIPTS_PATH)
        .pipe(plumber(function(err){
            console.log('Scripts task Error');
            console.log(err);
            this.emit('end');
        }))
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(concat('scripts.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(DIST_PATH))
        .pipe(livereload());
});

//images
gulp.task('images', function(){
    return gulp.src(IMAGES_PATH)
    .pipe(imagemin(
        [
            imagemin.gifsicle(),
            imagemin.jpegtran(),
            imagemin.optipng(),
            imagemin.svgo(),
            imageminPngquant(),
            imageminJpegRecompress()
        ]
    ))
    .pipe(gulp.dest(DIST_PATH + '/images'))
});

//templates
gulp.task('templates', function(){
    return gulp.src(TEMPLATES_PATH)
    .pipe(handlebars({
        handlebars: handlebarsLib
    }))
    .pipe(wrap('Handlebars.template(<%= contents %> )'))
    .pipe(declare({
        namespace: 'templates',
        noRedeclare: true
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest(DIST_PATH))
    .pipe(livereload())
});

//html 
gulp.task('html', function(){
    return gulp.src(HTML_PATH)
        .pipe(livereload());
});


//default
gulp.task('default',['clean', 'images', 'templates', 'styles', 'scripts'] , function() {
    console.log('starting default tasks');
});


//zip
gulp.task('export', function(){
    return gulp.src('public/**/*')
    .pipe(zip('website.zip'))
    .pipe(gulp.dest('./'))
});

//watch
gulp.task('watch', ['default'], function () {
	console.log('Starting watch task');
	require('./server.js');
    livereload.listen();
    
    //watch
	gulp.watch(SCRIPTS_PATH, ['scripts']);
    gulp.watch(CSS_PATH, ['styles']);
    gulp.watch(TEMPLATES_PATH, ['templates']);
    
});