$().ready(function() {
    var hint = $(".error");
    var inputs = $("input");
    var checks = $(".check");
    $("form").submit(function() { //绑定submit事件，在submit事件中主要是做前台表单验证或者附加参数，修改参数等。在里面return false;会取消提交表单， return true或者不返还，会提交表单
        hint.removeClass("show");
        return check();
    });
    $(".reset").mousedown(function() {
        $(this).addClass("down1");
    });
    $(".reset").mouseup(function() {
        $(this).removeClass("down1");
    });
    $(".submit").mousedown(function() {
        $(this).addClass("down2");
    });
    $(".submit").mouseup(function() {
        $(this).removeClass("down2");
    });
    $(".reset").click(function() {
        for (var i = 0; i < checks.length; i++) {
            $(checks[i]).removeClass("right");
            $(checks[i]).removeClass("false");
        }
        hint.html("hint");
        hint.removeClass("show");
    });
    $(inputs[0]).click(function() {
        $(checks[0]).removeClass("right");
        $(checks[0]).removeClass("false");
        $(inputs[0]).blur(function() {
            checkUsername($(inputs[0]).val());
        });
    });
    $(inputs[1]).click(function() {
        $(checks[1]).removeClass("right");
        $(checks[1]).removeClass("false");
        $(inputs[1]).blur(function() {
            checkId($(inputs[1]).val());
        });
    });
    $(inputs[2]).click(function() {
        $(checks[2]).removeClass("right");
        $(checks[2]).removeClass("false");
        $(inputs[2]).blur(function() {
            checkTelephone($(inputs[2]).val());
        });
    });
    $(inputs[3]).click(function() {
        $(checks[3]).removeClass("right");
        $(checks[3]).removeClass("false");
        $(inputs[3]).blur(function() {
            checkMail($(inputs[3]).val());
        });
    });
    if (hint.html() !== "hint") {
        hint.addClass("show");
    }
});

function checkUsername(username) {
    if (username !== "" && username.match(/^[a-zA-Z]{1}[a-zA-Z0-9_]{5,17}$/) != null) {
        $(".check").eq(0).addClass("right");
    } else {
        $(".check").eq(0).addClass("false");
    }
}

function checkId(studentId) {
    if (studentId !== "" && studentId.match(/^[1-9]{1}[0-9]{7}$/) != null) {
        $(".check").eq(1).addClass("right");
    } else {
        $(".check").eq(1).addClass("false");
    }
}

function checkTelephone(tele) {
    if (tele !== "" && tele.match(/^[1-9]{1}[0-9]{10}$/) != null) {
        $(".check").eq(2).addClass("right");
    } else {
        $(".check").eq(2).addClass("false");
    }
}

function checkMail(mailbox) {
    if (mailbox !== "" && mailbox.match(/[\w!#$%&'*+\/=?^_`{|}~-]+(?:\.[\w!#$%&'*+\/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/) != null) {
        $(".check").eq(3).addClass("right");
    } else {
        $(".check").eq(3).addClass("false");
    }
}

function check() {
    var _right = $(".right");
    if (_right.length !== 4) return false;
    else return true;
}