let 
    gulp = require('gulp'),
    connect = require('gulp-connect');

gulp.task('server', function() {
    connect.server({
        root: 'app', 
        livereload: true,
        port: 3100
    });
});

gulp.task('default', gulp.series('server'));