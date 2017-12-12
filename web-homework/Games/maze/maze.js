var flag_S = 0;
var flag_P = [0, 0, 0, 0, 0]; // 标识是否经过各路段避免作弊
var flag_E = 0; // 标识是否经过终点
var flag_W = 0; // 标识是否碰到墙壁
var test_cheat = 0; // 标识是否经过测试结构

function addListener() { // 添加事件处理器
    var _wall = document.getElementsByClassName("wall");
    var _path = document.getElementsByClassName("path");
    for (var i = 0; i < 5; i++) {
        _wall[i].addEventListener('mouseover', error_func); // 鼠标碰到墙触发的事件
        _wall[i].addEventListener('mouseout', reset_func); // 鼠标离开墙触发的事件
        _path[i].addEventListener('mouseout', path_func); // 鼠标经过路径触发的事件
    }
    var _start = document.getElementById("start");
    var _end = document.getElementById("end");
    _start.addEventListener('mouseover', start_func); // 鼠标经过起点触发的事件
    _end.addEventListener('mouseover', end_func); // 鼠标经过终点触发的事件
}

function start_func(event) {
    if (flag_S == 0) {
        for (var i = 0; i < 5; i++) {
            flag_P[i] = 0;
        }
        flag_E = 0;
        flag_W = 0;
        test_cheat = 0;
        document.getElementById("result").textContent = "Have a try!";
    }
    flag_S = 1;
}

function end_func(event) {
    if (flag_S == 1) {
        for (var i = 0; i < 5; i++) {
            if (flag_P[i] == 0) {
                test_cheat = 1;
                document.getElementById("result").textContent = "Don't Cheat, you should start from the 'S' and move to the 'E' inside the maze!";
            }
        }
        if (test_cheat == 0) {
            document.getElementById("result").textContent = "You Win!";
        }
        flag_S = 0;
    }
    flag_E = 1;
}

function error_func(event) {
    if (flag_S == 1 && flag_E == 0) {
        event.target.className += " error";
        document.getElementById("result").textContent = "You Lose!";
        flag_S = 0;
    }
}

function reset_func(event) {
    event.target.className = "wall";
}

function path_func(event) { // 鼠标经过跑道时作记号以便检测是否作弊
    if (event.target.id == "path1") {
        flag_P[0] = 1;
    } else if (event.target.id == "path2") {
        flag_P[1] = 1;
    } else if (event.target.id == "path3") {
        flag_P[2] = 1;
    } else if (event.target.id == "path4") {
        flag_P[3] = 1;
    } else if (event.target.id == "path5") {
        flag_P[4] = 1;
    }
}

window.onload = function() { // 页面加载完毕后执行添加事件处理器函数。
    addListener();
}