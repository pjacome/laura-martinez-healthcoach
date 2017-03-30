'use strict';

var express = require('express');
var handlebars = require('express-handlebars');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var path = require('path');
var db = require('./db');
var app = express();

app.disable('x-powered-by');
app.set('port', process.env.PORT || 8080);
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(require('body-parser').urlencoded({extended: true}));
app.use(require('body-parser').json());
app.use(express.static(__dirname + '/public'));
app.use('/en', express.static(__dirname + '/public'));
app.use('/es', express.static(__dirname + '/public'));
//app.enable('view cache');

// db connection
db.init(function (err) {
    if (err) {
        console.log(err);
        return;
    }
});

app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'fuck off',
    store: new mongoStore({
        url: 'mongodb://127.0.0.1:27017',
        host: 'localhost',
        port: '27017',
        db: 'laura',
        collection: 'sessions'
    })
}));

// routes
app.use('/', require('./routes/routes'));

app.listen(app.get('port')/*, '127.0.0.1'*/, function() {
    console.log("listening on port " + app.get('port'));
});

module.exports = app;