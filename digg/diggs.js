AV.initialize("usm700ovr6cijde4tcxou8on5gi85wcqe9urqdqqjm182qte", "roy4td6wzv8i77i9hsel2cmgrd09levokesv84vayqs6eip0");
var TagsObject = AV.Object.extend('tags');
var tagsQuery = new AV.Query(TagsObject);
var DiggsObject = AV.Object.extend('diggs');
var diggsQuery = new AV.Query(DiggsObject);
var tagsList = document.querySelector('.tags-list');
var diggsList = document.querySelector('.diggs-list');

tagsQuery.find({
    success: function(results) {
        var h = '';
        results.forEach(function(r) {
            h += '<a href="' + r.attributes.url + '" data-tag="' + r.attributes.tag + '">' + r.attributes.txt + '</a>'
        });
        tagsList.innerHTML = h;
    },
    error: function(error) {}
});

tagsList.addEventListener('click', function(e) {
    e.preventDefault();
    var t = e.target;
    var tag = t.getAttribute('data-tag');

    diggsQuery.contains('tag', tag).find({
        success: function(results) {
            var h = '';
            results.forEach(function(r) {
                h += '<li><p>' + r.attributes.info + '</p><p><img src="' + r.attributes.thumb + '"/><p class="intro">' + r.attributes.intro + '</p></li>'
            });
            diggsList.innerHTML = h;
        },
        error: function(error) {}
    });
});

diggsQuery.find({
    success: function(results) {
        var h = '';
        results.forEach(function(r) {
            h += '<li><p>' + r.attributes.info + '</p><p><img src="' + r.attributes.thumb + '"/><p class="intro">' + r.attributes.intro + '</p></li>'
        });
        diggsList.innerHTML = h;
    },
    error: function(error) {}
});
