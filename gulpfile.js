// gulpfile.js
'use strict';

var gulp = require('gulp'),
    less = require('gulp-less'),
    watch = require('gulp-watch'),
    path = require('path');

gulp.task('less', function () {
  gulp.src('./components/styles.less')
    .pipe(less())
    .pipe(gulp.dest('./stylesheets/'));
});

gulp.task('watch', function () {
  watch('./components/**/*.less', function () {
    gulp.start('less');
  });
});