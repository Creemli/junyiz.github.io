var Tab = {
    View: {},
    Model: {},
    Router: {},
    Collection: {},
    init: function() {
        var TabRouter = new Tab.Router;
        Backbone.history.start();
    }
};

var arrUl = [];

Tab.Model = Backbone.Model.extend({
});

Tab.Collection = Backbone.Collection.extend({
    model: Tab.Model
});

Tab.View = Backbone.View.extend({
    el: $('#tab-con ul'),
    template: $('#item-template').html(),

    render: function(data) {
        var list = '<% _.each(item, function(i){ %>' + this.template +'<% });%>';
        this.el.html(_.template(list, data));
    }
});

Tab.Router = Backbone.Router.extend({
    _view: null,

    routes: {
         "":         "defaultTab",
        "tab/:id":   "showTab"
    },

    initialize: function() {
        this._view = new Tab.View;
    },

    defaultTab: function() {
        this.showTab(0);
    },

    showTab: function(id) {
        var _this = this;
        $('#tab-nav .active').removeClass('active');
        $('#tab-nav li').eq(id).addClass('active');
        if (!arrUl[id]) {
            $.ajax({
                url: 'data/data'+ id + '.json',
                dataType: 'json',
                async: false,
                success: function(data) {
                    _this._view.render(data);
                    arrUl[id] = data;
                }
            });
        } else {
            _this._view.render(arrUl[id]);
        }
    }
});

$(function() {
    Tab.init();
});

