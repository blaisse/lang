const gulp = require('gulp');
const postCSS = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const nested = require('postcss-nested');
const importCSS = require('postcss-import');
const mixins = require('postcss-mixins');

gulp.task('styles', () => {
    return gulp.src('./style/style.css')
        .pipe(postCSS([ importCSS, mixins, autoprefixer, nested ]))
        .pipe(gulp.dest('./public')); 
});