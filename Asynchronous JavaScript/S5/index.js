var add = 0;
var active = 0;
var ranarr = [0, 1, 2, 3, 4];

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
        setTimeout(function() {
            add = 0;
            active = 0;
            $("p").html("");
            for (var i = 0; i < 5; i++) {
                buttons[i].value = 0;
                $(buttons[i]).removeClass('inactive');
                $(buttons[i]).find('span').removeClass("get");
                $(buttons[i]).find('span').html("");
            }
        }, 500);

    });
    $(".apb").click(function() {
        var i = 0;
        for (i = 0; i < buttons.length; i++) {
            if ($(buttons[0]).find('span').html() !== "")
                break;
        }
        if (i === 5) {
            ranarr.sort(function() {
                return Math.random() - Math.random();
            });
            console.log(ranarr);
            buttons[ranarr[0]].click();
        }
    });
}

function getrandom() {
    if ($(this).find('span').html())
        return;
    if (this.value == 0) {
        active++;
        var that = this;
        var show = $(this).find('span');
        var wait = {};
        var j = 0;
        show.html("...");
        show.addClass("get");
        var buttons = document.getElementsByClassName("button");
        for (var i = 0; i < 5; i++) {
            if (buttons[i] !== this && buttons[i].value == 0) {
                $(buttons[i]).addClass('inactive');
                wait[j++] = buttons[i];
                buttons[i].value = 1;
            }
        }
        $.get('http://localhost:3000/', function(data) {
            show.html(data.toString());
            add += parseInt(data);
            $(that).addClass('inactive');
            that.value = 1;
            for (var i = 0; i < j; i++) {
                wait[i].value = 0;
                $(wait[i]).removeClass('inactive');
            }
            $(".button").eq(ranarr[active]).trigger("click");
            if (active == 5) { $("#result").click(); }
        });
    }
}