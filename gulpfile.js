var gulp = require('gulp');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var autoPrefixer = require('gulp-autoprefixer');

//File paths
var DIST_PATH = 'public/dist';
var SCRIPTS_PATH = 'public/scripts/**/*.js';
var HTML_PATH = 'public/**/*.html';
var CSS_PATH = 'public/css/*.css';

//styles
gulp.task('styles', function () {
    console.log('starting styles task');
    
    return gulp.src(['public/css/reset.css', CSS_PATH])
        .pipe(autoPrefixer({
            browsers: ['last 2 versions']
        }))
		.pipe(concat('styles.css'))
		.pipe(minifyCss())
		.pipe(gulp.dest(DIST_PATH))
		.pipe(livereload());
});

//scripts
gulp.task('scripts', function(){
    console.log('starting scripts task');

    return gulp.src(SCRIPTS_PATH)
        .pipe(uglify())
        .pipe(gulp.dest(DIST_PATH))
        .pipe(livereload());
});

//images
gulp.task('images', function(){
    console.log('starting image task');
});

//html 
gulp.task('html', function(){
    return gulp.src(HTML_PATH)
        .pipe(livereload());
});

gulp.task('default', function() {
    console.log('starting default tasks');
});

gulp.task('watch', function () {
	console.log('Starting watch task');
	require('./server.js');
    livereload.listen();
    
    //watch
	gulp.watch(SCRIPTS_PATH, ['scripts']);
    gulp.watch(CSS_PATH, ['styles']);
    
});