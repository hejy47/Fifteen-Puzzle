var add = 0;
var active = 0;
var current = {};

window.onload = function() {
    var buttons = document.getElementsByClassName("button");
    $("#button").mouseleave(function() {
        setTimeout(function() {
            add = 0;
            active = 0;
            $("p").html("");
            for (var i = 0; i < 5; i++) {
                current[i].abort();
                buttons[i].value = 0;
                $(buttons[i]).removeClass('inactive');
                $(buttons[i]).find('span').removeClass("get");
                $(buttons[i]).find('span').html("");
            }
        }, 500);
    });
    $(".apb").click(function() {
        if ($(buttons[0]).find('span').html() === "")
            getrandom();
    });
}

function getrandom() {
    if ($(".unread").text()) {
        return;
    }
    var buttons = $(".button");
    var show = $(".unread");
    show.html("...");
    show.addClass("get");
    for (var i = 0; i < 5; i++) {
        current[i] = $.ajax({
            type: "GET",
            cache: false,
            url: "/" + i,
            success: function(data) {
                var j = $(this)[0]['url'][1];
                console.log(j);
                $(buttons[j]).addClass('inactive');
                show.eq(j).html(data);
                add += parseInt(data);
                active++;
                if (active == 5) {
                    $("p").html(add);
                }
            }
        });
    }
}