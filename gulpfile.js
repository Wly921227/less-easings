// gulpfile.js
'use strict';

var gulp = require('gulp'),
    less = require('gulp-less'),
    watch = require('gulp-watch'),
    autoprefixer = require('gulp-autoprefixer'),
    path = require('path');

gulp.task('less', function () {
  gulp.src('./components/styles.less')
    .pipe(less())
    .pipe(autoprefixer({
      browsers: ['last 5 versions'],
      cascade: true
    }))
    .pipe(gulp.dest('./stylesheets/'));
});

gulp.task('watch', function () {
  watch('./components/**/*.less', function () {
    gulp.start('less');
  });
});