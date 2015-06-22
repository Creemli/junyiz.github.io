AV.initialize("usm700ovr6cijde4tcxou8on5gi85wcqe9urqdqqjm182qte", "roy4td6wzv8i77i9hsel2cmgrd09levokesv84vayqs6eip0");
var TagsObject = AV.Object.extend('tags');
var tagsQuery = new AV.Query(TagsObject);
var DiggsObject = AV.Object.extend('diggs');
var diggsQuery = new AV.Query(DiggsObject);
var AppState = AV.Object.extend("AppState", {
    defaults: { tag: "" }
});
var AppView = AV.View.extend({
    el: '.container',
    events: {
        'click .tags a': 'selectedTag'
    },
    initialize: function () {
        this.getTags();
    },
    tagsTpl: AV._.template($('#tags-tpl').text()),
    diggsTpl: AV._.template($('#diggs-tpl').text()),
    getTags: function () {
        tagsQuery.find({
            success: this.renderTags.bind(this),
            error: function(error) {}
        });
    },
    renderTags: function (results) {
        this.$('.tags .list').html(this.tagsTpl({results: results}));
    },
    getDiggs: function (tag) {
        (tag != '' ? diggsQuery.contains('tag', tag) : diggsQuery).find({
            success: this.renderDiggs.bind(this),
            error: function(error) {}
        });
    },
    renderDiggs: function (results) {
        this.$('.diggs .list').html(this.diggsTpl({results: results}));
    },
    selectedTag: function (e) {
        var cls = 'selected';
        $(e.target).addClass(cls).siblings('.' + cls).removeClass(cls);
        this.$('.diggs .list').html('<p class="loading">Loading...</p>');
    }
});
var AppRouter = AV.Router.extend({
    routes: {
        "": "all",
        ":tag": "tag"
    },
    initialize: function() {
        this.view = new AppView;
        this.state = new AppState;
        this.state.on('change', function() {
            var tag = this.state.get('tag');
            this.view.getDiggs(tag);
        }, this);
    },
    all: function() {
        this.state.set({ tag: "" });
    },
    tag: function(tag) {
        this.state.set({ tag: tag });
    }
});
new AppRouter;
AV.history.start();
