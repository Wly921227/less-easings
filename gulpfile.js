// gulpfile.js
'use strict';

var gulp = require('gulp'),
    less = require('gulp-less'),
    watch = require('gulp-watch'),
    autoprefixer = require('gulp-autoprefixer'),
    path = require('path'),
    rename = require('gulp-rename'),
    cssnano = require('gulp-cssnano'),
    uglify = require('gulp-uglify');

gulp.task('less-dev', function () {
  gulp.src('./components/styles.less')
    .pipe(less())
    .pipe(autoprefixer({
        browsers: ['last 5 versions'],
        cascade: true
      }))
    .pipe(gulp.dest('./stylesheets/'));
});

gulp.task('less-prod', function () {
  gulp.src('./components/styles.less')
    .pipe(less())
    .pipe(autoprefixer({
        browsers: ['last 5 versions'],
        cascade: true
      }))
    .pipe(cssnano())
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./stylesheets/'));
});

gulp.task('compress', function() {
  return gulp.src(['./javascripts/*.js', '!./javascripts/*.min.js'])
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('./javascripts/'));
});

gulp.task('dev', ['less-dev', 'compress']);

gulp.task('prod', ['less-prod', 'compress']);


gulp.task('watch', function () {
  gulp.watch('./components/**/*.less', ['less-dev']);
  gulp.watch('./javascripts/*.js', ['compress']);
});