seajs.use(['jquery', 'handlebars'], function($, handlebars) {
    $('.dropbox input').click(function() {
        var hover = $('.dropbox.hover')
        var _this = $(this.parentNode)

        if (hover[0] != _this[0]) {
            hover.removeClass('hover')
        }

        _this.toggleClass('hover')
    })

    $('.dropbox i').click(function() {
        $(this).prev().trigger('click')
    })

    $('.dropbox').delegate('a', 'click', function() {
        var hover = $('.dropbox.hover')
        hover.find('input').val(this.innerHTML)
        hover.removeClass('hover')
    })

    var movieId, cinemaId, mode = 'movie'

    handlebars.registerHelper('formatStar', function(grade) {
        return Math.floor(grade / 10)
    })

    handlebars.registerHelper('formatGrade', function(grade) {
        return grade / 10
    })

    handlebars.registerHelper('formatSession', function(showDate) {
        return showDate.match(/ (\d\d:\d\d)/)[1]
    })

    handlebars.registerHelper('parity', function(n) {
        return n % 2 ? 'class=pink' : ''
    })

    var _x
    handlebars.registerHelper('parity2', function() {
        _x += 1
        if (_x > 0) {
            _x = _x === 2 ? -2 : _x
            return 'class=pink'
        }
    })

    $('#J_movieBuy').click(function() {
        mode = 'movie'

        $('#J_normalFilterBox').show()
        $('#J_fuzzyFilterBox').hide()
        $('#J_selectCinema').insertAfter($('#J_selectMovie'))

        $('#J_step3').insertAfter($('#J_step2'))
        $('#J_step3').find('.number').html('3')
        $('#J_step2').find('.number').html('2')

        $.ajax({
            url: 'api/getFilms.json',
            type: 'POST',
            dataType: 'json',
            success: function(data) {
                var tpl = $('#movie-tpl').html()
                var html = handlebars.compile(tpl)(data)
                $('#J_movieList').html(html)
                $('#J_movieCount').html(data.data.length)
                $('#J_cinemaCount').html('0')
            }
        })

        $('#J_cinemaList ,#J_sessionContent').html('')
        $('#J_step2, #J_step3, #J_step4').removeClass('pass')
    })

    $('#J_cinemaBuy').click(function() {
        mode = 'cinema'

        $('#J_normalFilterBox').show()
        $('#J_fuzzyFilterBox').hide()
        $('#J_selectMovie').insertAfter($('#J_selectCinema'))

        $('#J_step2').insertAfter($('#J_step3'))
        $('#J_step3').find('.number').html('2')
        $('#J_step2').find('.number').html('3')

        $.ajax({
            url: 'api/getCinemas.json',
            type: 'POST',
            dataType: 'json',
            success: function(data) {
                var tpl = $('#cinema-tpl').html()
                var html = handlebars.compile(tpl)(data)
                $('#J_cinemaList').html(html)
                $('#J_cinemaCount').html(data.data.length)
                $('#J_movieCount').html('0')
            }
        })

        $('#J_movieList ,#J_sessionContent').html('')
        $('#J_step2, #J_step3, #J_step4').removeClass('pass')
    })

    $('#J_fuzzyFilter').click(function() {
        $('#J_normalFilterBox').hide()
        $('#J_fuzzyFilterBox').show()
        _x = 0

        $.ajax({
            url: 'api/getFilms.json',
            type: 'POST',
            dataType: 'json',
            success: function(data) {
                var tpl = $('#movie-tpl2').html()
                var html = handlebars.compile(tpl)(data)
                $('#J_fuzzyMovieList').html(html)
                $('#J_movieCount').html(data.data.length)
                $('#J_cinemaCount').html('0')
            }
        })

    })

    $('#J_movieList').delegate('li', 'click', function(e) {
        var selected = $('#J_movieList li.selected')
        var _this = $(this)

        if (selected[0] != _this[0]) {
            selected.removeClass('selected')
        }

        _this.toggleClass('selected')

        if ($(this).hasClass('selected')) {
            $('#J_selectedMovie').html($(this).find('.name').html())
            $('#J_selectedMovie').parent().addClass('pass')

            movieId = $(this).attr('data-movie-id')

            if (mode === 'movie') {
                $.ajax({
                    url: 'api/getCinemasForFilm.json',
                    type: 'POST',
                    dataType: 'json',
                    success: function(data) {
                        var tpl = $('#cinema-tpl').html()
                        var html = handlebars.compile(tpl)(data)
                        $('#J_cinemaList').html(html)
                        $('#J_cinemaCount').html(data.data.length)
                    }
                })

                $('#J_sessionContent').html('')
                $('#J_step3, #J_step4').removeClass('pass')
            } else {
                $.ajax({
                    url: 'api/getPlayPlans.json',
                    type: 'POST',
                    dataType: 'json',
                    success: function(data) {
                        var tpl = $('#session-tpl').html()
                        var html = handlebars.compile(tpl)(data)
                        $('#J_sessionContent').html(html)
                    }
                })

                $('#J_step4').removeClass('pass')
            }
        } else {
            $('#J_selectedMovie').html('')
            $('#J_selectedMovie').parent().removeClass('pass')
        }
    })

    $('#J_cinemaList').delegate('li', 'click', function() {
        var selected = $('#J_cinemaList li.selected')
        var _this = $(this)

        if (selected[0] != _this[0]) {
            selected.removeClass('selected')
        }

        _this.toggleClass('selected')

        if ($(this).hasClass('selected')) {
            $('#J_selectedCinema').html($(this).text())
            $('#J_selectedCinema').parent().addClass('pass')

            cinemaId = $(this).attr('data-cinema-id')

            if (mode === 'cinema') {
                $.ajax({
                    url: 'api/getFilms.json',
                    type: 'POST',
                    dataType: 'json',
                    success: function(data) {
                        var tpl = $('#movie-tpl').html()
                        var html = handlebars.compile(tpl)(data)
                        $('#J_movieList').html(html)
                        $('#J_movieCount').html(data.data.length)
                    }
                })

                $('#J_sessionContent').html('')
                $('#J_step2, #J_step4').removeClass('pass')
            } else {
                $.ajax({
                    url: 'api/getPlayPlans.json',
                    type: 'POST',
                    dataType: 'json',
                    success: function(data) {
                        var tpl = $('#session-tpl').html()
                        var html = handlebars.compile(tpl)(data)
                        $('#J_sessionContent').html(html)
                    }
                })
                $('#J_step4').removeClass('pass')
            }
        } else {
            $('#J_selectedCinema').html('')
            $('#J_selectedCinema').parent().removeClass('pass')
        }
    })

    $('#J_sessionContent').delegate('a', 'click', function() {
        var selected = $('#J_sessionContent a.selected')
        var _this = $(this)

        if (selected[0] != _this[0]) {
            selected.removeClass('selected')
        }

        _this.toggleClass('selected')

        if ($(this).hasClass('selected')) {
            $('#J_selectedSession').html($(this).text())
            $('#J_selectedSession').parent().addClass('pass')
            $('#J_step5').addClass('pass')
        } else {
            $('#J_selectedSession').html('')
            $('#J_selectedSession').parent().removeClass('pass')
            $('#J_step5').removeClass('pass')
        }
    })

    $('#J_dateList').delegate('a', 'click', function() {
        $('#J_selectedDate').html(this.innerHTML)
    })

    $('#J_cityList').delegate('a', 'click', function() {
        var cityId = $(this).attr('data-id')

        $.ajax({
            url: 'api/getZone.json',
            type: 'POST',
            dataType: 'json',
            success: function(data) {
                var tpl = $('#dropbox-tpl').html()
                var html = handlebars.compile(tpl)(data)
                $('#J_zoneList').html(html)
            }
        })
    })

    var params = {
        movieId: '',
        cinemaId: ''
    }
    var whiteIcon = $('#J_whiteIcon')
    var blueIcon = $('#J_blueIcon')
    var fuzzyMovieList = $('#J_fuzzyMovieList')
    fuzzyMovieList.delegate('li', 'click', function() {
        var selected = fuzzyMovieList.find('li.selected')
        if (selected.length == 2 && selected.index(this) < 0) return

        var _this = $(this)
        var movieId = _this.attr('data-movie-id')
        var tmpClass = 'movie_id_' + movieId
        var container = !whiteIcon.hasClass('movie_id') ? whiteIcon : blueIcon

        if (_this.hasClass('selected')) {
            _this.removeClass('selected')
            $('.' + tmpClass).html('').removeClass(tmpClass + ' movie_id')
            params.movieId = params.movieId.replace(movieId, '').replace(/^,|,$/, '')
        } else {
            _this.addClass('selected')
            container.addClass(tmpClass + ' movie_id')
            var name = _this.find('.name')
            flewInto('<div class="tmp-movie-name"><em></em><span>' + name.text() + '</span></div>', name, container, 30)
            params.movieId = params.movieId.concat(params.movieId.length ? ',' + movieId : movieId)

            if (params.movieId.length === 3) {
                $.ajax({
                    url: 'api/getCinemasForFilm.json',
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        movieId: params.movieId
                    },
                    success: function(data) {
                        var tpl = $('#cinema-tpl').html()
                        var html = handlebars.compile(tpl)(data)
                        $('#J_fuzzyCinemaList').html(html)
                        $('#J_cinemaCount').html(data.data.length)
                    }
                })
            }
        }
    })

    var cinemaContainer1 = $("#J_cinemaContainer1")
    var cinemaContainer2 = $("#J_cinemaContainer2")
    var fuzzyCinemaList = $('#J_fuzzyCinemaList')
    fuzzyCinemaList.delegate('li', 'click', function() {
        var selected = fuzzyCinemaList.find('li.selected')
        if (selected.length == 2 && selected.index(this) < 0) return

        var _this = $(this)
        cinemaId = _this.attr('data-cinema-id')
        var tmpClass = 'cinema_id_' + cinemaId
        var container = !cinemaContainer1.hasClass('cinema_id') ? cinemaContainer1 : cinemaContainer2

        if (_this.hasClass('selected')) {
            _this.removeClass('selected')
            $('.' + tmpClass).html('').removeClass(tmpClass + ' cinema_id')
            params.cinemaId = params.cinemaId.replace(cinemaId, '').replace(/^,|,$/, '')
        } else {
            _this.addClass('selected')
            $('.selected-table').show()
            container.addClass(tmpClass + ' cinema_id')
            flewInto('<div class="tmp-cinema-name">' + _this.text() + '</div>', _this, container, 0)
            params.cinemaId = params.cinemaId.concat(params.cinemaId.length ? ',' + cinemaId : cinemaId)

            if (params.cinemaId.length === 3) {
                $.ajax({
                    url: 'api/getShowDate.json',
                    type: 'POST',
                    dataType: 'json',
                    data: params,
                    success: function(data) {
                        var tpl = $('#session-tpl2').html()
                        var html = handlebars.compile(tpl)(data)
                        $('#J_fuzzySessionContent').html(html)
                    }
                })
            }
        }
    })

    var dateContainer = $("#J_dateContainer")
    var sessionContainer = $('.J_sessionContainer')
    var fuzzySessionContent = $('#J_fuzzySessionContent')
    fuzzySessionContent.delegate('a', 'click', function() {
        var selected = fuzzySessionContent.find('a.selected')
        var _this = $(this)

        if (selected[0] != _this[0]) {
            selected.removeClass('selected')
        }

        sessionContainer.html('')

        if (_this.hasClass('selected')) {
            _this.removeClass('selected')
            dateContainer.html('')
        } else {
            _this.addClass('selected')
            flewInto('<div class="tmp-cinema-name">' + _this.text() + '</div>', _this, dateContainer, 460, function() {
                sessionContainer.find('div').show()
            })

            params.showDate = _this.attr('data-show-date')
            $.ajax({
                url: 'api/getSessions.json',
                type: 'POST',
                dataType: 'json',
                data: params,
                success: function(data) {
                    for (var i = 0; i < data.length; i++) {
                        var item = data[i]
                        var container = $('.cinema_id_' + item.cinemaId).next()
                        var playPlans = item.playPlans
                        var hallName = item.hallName
                        var spans = []
                        for (var j = 0; j < playPlans.length; j++) {
                            var showTime = playPlans[j].showTime.split(':')
                            var className = $('.movie_id_' + playPlans[j].filmId).attr('data-color')
                            var left = (parseInt(showTime[0], 10) - 9) * 60 + parseInt(showTime[1], 10)
                            spans.push('<span class="' + className + '" style="left:' + left + 'px" data-film-name="' + playPlans[j].filmName + '" data-hall-name="' + hallName + '">' + playPlans[j].showTime + '</span>')
                        }
                        $('<div>' + spans.join('') + '</div>').appendTo(container)
                    }
                }
            })
        }
    })

    // 飞入效果
    function flewInto(html, origin, container, bias, callback) {
        var originOffset = origin.offset()
        var containerOffset = container.offset()
        $(html).css({
            'position': 'absolute',
            'top': originOffset.top,
            'left': originOffset.left
        }).appendTo('body').animate({
            'top': containerOffset.top,
            'left': containerOffset.left + bias
        }, 600, function() {
            container.html(this.innerHTML)
            this.parentNode.removeChild(this)
            callback && callback()
        })
    }

    var popTpl = handlebars.compile($('#pop-tpl').html())
    $('.J_sessionContainer').delegate('span', 'mouseover', function(evt){
        var target = evt.target;
        if (target.tagName !== 'SPAN') return;
        var target = $(target)
        var html = popTpl({
            'hallName': target.attr('data-hall-name'),
            'filmName': target.attr('data-film-name')
        })
        var offset = target.offset();
        $(html).css({
            'top': offset.top - 62,
            'left': offset.left - 27
        }).appendTo('body')
    })
    $('.J_sessionContainer').delegate('span', 'mouseout', function(evt){
        var target = evt.target;
        if (target.tagName !== 'SPAN') return;
        $('.pop').remove();
    })

    $.ready(function() {
        $.ajax({
            url: 'api/getCities.json',
            type: 'POST',
            dataType: 'json',
            success: function(data) {
                var tpl = $('#dropbox-tpl').html()
                var html = handlebars.compile(tpl)(data)
                $('#J_cityList').html(html)
            }
        })

        $('#J_movieBuy').trigger('click')
    })
})
