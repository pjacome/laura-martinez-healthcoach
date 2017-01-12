'use strict';

var express = require('express');
var router  = express.Router();

/* Language = English - Routes */

router.get('/', function (req, res) {
    // use this route to see what default language the client prefers
    // or read into displying the proper partial
    res.render('home');
});

router.get('/home', function(req, res) {
    res.render('en/home');
});

router.get('/about', function(req, res) {
    res.render('en/about');
});

router.get('/recipes', function(req, res) {
    res.render('en/recipes/recipes');
});

/////////////////// recipes ////////////////////

router.get('/recipes/breakfast', function(req, res) {
    res.render('en/comingsoon');
});

router.get('/recipes/entrees', function (req, res) {
    res.render('en/comingsoon');
});

router.get('/recipes/desserts', function (req, res) {
    res.render('en/comingsoon');
});

router.get('/recipes/drinks', function (req, res) {
    res.render('en/comingsoon');
});

router.get('/recipes/snacks', function (req, res) {
    res.render('en/comingsoon');
});

router.get('/recipes/salads', function (req, res) {
    res.render('en/comingsoon');
});

//////////////////// end ///////////////////////

router.get('/healthcoaching', function(req, res) {
    res.render('en/healthcoaching');
});

router.get('/forms', function(req, res) {
    res.render('en/forms/forms');
});

router.get('/forms/revisit', function (req, res) {
    res.render('en/comingsoon');
});

router.get('/forms/women', function(req, res) {
    res.render('en/women');
});

router.get('/forms/men', function (req, res) {
    res.render('en/comingsoon');
});

/////////////////// forms //////////////////////

router.get('/forms/p1', function(req, res) {
    res.render('en/forms/forms-p1');
});

router.get('/forms/p2', function(req, res) {
    res.render('en/forms/forms-p2');
});

router.get('/forms/p3', function(req, res) {
    res.render('en/forms/forms-p3');
});

router.get('/forms/p4', function(req, res) {
    res.render('en/forms/forms-p4');
});

router.get('/forms/p5', function(req, res) {
    res.render('en/forms/forms-p5');
});

router.get('/forms/p6', function(req, res) {
    res.render('en/forms/forms-p6');
});

router.get('/forms/p7', function(req, res) {
    res.render('en/forms/forms-p7');
});

//////////////////// end ///////////////////////

router.get('/events', function(req, res) {
    res.render('en/events');
});

router.get('/blog', function(req, res) {
    res.render('en/blog');
});

router.get('/contact', function(req, res) {
    res.render('en/contact');
});

/////////////////// admin //////////////////////

router.get('/admin/login', function (req, res) {
    res.render('en/admin/alogin');
});

router.get('/admin/dashboard', function (req, res) {
    res.render('en/admin/adash');
});

router.get('/admin/blog', function (req, res) {
    res.render('en/admin/ablog');
});

    router.get('/admin/blog/add', function (req, res) {
        res.render('en/admin/ablogadd');
    });

    router.get('/admin/blog/edit', function (req, res) {
        res.render('en/admin/ablogedit');
    });

        router.get('/admin/blog/edit/exedit', function (req, res) {
            res.render('en/admin/exedit');
        });

router.get('/admin/events', function (req, res) {
    res.render('en/admin/aevents');
});

router.get('/admin/forms', function (req, res) {
    res.render('en/admin/aforms');
});

router.get('/admin/recipes', function (req, res) {
    res.render('en/admin/arecipes');
});


//////////////////// end ///////////////////////

/* Idioma = Espanol - Rutas */

router.get('/forms/mujeres', function (req, res) {
    res.render('es/mujeres');
});

/*
    Catch 400 Errors
*/

router.use(function(req, res) {
    console.log("\nLooking for URL: '" + req.url + "'");
    res.type('text/html');
    res.status(404);
    res.render('404');
});

/*
    Catch 500 Errors
*/

router.use(function(err, req, res, next) {
    console.log('\nTried to access ' + req.url);
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

module.exports = router;