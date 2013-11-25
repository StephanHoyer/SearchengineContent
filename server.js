var express = require('express');
var http = require('http');

var app = express();

app.use(function(req, res, next) {
  console.log(req.headers['user-agent']);
  console.log(req.host, req.url);
  next();

});
app.use(require('cors')());
app.use(express.static(__dirname));
app.get('*', function(req, res, next) {
  res.sendfile(__dirname + '/index.html');
});

http.createServer(app).listen(8080);
console.log('Listen to port 8080, open http://localhost:8080');
