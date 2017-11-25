var blank_id = "l16";
var check = 0;

window.onload = function() {
    _stroke();
    var button = document.getElementsByTagName("button");
    button[0].onclick = _random;
    button[1].onclick = _show;
    for (var i = 0; i < 2; i++) {
        button[i].onmousedown = function() {
            this.className += " click";
        }
        button[i].onmouseup = function() {
            this.className = "bt";
        }
    }

}

function _stroke() {
    var c = document.getElementsByTagName("canvas");
    var img = document.createElement("img");
    img.src = '1.jpg';
    img.onload = function() {
        var index = 0;
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (i == j && j == 3) break;
                else {
                    c[index].addEventListener('click', _move);
                    ctx = c[index++].getContext("2d");
                    ctx.drawImage(img, j * img.width / 4, i * img.height / 4, img.width / 4, img.height / 4, 0, 0, 300, 150);
                }
            }
        }
    }

}

function _random() {
    document.getElementById("restart").innerHTML = "重新开始";
    check = 1;
    blank_id = "l16";
    var blanks = document.getElementsByClassName("blank");
    blanks[0].id = "l16";
    var ranArr = ["l1", "l2", "l3", "l4", "l5", "l6", "l7", "l8", "l9", "l10", "l11", "l12", "l13", "l14", "l15"];
    ranArr.sort(function() {
        return Math.random() - Math.random();
    });
    var c = document.getElementsByTagName("canvas");
    for (var i = 0; i < 15; i++) {
        c[i].id = ranArr[i];
    }
}

function _show() {
    var photo = document.getElementsByTagName("img");
    if (photo[0].className == "p") {
        photo[0].className += " photo";
    } else
        photo[0].className = "p";
}

function _move() {
    // if (check == 0) { return; }
    var position = -1;
    var ranArr = ["l1", "l2", "l3", "l4", "l5", "l6", "l7", "l8", "l9", "l10", "l11", "l12", "l13", "l14", "l15", "l16"];
    for (var i = 0; i < 16; i++) {
        if (blank_id == ranArr[i]) {
            position = i;
            break;
        }
    }
    if ((this.id == ranArr[position - 1] && position != 4 && position != 8 && position != 12) || (this.id == ranArr[position + 1] && position != 3 && position != 7 && position != 11) || this.id == ranArr[position - 4] || this.id == ranArr[position + 4]) {
        var temp = this.id;
        this.id = blank_id;
        blank_id = temp;
        var blanks = document.getElementsByClassName("blank");
        blanks[0].id = temp;
    }
    if (check == 1 && issuccess()) {
        alert("You Win!");
        document.getElementById("restart").innerHTML = "开始游戏";
    }
}

function issuccess() {
    var ranArr = ["l1", "l2", "l3", "l4", "l5", "l6", "l7", "l8", "l9", "l10", "l11", "l12", "l13", "l14", "l15", "l16"];
    var c = document.getElementsByTagName("canvas");
    for (var i = 0; i < 15; i++) {
        if (c[i].id != ranArr[i])
            return false;
    }
    return true;
}