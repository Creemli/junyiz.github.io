var fs      = require('fs');
var path    = require('path');
var gulp    = require('gulp');
var jshint  = require('gulp-jshint');
var uglify  = require('gulp-uglify');
var concat  = require('gulp-concat');
var argv    = require('yargs').argv;

if (!argv.fullpath) {
    console.log('请传入Javascript文件的绝对路径，示例：gulp --fullpath /e/ctripcode/Pres.Static/Pres.Static/ResHotelOnline/search');
    return;
}

var fullpath = argv.fullpath;
var src = path.join(fullpath, 'js/**/*.js');
var dest = path.join(fullpath, 'js.min/');
var concatConfig = path.join(fullpath, 'js/concat.json');
var isMerge = fs.existsSync(concatConfig); //存在concat.json，则合并js文件
var concatDest = path.join(fullpath, 'js.merge/');

function joinPath(paths) {
    var arr = [];
    for (var i in paths) {
        arr.push(path.join(fullpath, 'js.min', paths[i]));
    }
    return arr;
}

//语法检查、生成报告、压缩
gulp.task('compress', function() {
    var stream = gulp.src(src)
        .pipe(jshint())
        .pipe(jshint.reporter('gulp-jshint-file-reporter', {
            filename: __dirname + '/jshint_reporter.log'
        }))
        .pipe(uglify())
        .pipe(gulp.dest(dest));
    return stream;
});

//合并压缩的文件
var concatTasks = [];
if (isMerge) {
    var json = require(concatConfig);
    for (var key in json) {
        var task =  key + '.js';
        concatTasks.push(task);
    }
    for (var i = 0, n = concatTasks.length - 1; i <= n; i++) {
        var deps = i < n ? [concatTasks[i+1]] : ['compress'];
        (function(task, deps) {
            gulp.task(task, deps, function() {
                var scripts = joinPath(json[task.split('.')[0]]);
                return gulp.src(scripts)
                    .pipe(concat(task))
                    .pipe(gulp.dest(concatDest));
            });
        })(concatTasks[i], deps);
    }
}

var defaultDeps = concatTasks[0] ? [concatTasks[0]] : ['compress'];
gulp.task('default', defaultDeps, function () {
    //Finished
});
