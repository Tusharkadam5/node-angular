var gulp = require('gulp');
 var nodemon = require('gulp-nodemon');
var inject = require('gulp-inject');
 
  
   var paths = {
     angularjs: [
	 'client/app/*.js',
         'client/app/**/*.js'
     ],
     css: [
        'client/css/*.css'
     ],
	 target: [
	 './server/views/index.ejs'
	 ]
 };
 
 
  gulp.task('index', function(){
     return gulp.src(paths.target)
         .pipe(inject(gulp.src(paths.angularjs, {read: false}), {ignorePath: 'client'}))
         .pipe(gulp.dest('./server/views'))
         .pipe(inject( gulp.src(paths.css, {read: false}), {ignorePath: 'client'}))
         .pipe(gulp.dest('./server/views'));
 });
 
 
 
  gulp.task('watch', function() {
     gulp.watch([
     paths.angularjs,
     paths.css
     ], ['index']);
 });
 
 gulp.task('start', function () {
  nodemon({
   script: 'app.js',
   ext: 'js html',
   env: { 'NODE_ENV': 'development' }
  })
})

 gulp.task('default', ['index', 'watch', 'start' ]);
  //gulp.task('default', ['watch', 'build-ts', 'build-copy']);