var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var md5 = require('js-md5');
mongoose.connect('mongodb://localhost/mydata', { useMongoClient: true });
var Schema = mongoose.Schema;
var userSchema = new Schema({
    username: { type: String },
    password: { type: String },
    std_id: { type: String },
    phone: { type: String },
    email: { type: String }
});
var User = mongoose.model('user', userSchema);

/* GET home page. */
router.get('/', function(req, res, next) {
    if (req.session.user) {
        res.render('detail.html', function(err, html) {
            var pagestring = html.toString(); //将JSON字符串转换为普通字符串
            pagestring = pagestring.replace("Username", req.session.user.username); //然后使用replace函数替换掉里面的对应的内容，不是在原有的基础上替换所以要将得到的新的字符串赋值给原来的字符串
            pagestring = pagestring.replace("ID", req.session.user.std_id);
            pagestring = pagestring.replace("Phone", req.session.user.phone);
            pagestring = pagestring.replace("Email", req.session.user.email);
            if (req.query.username && req.session.user.username !== req.query.username)
                pagestring = pagestring.replace("hint", '只能够访问自己的数据');
            res.send(pagestring);
        });
    } else {
        res.render('login.html', { title: 'Signin' });
    }
});

router.post('/', function(req, res, next) {
    if (!req.body.username) {
        req.session.user = null;
        res.redirect('/');
    } else {
        var user = {
            username: req.body.username,
            password: md5(req.body.password)
        }
        var message = "";
        Promise.all([
            User.findOne(user, function(err, doc) {
                if (err) {
                    console.log(err);
                } else if (!doc) {
                    message += "- 错误用户名或密码";
                } else {
                    console.log(doc);
                    req.session.user = doc;
                }
            })
        ]).then(function() {
            if (message == "") {
                res.redirect('/?username=' + user.username);
            } else {
                res.render('login.html', function(err, html) {
                    var pagestring = html.toString(); //将JSON字符串转换为普通字符串
                    pagestring = pagestring.replace("hint", message);
                    res.send(pagestring);
                });
            }
        });
    }
});

router.get('/regist', function(req, res, next) {
    res.render('regist.html', { title: 'Regist' });
});

router.post('/regist', function(req, res, next) {
    var message = "";
    var user = {
        username: req.body.username,
        std_id: req.body.std_id,
        phone: req.body.phone,
        password: md5(req.body.password),
        email: req.body.email
    }
    Promise.all([
        User.findOne({ 'username': req.body.username }, function(err, doc) {
            if (err) {
                console.log(err);
            } else if (!!doc) {
                message += "- 名称被占用<br>";
            }
        }),
        User.findOne({ 'std_id': req.body.std_id }, function(err, doc) {
            if (err) {
                console.log(err);
            } else if (!!doc) {
                message += "- 学号被占用<br>";
            }
        }),
        User.findOne({ 'phone': req.body.phone }, function(err, doc) {
            if (err) {
                console.log(err);
            } else if (!!doc) {
                message += "- 手机号被占用<br>";
            }
        }),
        User.findOne({ 'email': req.body.email }, function(err, doc) {
            if (err) {
                console.log(err);
            } else if (!!doc) {
                message += "- 邮箱被占用<br>";
            }
        })
    ]).then(
        function() {
            if (message == "") {
                var s_user = new User(user);
                s_user.save();
                req.session.user = user;
                res.redirect('/?username=' + user.username);
            } else {
                res.render('regist.html', function(err, html) {
                    var pagestring = html.toString(); //将JSON字符串转换为普通字符串
                    pagestring = pagestring.replace("hint", message);
                    res.send(pagestring);
                });
            }
        }
    );
});

module.exports = router;