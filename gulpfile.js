var gulp = require('gulp'),
    watch = require('gulp-watch'),
    less = require('gulp-less'),
    path = require('path');

gulp.task('styles:build', function () {
  return gulp.src('./less/**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./css'));
});

gulp.task('watch', function() {
    watch('./less/**/*.less', function() {
        gulp.start('styles:build');
    })
});

gulp.task('default', ['styles:build', 'watch']);
