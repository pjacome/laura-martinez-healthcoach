'use strict';

var express = require('express');
var handlebars = require('express-handlebars');

var app = express();

app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// for parsing encoded data (typically for POSTs)
app.use(require('body-parser').urlencoded({extended: true}));
app.use(require('body-parser').json());

// blocks header info about Node technology
app.disable('x-powered-by');
app.set('port', process.env.PORT || 5000);
app.use('/', express.static(__dirname + '/public'));

// routes
app.use('/', require('./routes/routes'));

// for localhost
app.listen(app.get('port'), function() {
    console.log("listening on port " + app.get('port'));
});

// for the use of the routes folder
module.exports = app;