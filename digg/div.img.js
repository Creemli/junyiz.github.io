var fs = require('fs');
var url = require('url');
var path = require('path');
var request = require('request');
var AV = require('avoscloud-sdk').AV;
var diggs = require('./diggs.json');
var thumbs = [];

AV.initialize("usm700ovr6cijde4tcxou8on5gi85wcqe9urqdqqjm182qte", "roy4td6wzv8i77i9hsel2cmgrd09levokesv84vayqs6eip0");

diggs.forEach(function (item) {
    if (thumbs.indexOf(item.thumb) === -1) {
        thumbs.push(item.thumb);
    }
});

/**
 * download img for div.io
 *
thumbs.forEach(function (thumb) {
    request(thumb).pipe(fs.createWriteStream('./data/' + basename(thumb)));
});
 */

/**
 * upload img to leancloud.cn
 */
thumbs.forEach(function (thumb) {
    var name = basename(thumb);
    var file = new AV.File(name, fs.readFileSync('./data/' + name));
    file.save();
});


function basename(u) {
    var urlObj = url.parse(u);
    return path.basename(urlObj.pathname);
}


//http://ac-usm700ov.clouddn.com/ed8f2d7a8f2eb8fb.png