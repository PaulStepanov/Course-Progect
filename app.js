var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('express-handlebars');





var app = express();

// view engine setup
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir:__dirname + '/views'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Session
var session = require('express-session');
app.use('/',session({
  resave: true,
  saveUninitialized: false,
  cookie: { maxAge: 60000 },
  secret: ' '
}));
//Middleware

// var log = require('./routes/loginMidleware')([]);//Указываем пути которые игнорить
// app.use('/',log);
app.use(express.static('public'));
//routing
var index = require('./routes/index');
app.use('/', index);
var interview=require('./routes/interview');
app.use('/interview',interview);
var ask=require('./routes/ask');
app.use('/ask',ask);
var stat=require('./routes/stat');
app.use('/stat',stat);
var game=require('./routes/game');
app.use('/game',game);

//rest
var login=require('./routes/rest/login/login');
app.use('/rest',login);

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
