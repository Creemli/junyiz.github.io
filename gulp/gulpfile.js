var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var clean = require('gulp-clean');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var tfs = require('gulp-tfs');
var argv = require('yargs').argv;
var config = require('./config.json');

//用命令行里传入参数覆盖config.json配置的路径
argv.root && (config.root = argv.root);
argv.branch && (config.branch = argv.branch);
argv.site && (config.site = argv.site);
argv.path && (config.path = argv.path);

var fullpath = path.join(config.root, config.branch, config.site, config.path);
//支持在命令行里传入文件系统的绝对路径
argv.fullpath && (fullpath = argv.fullpath);

/**
 * 支持在命令行里传入TFS路径
 * - 去掉开头的 $/ResStatic
 * - 去掉结尾的 / 或 /js 或 /js/
 * - 把 / 转义为 \\
 */
argv.tfspath && (fullpath = path.join(config.root, argv.tfspath.replace(/\$\/ResStatic/i, '').replace(/(\/js)?(\/)?$/gi, '').replace(/\//g, '\\\\')));


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

//查看配置的路径
gulp.task('viewdir', function() {
    console.log('src: ' + src);
    console.log('dest: ' + dest);
});

//是否第一次压缩
var isFirstCompress = false;

gulp.task('checkin', function() {
    gulp.src(dest).pipe(tfs.checkin());
});

gulp.task('undo', function() {
    gulp.src(dest).pipe(tfs.undo());
});

gulp.task('add', function() {
    gulp.src(dest).pipe(tfs.add());
});

//获取最新的JS文件
gulp.task('get', function() {
    return gulp.src(fullpath).pipe(tfs.get());
});

//检查js.min目录是否存在
gulp.task('checkdir', ['get'], function() {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest);
    }
    var dir = fs.readdirSync(dest);
    if (!dir.length) {
        isFirstCompress = true;
    }
});

//签出js.min和js.merge目录
gulp.task('checkout', ['checkdir'], function() {
    if (!isFirstCompress) {
        var dir = [dest];
        if (isMerge) {
            dir.push(path.join(fullpath, '/js.merge'));
        }
        gulp.src(dir).pipe(tfs.checkout());
    }
});

//先清理js.min和js.merge目录
gulp.task('clean', ['checkout'], function() {
    var dir = [dest + '/*'];
    if (isMerge) {
        dir.push(path.join(fullpath, '/js.merge'));
    }
    var stream = gulp.src(dir)
        .pipe(clean({force: true}));
    return stream;
});

//语法检查、生成报告、压缩
gulp.task('compress', ['clean'], function() {
    var stream = gulp.src(src)
        .pipe(jshint())
        .pipe(jshint.reporter('gulp-jshint-file-reporter', {
            filename: __dirname + '/jshint_reporter.log'
        }))
        .pipe(uglify())
        .pipe(gulp.dest(dest));
    return stream;
});

//语法检查、生成报告、压缩、合并压缩的文件
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

var checkinDeps = concatTasks[0] ? [concatTasks[0]] : ['compress'];
gulp.task('checkin', checkinDeps, function () {
    var comment = 'Compress Javascript +review static-js';
    var dir = [dest];
    if (isMerge) {
        dir.push(path.join(fullpath, '/js.merge'));
    }
    if (isFirstCompress) {
        gulp.src(dir).pipe(tfs.add()).pipe(tfs.checkin(comment));
    } else {
        gulp.src(dir).pipe(tfs.checkin(comment));
    }
});

gulp.task('default', ['checkin'], function () {
    //TODO
});
