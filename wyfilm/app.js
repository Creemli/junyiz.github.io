$('#J_cinemaChannel a').click(function() {
    var h = $(this).parent();
    if (h.hasClass('current')) {
        h.removeClass('current');
        h.next().hide(); 
    }
    else {
        h.addClass('current');
        h.next().show(); 
    }
});

$('#J_navList a').click(function() {
    $('#J_navList li').removeClass('current');
    $(this).parent().addClass('current');
    var index = $('#J_navList a').index(this) + 1;
    $('.J_movieList').hide();
    $('.J_movieList:nth-child(' + index + ')').show();
});

$('.J_movieList h4 a').click(function() {
    var h = $(this).parent();
    if (h.hasClass('current')) {
        h.removeClass('current');
        h.next().hide(); 
    }
    else {
        h.addClass('current');
        h.next().show(); 
    }
});

$('.J_storyLine').click(function() {
    var storyLine = $(this).parent().parent().next();
    if (storyLine[0].style.display === 'block') {
        storyLine.hide();
    }
    else {
        storyLine.show();
    }
});
$('.J_comment').click(function() {
    var comment = $(this).parent().parent().next().next();
    if (comment[0].style.display === 'block') {
        comment.hide();
    }
    else {
        comment.show();
    }
});

$('#scroller li').click(function() {
    if (this.className === 'has-seat') {
        this.className = 'selected-seat';
    }
    else if (this.className === 'selected-seat') {
        this.className = 'has-seat';
    }
})

$('#J_submit').click(function() {
    $('.popup').show();
});
$('#J_closePopup').click(function() {
    $('.popup').hide();
});
