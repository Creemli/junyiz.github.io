var fs = require('fs');
var app = require('koa')();
var cwd = process.cwd();
var exec = require('child_process').exec;

function shell(commend) {
    return function(callback) {
        exec(commend, callback);
    };
}

app.use(function *(){
    var self = this;
    var data = "";
    var path = (this.request.path || '').toLowerCase();
    if (this.request.url == '/favicon.ico') return;

    if (path == '/compress'.toLowerCase()) {
        var tfsPath = this.request.query.tfspath;
        if (fs.existsSync(tfsPath)) {
            var commend = 'gulp --fullpath ' + tfsPath;
            var ret = yield shell(commend); //开始压缩
            data = ret[0].replace(/\n/g, '<br>');
        } else {
            data = '你输入的TFS PATH不正确，或者junyizhang还没有拉取该TFS PATH，请Lync或邮件告知junyizhang，谢谢!';
        }
    } else if (path == '/README.md'.toLowerCase()) {
        data = fs.readFileSync(cwd + '/README.md', 'utf8');
    } else {
        data = fs.readFileSync(cwd + '/index.html', 'utf8');
    }

    this.body = data; //响应结果
});

app.listen(2048);
