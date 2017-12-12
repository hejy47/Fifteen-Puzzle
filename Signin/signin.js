var http = require("http");
var url = require("url");
var qs = require("querystring");
var fs = require("fs");
var path = require("path");

function ifrept(nam, id, tele, mail) {
    var message = "";
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].username == nam) message += "- 名称被占用<br>";
        if (arr[i].std_id == id) message += "- 学号已被注册<br>";
        if (arr[i].phone == tele) message += "- 手机号已被注册<br>";
        if (arr[i].email == mail) message += "- 邮箱已被注册<br>";
    }
    return message;
}

var MIME = {
    ".html": "text/html",
    ".js": "application/javascript",
    ".css": "text/css",
    ".png": "image/png"
};

var arr = [];
fs.readFile("data.txt", "utf-8", function(err, data) {
    if (!err) {
        console.log("读取文件成功");
        if (data) arr = JSON.parse(data);
    } else console.log("读取文件失败");
})

var server = http.createServer(function(req, res) {
    if (req.method === "POST") {
        handledata(req, res);
    } else {
        judgepage(req, res);
    }
}).listen(8000, function() {
    console.log("服务开启:8000");
});

function handledata(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    var result = "";
    req.on("data", function(chunk) {
        result += chunk;
    });
    req.on("end", function() {
        var user = qs.parse(result);
        var message = ifrept(user.username, user.std_id, user.phone, user.email);
        if (message !== "") { //重复
            fs.readFile(__dirname + '/index.html', function(err, data) {
                if (err) {
                    res.writeHead(500);
                    res.end();
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    var pagestring = data.toString();
                    pagestring = pagestring.replace("hint", message); //替换原来的提示信息
                    res.write(pagestring);
                    res.end();
                }
            });
        } else { //不重复
            arr.push(user);
            fs.writeFileSync("data.txt", JSON.stringify(arr), "utf-8");
            res.writeHead(301, { Location: '?username=' + user.username });
            res.end();
        }

    });
}

function judgepage(req, res) {
    var pathname = url.parse(req.url).pathname;
    var search = url.parse(req.url).search;
    if (pathname == '/' && /\?username/.test(search)) {
        var username = qs.parse(url.parse(req.url).query).username; //获得用户名
        if (isexist(username)) { //跳到用户名页面
            if (pathname == '/') pathname = '/detail.html';
            senddetail(req, res, pathname, username);
        } else { //回到注册页面
            if (pathname == '/') pathname = '/index.html';
            sendindex(req, res, pathname);
        }
    } else { //进入注册页面
        if (pathname == '/') pathname = '/index.html';
        sendindex(req, res, pathname);
    }
};

function senddetail(req, res, pathname, username) {
    var user = {};
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].username === username) {
            user.username = arr[i].username;
            user.std_id = arr[i].std_id;
            user.phone = arr[i].phone;
            user.email = arr[i].email;
            break;
        }
    }
    fs.readFile(__dirname + pathname, function(err, data) {
        if (err) {
            res.writeHead(500);
            res.end();
        } else {
            res.writeHead(200, { 'Content-Type': MIME[path.extname(pathname)] });
            var pagestring = data.toString(); //将JSON字符串转换为普通字符串
            pagestring = pagestring.replace("Username", user.username); //然后使用replace函数替换掉里面的对应的内容，不是在原有的基础上替换所以要将得到的新的字符串赋值给原来的字符串
            pagestring = pagestring.replace("ID", user.std_id);
            pagestring = pagestring.replace("Phone", user.phone);
            pagestring = pagestring.replace("Email", user.email);
            res.write(pagestring);
            res.end();
        }
    });
}

function sendindex(req, res, pathname) {
    fs.readFile(__dirname + pathname, function(err, data) {
        if (err) {
            res.writeHead(500);
            res.end();
        } else {
            res.writeHead(200, { 'Content-Type': MIME[path.extname(pathname)] });
            res.write(data);
            res.end();
        }
    });
}

function isexist(username) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].username === username) {
            return true;
        }
    }
    return false;
}