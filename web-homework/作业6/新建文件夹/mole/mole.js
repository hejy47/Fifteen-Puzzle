var count = 0;
var status = 0;
_clock = 31;

window.onload = function() {
    Create_button();
    document.getElementById("start_stop").onclick = start_stop_func;
    button = document.getElementsByClassName("hole");
}

function Create_button() {
    var _container = document.getElementById("container");
    for (var i = 0; i < 60; i++) {
        var new_button = document.createElement("input");
        new_button.setAttribute("type", "radio");
        new_button.setAttribute("name", "mouse");
        new_button.className = "hole";
        new_button.addEventListener('click', button_click);
        new_button.addEventListener('mousedown', before_button);
        _container.appendChild(new_button);
    }
}

function start_stop_func() {
    if (status == 0) {
        status = 1;
        score = 0;
        _clock = 31;
        random_occur();
        document.getElementById("score").value = score;
        document.getElementById("time").value = _clock;
        document.getElementById("GameStatus").value = "Playing";
        clock();
    } else {
        alert("Game Over.\n Your score is: " + score);
        document.getElementById("GameStatus").value = "Game Over";
        clearInterval(time_value);
        button[current].checked = false;
        _clock = 0;
        status = 0;
    }
}

function random_occur() {
    if (_clock != 0) {
        current = Math.round(Math.random() * 60 - 1);
        button[current].checked = true;
    }
}

function clock() {
    _clock = _clock - 1;
    document.getElementById("time").value = _clock;
    time_value = setTimeout(clock, 1000);
    if (_clock == 0) {
        clearInterval(time_value);
        document.getElementById("GameStatus").value = "Gameover";
        alert("Game Over.\n Your score is: " + document.getElementById("score").value);
        status = 0;
        button[current].checked = false;
    }
}

function button_click(event) {
    if (_clock != 0) {
        if (before == true) {
            score++;
            this.checked = false;
            random_occur();
        } else {
            score--;
            this.checked = false;
            button[current].checked = true;
        }
        document.getElementById("score").value = score;
    } else {
        this.checked = false;
    }
}

function before_button(event) {
    before = this.checked;
}