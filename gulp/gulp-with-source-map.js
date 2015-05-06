var gulp    = require('gulp');
var uglify  = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('default', function () {
    gulp.src('./*.js')
        .pipe(sourcemaps.init())
        .pipe(uglify({
            compress: {
                negate_iife: false
            }
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./out'));
});
