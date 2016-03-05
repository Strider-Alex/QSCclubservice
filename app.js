var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');

var messages=require('./lib/middleware/messages');
var auth=require('./lib/middleware/auth');

//connect database
var db=require('./lib/db.js');
var dbtest=require('./lib/dbtest.js');

var index = require('./routes/index');
var myclub = require('./routes/myclub');
var login = require('./routes/login');
var current_club = require('./routes/current_club');
var api = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
		extended : true
	}));   
app.use(cookieParser("your secret here"));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
		secret : "your secret here",
		resave : false,
		saveUninitialized : true,
	}));
app.use(methodOverride(function (req, res) {
		if (req.body && typeof req.body === 'object' && '_method' in req.body) {
			var method = req.body._method
				delete req.body._method
				return method
		}
	}))

app.use(auth);
app.use(messages);

//routes
app.use('/', index);
app.use('/myclub',myclub);
app.use('/login',login);
app.use('/current_club',current_club);
app.use('/api',api);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function (err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message : err.message,
			error : err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message : err.message,
		error : {}
	});
});

module.exports = app;
