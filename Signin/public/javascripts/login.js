$().ready(function() {
    var hint = $(".error");
    var inputs = $("input");
    var checks = $(".check");
    $("form").submit(function() { //绑定submit事件，在submit事件中主要是做前台表单验证或者附加参数，修改参数等。在里面return false;会取消提交表单， return true或者不返还，会提交表单
        hint.removeClass("show");
    });
    $(".reset").mousedown(function() {
        $(this).addClass("down1");
    });
    $(".reset").mouseup(function() {
        $(this).removeClass("down1");
    });
    $(".login").mousedown(function() {
        $(this).addClass("down2");
    });
    $(".login").mouseup(function() {
        $(this).removeClass("down2");
    });
    $(".signup").mousedown(function() {
        $(this).addClass("down2");
    });
    $(".signup").mouseup(function() {
        $(this).removeClass("down2");
    });
    $(".reset").click(function() {
        hint.html("hint");
        hint.removeClass("show");
    });
    $(".signup").click(function() {
        window.location.href = "http://localhost:8000/regist";
    });
    if (hint.html() !== "hint") {
        hint.addClass("show");
    }
});