'use strict';

var gulp = require('gulp');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var connect = require('gulp-connect-php');
//var open = require('gulp-open');
var urlUtil = require('url');

var URL = 'http://localhost:8080';
var parsedUrl = urlUtil.parse(URL);
var hostname = parsedUrl.hostname;
var host = parsedUrl.host;
var port = parsedUrl.port || 80;

var paths = {
  scripts: 'js/**/*.coffee',
  images: 'images/**/*',
  styles: 'sass/**/*',
  php: './**/*.php'
};

gulp.task('scripts', function() {
  // Minify and copy all JavaScript (except vendor scripts)
  // with sourcemaps all the way down
  return gulp.src(paths.scripts)
    .pipe(sourcemaps.init())
      .pipe(coffee())
      .pipe(uglify())
      .pipe(concat('main.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('js'));

});


gulp.task('styles', function () {
  gulp.src(paths.styles)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./'))
});




gulp.task('watch', function() {
  gulp.watch(paths.styles, ['styles']);
  
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['scripts', 'styles', 'watch']);
