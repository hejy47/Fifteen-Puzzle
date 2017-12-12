window.onload = function() {
    var equal = document.getElementById("equal"),
        remove = document.getElementById("remove"),
        key = document.querySelectorAll("#bottom button"),
        express = document.getElementById("express"),
        res = document.getElementById("res");
    Key = null;

    for (var i = 0; i < key.length; i++) {
        Key = key[i];

        Key.onmousedown = function() {
            if (this.value == "/" || this.value == "*" || this.value == "-" || this.value == "+" || this.value == "=") {
                this.style.backgroundColor = '#D2691E';
            } else {
                this.style.backgroundColor = '#DCDCDC';
            }

        }
        Key.onmouseup = function() {
            var color = this.style.backgroundColor;
            if (this.value == "/" || this.value == "*" || this.value == "-" || this.value == "+" || this.value == "=") {
                this.style.backgroundColor = '#F5923E';
            } else {
                this.style.backgroundColor = '#F2F2F2';
            }
        }
        Key.onclick = function() {
            var number = this.value;
            clickNumber(number);
        }
    }

    function clickNumber(number) {
        var resVal = res.innerHTML;
        var exp = express.innerHTML;
        var resEndSymbol = resVal.substring(resVal.length - 1, resVal.length);
        var resEndSymbol2 = resVal.substring(resVal.length - 2, resVal.length - 1);
        if (number !== "r" && number !== "C" && number !== "=") {
            if (resVal.length <= 18) {
                if ((resEndSymbol2 == "+" || resEndSymbol2 == "-" || resEndSymbol2 == "*" || resEndSymbol2 == "/") && resEndSymbol == "0") {
                    if (number >= 0 && number <= 9) {
                        resVal = resVal.slice(0, -1);
                    }
                    resVal += number;
                } else if (exp !== "" && number >= 0 && number <= 9) {
                    resVal = number;
                    exp = "";
                } else if (resVal == "0" && number >= 0 && number <= 9) {
                    resVal = number;
                    exp = "";
                } else {
                    resVal += number;
                    exp = "";
                }
            }
        } else if (number == "r") {
            if (resVal.length == 1) {
                resVal = "0";
            } else {
                resVal = resVal.slice(0, -1);
            }
        } else if (number == "C") {
            resVal = "0";
            exp = "";
        } else if (number == "=") {
            exp = resVal;
            try {
                resVal = eval(resVal) + "";
            } catch (exception) {
                alert("Error");
                resVal = "0";
                exp = "";
            }
        }
        if (resVal.length <= 10) {
            document.getElementById("res").style.fontSize = '4.5rem';
        } else {
            document.getElementById("res").style.fontSize = '2.5rem';
        }
        express.innerHTML = exp;
        res.innerHTML = resVal;
    }
}