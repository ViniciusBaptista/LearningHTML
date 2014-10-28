var express = require('express');
var load = require('express-load');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var redis = require('redis');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));


io.on('connection', function(socket) {
  socket.on('chat message', function(msg) {
    io.emit('chat message', msg);
  });
});

load('models')
    .then('controllers')
    .then('routes')
    .into(app);

http.listen(8000, function() {
  console.log('Abrindo na 8000');
});