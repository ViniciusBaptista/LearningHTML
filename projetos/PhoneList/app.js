var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var methodOverride = require('method-override');
var error = require('./middlewares/error');
var app = express();


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(cookieParser('lista'));
app.use(expressSession());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));

load('models')
    .then('controllers')
    .then('routes')
    .into(app)

app.use(error.notFound);
app.use(error.serverError);

app.listen(8000, function() {
  console.log('Phone List, online!');
});

module.exports = app;