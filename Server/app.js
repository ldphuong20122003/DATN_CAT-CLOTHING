var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/API/index');
var usersRouter = require('./routes/API/users');
var apiCate=require('./routes/API/api.cate');
var apiStaff=require('./routes/API/api.staff');
var apiDonHang=require('./routes/API/api.donhang');
var apiHoaDon=require('./routes/API/api.hoaDon');
var apiRating=require('./routes/API/api.Rating');
const bodyParser = require('body-parser');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/apiCate',apiCate);
app.use('/apistaff',apiStaff);
app.use('/donhang',apiDonHang);
app.use('/hoaDon',apiHoaDon);
app.use('/Rating',apiRating);
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
