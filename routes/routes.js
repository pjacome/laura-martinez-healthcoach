'use strict';

var express = require('express');
var router  = express.Router();

/* Language = English - Routes */

router.get('/', function(req, res) {
    res.render('home');
});

router.get('/home', function(req, res) {
    res.render('home');
});

router.get('/home-test', function(req, res) {
    res.render('home-test');
});

router.get('/about', function(req, res) {
    res.render('about');
});

router.get('/recipes', function(req, res) {
    res.render('recipes');
});

router.get('/healthcoaching', function(req, res) {
    res.render('healthcoaching');
});

router.get('/forms', function(req, res) {
    res.render('forms');
});

/////////////////////////////////////////////////

router.get('/forms/p1', function(req, res) {
    res.render('forms-p1');
});

router.get('/forms/p2', function(req, res) {
    res.render('forms-p2');
});

router.get('/forms/p3', function(req, res) {
    res.render('forms-p3');
});

router.get('/forms/p4', function(req, res) {
    res.render('forms-p4');
});

router.get('/forms/p5', function(req, res) {
    res.render('forms-p5');
});

router.get('/forms/p6', function(req, res) {
    res.render('forms-p6');
});

router.get('/forms/p7', function(req, res) {
    res.render('forms-p7');
});

/////////////////////////////////////////////////

router.get('/events', function(req, res) {
    res.render('events');
});

router.get('/blog', function(req, res) {
    res.render('blog');
});

router.get('/contact', function(req, res) {
    res.render('contact');
});

/* Idioma = Espanol - Rutas */

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