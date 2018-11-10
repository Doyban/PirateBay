var gulp = require('gulp');

// Include plugins.
var jshint = require('gulp-jshint');
var imagemin = require('gulp-imagemin');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');

var reload = browserSync.reload;

// Reload browser on changes in development mode.
gulp.task('serve-dev', [], function () {
  browserSync.init({
    server: './app'
  });

  gulp.watch('./app/css/*.css').on('change', reload);
  gulp.watch('./app/js/*.js').on('change', reload);
  gulp.watch('./app/*.html').on('change', reload);
});

// Reload browser on changes in distribution mode.
gulp.task('serve-dist', [], function () {
  browserSync.init({
    server: './dist'
  });
});

// Use JSHint.
gulp.task('jshint', function() {
  gulp.src('./app/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Copy index.html into destination directory.
gulp.task('copy-index-html', function () {
  gulp.src('./app/index.html')
    .pipe(gulp.dest('./dist'));
});

// Copy audio into destination directory.
gulp.task('copy-audio', function () {
  gulp.src('./app/audio/**/*')
    .pipe(gulp.dest('./dist/audio'));
});

// Minify CSS code.
gulp.task('minify-css', function() {
  gulp.src('./app/css/**/*.css')
    .pipe(minifyCSS({keepBreaks: true}))
    .pipe(gulp.dest('./dist/css'))
});

// Uglify JavaScript code.
gulp.task('compress', function() {
  return gulp.src('./app/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'))
});

// Concat JavaScript code.
gulp.task('concat', function () {
  return gulp.src('./dist/js/*.js')
    .pipe(concat('all.min.js', {newLine: ';'}))
    .pipe(gulp.dest('./dist/js'));
});

// Minify images.
gulp.task('compress-images', function() {
  return gulp.src('./app/asset/**/*') // source in pre-images folder, match all images
    .pipe(imagemin({ optimizationLevel: 7 }))
    .pipe(gulp.dest('./dist/asset'));
});

gulp.task('default', ['serve-dev']); // Default task.
gulp.task('dist', ['copy-index-html', 'copy-audio', 'minify-css', 'compress', 'concat', 'compress-images']); // Distribution tasks.