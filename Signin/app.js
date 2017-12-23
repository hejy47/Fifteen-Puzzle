var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var MongoStore = require('connect-mongo')(session);

var index = require('./routes/index');

var app = express();

// view engine setup
app.engine('html', function(filePath, options, callback) { // 定义模板引擎
    fs.readFile(filePath, function(err, content) {
        if (err) return callback(new Error(err));
        // 这是一个功能极其简单的模板引擎
        var rendered = content.toString().replace('#title#', '<title>' + options.title + '</title>')
            .replace('#message#', '<h1>' + options.message + '</h1>');
        return callback(null, rendered);
    })
});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'test',
    resave: false,
    cookie: { maxAge: 60000 * 10 },
    saveUninitialized: true,
    store: new MongoStore({
        host: 'localhost',
        port: 27017,
        db: 'test-app',
        url: 'mongodb://localhost/mydata',
        collection: 'users'
    })
}));

app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;