'use strict';

var express = require('express');
var handlebars = require('express-handlebars');
var path = require('path');
var mongoClient = require('mongodb').MongoClient;
var app = express();
var db;

app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(require('body-parser').urlencoded({extended: true}));
app.use(require('body-parser').json());
app.disable('x-powered-by');
app.set('port', process.env.PORT || 5000);
app.use(express.static(__dirname + '/public'));
app.use('/en', express.static(__dirname + '/public'));
app.use('/es', express.static(__dirname + '/public'));
// Enable this on Host Server ... but why?
// because this is template caching
//app.enable('view cache');

// routes
app.use('/', require('./routes/routes'));

// for localhost
// app.listen(app.get('port'), function() {
// for wifi
var ipv4 = '192.168.1.64';
//ipv4 = '127.0.0.1';

mongoClient.connect('mongodb://' + ipv4 + ':27017', function (err, database) {
    if(err) {
        console.log('could not connect to mongo db');
    } else {
        console.log('connected to mongo db');
    }
});

app.listen(app.get('port'), ipv4, function() {
    console.log("listening on port " + app.get('port'));
});

module.exports = app;