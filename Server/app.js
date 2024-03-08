var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

//Controller router

var homeRouter = require('./routes/WebServer/home');
var productRouter = require('./routes/WebServer/product');
var userRouter = require('./routes/WebServer/user');
var staffRouter = require('./routes/WebServer/staff');

//API ROuter
var indexRouter = require('./routes/API/index');
var usersRouter = require('./routes/API/users');
var apiCate=require('./routes/API/api.cate');
var apiStaff=require('./routes/API/api.staff');
var apiDonHang=require('./routes/API/api.donhang');
var apiHoaDon=require('./routes/API/api.hoaDon');
var apiRating=require('./routes/API/api.Rating');
var apiNotification=require('./routes/API/api.notification');
var apiFVR=require('./routes/API/api.FVR');
var apiAddress=require('./routes/API/api.addres');

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
app.use(session({
  secret: 'nhNNGHSNFGH83sdf23435Fdzgsfnksjdfh9', // Thay thế bằng một khóa bí mật mạnh mẽ hơn trong thực tế
  resave: false,
  saveUninitialized: true
}));

//WEB SERVER
app.use('/', homeRouter);
app.use('/products',productRouter);
app.use('/users',userRouter);
app.use('/staffs',staffRouter);
//API
app.use('/API/product', indexRouter);
app.use('/API/users', usersRouter);
app.use('/API/Cate',apiCate);
app.use('/API/staff',apiStaff);
app.use('/API/donhang',apiDonHang);
app.use('/API/hoaDon',apiHoaDon);
app.use('/API/Rating',apiRating);
app.use('/API/ntf',apiNotification);
app.use('/API/fvr',apiFVR);
app.use('/API/Address', apiAddress);

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
