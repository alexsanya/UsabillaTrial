var gulp = require('gulp'),
    watch = require('gulp-watch'),
    less = require('gulp-less'),
    concat = require('gulp-concat'),
    path = require('path'),
    addStream = require('add-stream'),
    webserver = require('gulp-webserver'),
    angularTemplateCache = require('gulp-angular-templatecache');

function prepareTemplates() {
    return gulp.src('app/directives/**/*.html')
        .pipe(angularTemplateCache());
}

gulp.task('styles:compile', function () {
  return gulp.src('./less/**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./css'));
});

gulp.task('scripts:build', function() {
    return gulp.src([
        'bower_components/angular/angular.js',
        'bower_components/angular-resource/angular-resource.js',
        'bower_components/Chart.js/Chart.js',
        './app/**/*.js'])
        .pipe(addStream.obj(prepareTemplates()))
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./'));
});

gulp.task('styles:watch', function() {
    watch('./less/**/*.less', function() {
        gulp.start('styles:compile');
    })
});

gulp.task('scripts:watch', function() {
    watch('./app/**/*.js', function() {
        gulp.start('scripts:build');
    })
});

gulp.task('templates:watch', function() {
    watch('app/directives/**/*.html', function() {
        gulp.start('scripts:build');
    })
});

gulp.task('webserver', function() {
    gulp.src('./')
        .pipe(webserver({
	        host: '0.0.0.0',
            livereload: true
        }));
});

gulp.task('watch', ['styles:watch', 'scripts:watch', 'templates:watch']);
gulp.task('default', ['styles:compile', 'scripts:build', 'webserver', 'watch']);
