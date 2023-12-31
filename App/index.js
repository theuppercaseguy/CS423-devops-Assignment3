var express = require('express'); // For route handlers and templates to serve up.
var path = require('path'); // Populating the path property of the request
var responseTime = require('response-time'); // For code timing checks for performance logging
var logger = require('morgan'); // HTTP request logging

var carts = require('./carts');
var app = express();

// Adds an X-Response-Time header to responses to measure response times
app.use(responseTime());

// logs all HTTP requests. The "dev" option gives it a specific styling
app.use(logger('dev'));

// Sets up the response object in routes to contain a body property with an object of what is parsed from a JSON body request payload
app.use(express.json())

// Serving up of React app HTML with its static content - images, CSS files, and JavaScript files
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.use(express.static(path.join(__dirname, 'build')));

// Rest API routes
app.use('/api/carts', carts);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler that will add in a stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) { // eslint-disable-line no-unused-vars
    if (err.status)
      res.status(err.status).json({ message: err.toString(), error: err });
    else
      res.status(500).json({ message: err.toString(), error: err });
    console.log(err);
  });
}

// production error handler with no stack traces exposed to users
app.use(function (err, req, res, next) { // eslint-disable-line no-unused-vars
  console.log(err);
  if (err.status)
    res.status(err.status).json({ message: err.toString(), error: {} });
  else
    res.status(500).json({ message: err.toString(), error: {} });
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + server.address().port);
});

module.exports = server;
