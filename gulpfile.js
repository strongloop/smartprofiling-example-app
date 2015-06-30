var gulp = require('gulp');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var watch = require('gulp-watch');

var boot = require('loopback-boot');
var bf = require('browserify');
var fs = require('fs');

var WEBAPP_SRC = 'client/src/scripts/app.js';
var BROWSERIFY_CONFIG = {
  debug: true
};
var BUNDLE = 'bundle.js';
var DST_PATH = 'client/build/js';
var STATIC_FILES = ['client/src/*.html', 'client/src/templates/*.html'];
var SCRIPT_FILES = ['client/src/scripts/*.js'];

gulp.task('process', function() {
  gulp.src(WEBAPP_SRC)
    .pipe(browserify(BROWSERIFY_CONFIG))
    .pipe(concat(BUNDLE))
    .pipe(gulp.dest(DST_PATH));
});

gulp.task('copy', function() {
  gulp.src(STATIC_FILES)
    .pipe(gulp.dest('client/build'));
});

gulp.task('build', ['process', 'copy']);

gulp.task('watch', function() {
  gulp.watch(SCRIPT_FILES, ['build']);
  gulp.watch(STATIC_FILES, ['copy']);
});
