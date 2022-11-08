var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config(); 
const connectionString =  
process.env.MONGO_CON 
mongoose = require('mongoose'); 
mongoose.connect(connectionString,  
{useNewUrlParser: true, 
useUnifiedTopology: true}); 

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var houseRouter = require('./routes/house');
var gridBuildRouter = require('./routes/gridbuild');
var selectorRouter = require('./routes/selector');
var house = require("./models/house");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/house', houseRouter);
app.use('/gridbuild', gridBuildRouter);
app.use('/selector', selectorRouter);

// We can seed the collection if needed on 
async function recreateDB(){ 
  // Delete everything 
  await house.deleteMany(); 
 
  let instance1 = new 
house({house_bedrooms:4,  house_rent:500, 
  house_address:"walnut"}); 
  instance1.save( function(err,doc) { 
      if(err) return console.error(err); 
      console.log("First object saved") 
  }); 

  let instance2 = new 
house({house_bedrooms:6,  house_rent:800, 
  house_address:"village o"}); 
  instance2.save( function(err,doc) { 
      if(err) return console.error(err); 
      console.log("Second object saved") 
  }); 
} 
 
let reseed = true; 
if (reseed) { recreateDB();}

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
