var express = require('express');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://achim:mQ8sOpOikNKXTjWt@cluster0-shard-00-00-j6d3u.mongodb.net:27017,cluster0-shard-00-01-j6d3u.mongodb.net:27017,cluster0-shard-00-02-j6d3u.mongodb.net:27017/hacktivoverflow?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin')
const cors = require('cors');

var index = require('./routes/index');
var users = require('./routes/users');
var thread = require('./routes/thread');

var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', index);
app.use('/users', users);
app.use('/threads', thread);

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
  res.send('dilarang kepo! akses apa yg harus anda akses');
});

module.exports = app;
