var fs = require('fs');
var cheerio = require('cheerio');
var fetchUrl = require('fetch').fetchUrl;
var tags = [];
var diggs = [];
var i = 0;

fetchUrl('http://div.io/digg', function (error, meta, body) {
    var $ = cheerio.load(body.toString());
    var $tags = $('div.tags');

    $($tags[0]).find('a').each(function(i, elem) {
        var $el = $(this);
        var url = $el.attr('href');
        tags.push({
            txt: $el.text(),
            url: url,
            tag: decodeURI(url.replace('http://div.io/digg/', ''))
        });
    });

    tags.forEach(function (tag) {
        getdigg(tag.url, tag.tag);
    });

    function getdigg(url, tag) {
        fetchUrl(url, function (error, meta, body) {
            var $ = cheerio.load(body.toString());

            $('.digg-list>ul>li').each(function (i, elem) {
                var $el = $(this);
                var $info = $el.find('.info a');
                diggs.push({
                    "tag": tag,
                    "url": $info.attr('href'),
                    "info": $info.text(),
                    "thumb": $el.find('.thumb img').attr('src'),
                    "intro": $el.find('.intro span').text()
                });
            });

            if (++i == tags.length) {
                console.log(JSON.stringify(diggs))
            }
        });
    }
});
