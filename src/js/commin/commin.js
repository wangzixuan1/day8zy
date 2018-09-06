define(['jquery', 'hand'], function($, hand) {
    var main = function(name, data, tit, isappend) {
        var cur = $(name).html();
        var template = hand.compile(cur);
        var html = template(data);
        if (isappend) {
            $(tit).append(html);
        } else {
            $(tit).html(html);
        }
    }
    return main;
})