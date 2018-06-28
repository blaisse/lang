const gulp = require('gulp');
const watch = require('gulp-watch');
var browserSync = require('browser-sync').create();

gulp.task('watch', () => {
    gulp.watch('./style/**/*.css', () => {
        gulp.start('cssRebuild');
    });
});

gulp.task('cssRebuild', ['styles'], () => {
    return gulp.src('./public/style.css');
});