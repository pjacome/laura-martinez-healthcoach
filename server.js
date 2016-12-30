'use strict';

var express = require('express');
var handlebars = require('express-handlebars');

var app = express();

app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(require('body-parser').urlencoded({extended: true}));
app.use(require('body-parser').json());
app.disable('x-powered-by');
app.set('port', process.env.PORT || 5000);
app.use('/', express.static(__dirname + '/public'));
// Enable this on Host Server
//app.enable('view cache');

// routes
app.use('/', require('./routes/routes'));

// for localhost
// app.listen(app.get('port'), function() {
// for wifi
var ipv4 = '192.168.1.64';
app.listen(app.get('port'), ipv4, function() {
    console.log("listening on port " + ipv4 + ':' + app.get('port'));
});

module.exports = app;