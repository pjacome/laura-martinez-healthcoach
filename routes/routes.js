'use strict';

var express = require('express');
var router  = express.Router();

router.get('/', function(req, res) {
    res.render('events');
});

/*
    Catch 400 Errors
*/

router.use(function(req, res) {
    console.log("Looking for URL: '" + req.url + "'");
    res.type('text/html');
    res.status(404);
    res.render('404');
});

/*
    Catch 500 Errors
*/

router.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

module.exports = router;