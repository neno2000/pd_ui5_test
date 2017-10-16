var gulp = require('gulp');
var replace = require('gulp-replace');
 gulp.task('default', function(){
   gulp.src(['frontend/view/App.view.js'])
     .pipe(replace('ui5bp', 'PeopleData'))
     .pipe(gulp.dest('frontend/view/App.view.js'));
});
