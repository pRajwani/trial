var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postsRouter = require('./routes/posts');
var imageUpload = require('./routes/upload');

var app = express();
var PORT = process.env.PORT || 8080

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

/*app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Header","Origin,X-Requested-With, Content-Type, Accept, authorization");
  res.setHeader("Access-Control-Allow-Methods","POST,GET,DELETE,PUT,OPTIONS,PATCH");
  next();
})*/
app.get('*',(req,res)=>{
  console.log("request URL",req.url)
  res.sendFile(path.join(__dirname,'public'));
})  

// app.get('*', function(req, res) {
//   res.redirect('/');
// });

app.use('/users', usersRouter);
app.use('/post', postsRouter);
app.use('/upload',imageUpload);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // // render the error page
  // res.status(err.status || 500);
  // res.render('error');
  res.redirect('/');
});

app.listen( PORT, ()=> {
  console.log("Connected to Server")
})

module.exports = app;
