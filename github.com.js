// line number toggle for github.com source pages
$('div#files ul.actions').prepend('<li><a href="#" id="lines-url">no-lines</a></li>');
$('a#lines-url').click(function() {
    var _this = $(this);
    $('pre.line_numbers').toggle();
    if (_this.html() == 'no-lines') {
        _this.html('lines');
    } else {
        _this.html('no-lines');
    }
    return false;
});