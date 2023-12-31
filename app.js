var createError = require('http-errors');
var express = require('express');
var path = require('path');

var cookieParser = require('cookie-parser');
var logger = require('morgan');
const api = require("./src/routes/api.js")
const cors = require("cors")
const db = require("./src/model/model")
var app = express();
const session = require('express-session')
app.use( 
  session({ secret: 'jkcement', 
  resave: false, 
  saveUninitialized: true 
}) );
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/work";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use('/uploads', express.static('uploads'));
app.use("/",api)

app.post("/admin",(req,res)=>{
  res.send("hello")
})

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
app.listen(8080,(err)=>{
  if(err){
      console.log(err.message)
  }else{
      console.log("port is running on 3000")
  }
})

module.exports = app;
