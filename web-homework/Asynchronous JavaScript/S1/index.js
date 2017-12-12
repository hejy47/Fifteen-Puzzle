var add = 0;
var active = 0;

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
            $("#result").css("background-color", "gray");
        }
    });
    $("#control-ring-container").mouseleave(function() {
        $("p").html("");
        for (var i = 0; i < 5; i++) {
            buttons[i].value = 0;
            $(buttons[i]).css("background-color", "#303F9F");
            $(buttons[i]).find('span').css("opacity", 0);
        }
    });
}

function getrandom() {
    if (this.value == 0) {
        var that = this;
        var show = $(this).find('span');
        var wait = {};
        var j = 0;
        show.html("...");
        show.css("opacity", 1);
        var buttons = document.getElementsByClassName("button");
        for (var i = 0; i < 5; i++) {
            if (buttons[i] !== this && buttons[i].value == 0) {
                $(buttons[i]).css("background-color", "gray");
                wait[j++] = buttons[i];
                buttons[i].value = 1;
            }
        }
        $.get('http://localhost:3000/', function(data) {
            show.html(data.toString());
            add += parseInt(data);
            $(that).css("background-color", "gray");
            that.value = 1;
            for (var i = 0; i < j; i++) {
                wait[i].value = 0;
                $(wait[i]).css("background-color", "#303F9F");
            }
            active++;
            if (active == 5) {
                $("#result").css("background-color", "#303F9F");
            }
        });

    }
}