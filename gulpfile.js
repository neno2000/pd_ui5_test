var gulp = require('gulp'),
    run = require('gulp-run'),
    asar = require('gulp-asar'),
    clean = require('gulp-clean');
    qunit = require('gulp-qunit');
gulp.task('clean', function(){
  return gulp.src('package', {read: false})
    .pipe(clean({force: true}));
});

gulp.task('copy-app',['clean'], function(){
  return gulp.src(['app/**/*', 'frontend/**/*', 'package.json'],{base:'.'})
    .pipe(gulp.dest('package'));
});

gulp.task('package', ['copy-app'], function(){
  return gulp.src('package/**/*')
    .pipe(asar('app.asar'))
    .pipe(gulp.dest('dist'));
});
gulp.task('test', function() {
    return gulp.src('./frontend/test-runner.html')
        .pipe(qunit());
});



gulp.task('run', function(){
  return run('electron .').exec();
});
