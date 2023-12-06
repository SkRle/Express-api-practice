var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var indexRouter = require('./routes/index');
var customerRouter = require('./routes/customer');
var productRouter = require('./routes/product')
var usersRouter = require('./routes/user')
var ordersRouter = require('./routes/orders')
require('dotenv').config()

var app = express();

const mongoose = require('mongoose');
const {DB_HOST , DB_PORT , DB_NAME , DB_USER , DB_PASS} = process.env

mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`,{
    user : DB_USER,
    pass : DB_PASS,
    // useUnifiedTopology : true,
    // useNewUrlParser : true
})
.then(()=>{
  console.log('connect success!');
}).catch((err) => {
  console.log("connect fail",err.message);
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/customer',customerRouter)
app.use('/products',productRouter)
app.use('/users',usersRouter)
app.use('/orders',ordersRouter)


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
