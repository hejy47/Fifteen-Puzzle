var add = 0;
var active = 0;
var current = 0;

window.onload = function() {
    var buttons = document.getElementsByClassName("button");
    for (var i = 0; i < 5; i++) {
        buttons[i].addEventListener('click', getrandom);
    }
    $("#result").click(function() {
        var i = 0;
        for (i = 0; i < 5; i++) {
            if (buttons[i].value == 0) break;
        }
        if (i == 5) {
            $("p").html(add);
        }
    });
    $("#button").mouseleave(function() {
        current.abort();
        active = 0;
        $("p").html("");
        for (var i = 0; i < 5; i++) {
            add = 0;
            buttons[i].value = 0;
            $(buttons[i]).removeClass('inactive');
            $(buttons[i]).find('span').removeClass("get");
            $(buttons[i]).find('span').html("");
        }
    });


    $(".apb").click(function() {
        if ($(buttons[0]).find('span').html() === "") { buttons[0].click(); }
    });
}

function getrandom() {
    // if (this.find("span").html())
    //     return;
    if (this.value == 0) {
        var that = this;
        var show = $(this).find('span');
        var wait = {};
        var j = 0;
        show.html("...");
        show.addClass("get");
        // show.css("opacity", 1);
        var buttons = document.getElementsByClassName("button");
        for (var i = 0; i < 5; i++) {
            if (buttons[i] !== this && buttons[i].value == 0) {
                $(buttons[i]).addClass('inactive');
                wait[j++] = buttons[i];
                buttons[i].value = 1;
            }
        }
        current = $.get('http://localhost:3000/', function(data) {
            show.html(data.toString());
            add += parseInt(data);
            $(that).addClass('inactive');
            that.value = 1;
            active++;
            for (var i = 0; i < j; i++) {
                wait[i].value = 0;
                $(wait[i]).removeClass('inactive');
            }
            $(that).next().trigger("click");
            if (active == 5) {
                $("#result").click();
            }
        });
    }
}