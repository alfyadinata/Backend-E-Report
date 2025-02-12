const createError = require('http-errors');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
var cors = require('cors');
const expressValidator = require('express-validator');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const complaintRouter = require('./routes/complaint');
const categoryRouter = require('./routes/category');
const logRouter = require('./routes/log');
const responseRouter = require('./routes/response');
const notifRouter = require('./routes/notif');
// import { admin } from './firebase-config';
const admin = require('./firebase-config');
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(expressValidator());
// Middleware
const auth = require('./middleware/auth');
const middSuperAdmin = require('./middleware/superAdmin');
const userMiddleware = require('./middleware/reporterMiddleware');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', authRouter);
app.use('/', indexRouter);
app.use('/users', middSuperAdmin, usersRouter);
app.use('/complaint', auth, complaintRouter);
app.use('/response', middSuperAdmin, responseRouter);
app.use('/category', auth, categoryRouter);
app.use('/log', middSuperAdmin, logRouter);
app.use('/notif', notifRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
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
