'use strict';

var express = require('express');
var router  = express.Router();

/* Language = English - Routes */

router.get('/', function(req, res) {
    res.render('blog');
});

router.get('/about', function(req, res) {
    res.render('about');
});

<<<<<<< HEAD
=======
router.get('/recipes', function(req, res) {
    res.render('recipes');
});

/////////////////// recipes ////////////////////

router.get('/recipes/breakfast', function(req, res) {
    res.render('comingsoon');
});

router.get('/recipes/entrees', function (req, res) {
    res.render('comingsoon');
});

router.get('/recipes/desserts', function (req, res) {
    res.render('comingsoon');
});

router.get('/recipes/drinks', function (req, res) {
    res.render('comingsoon');
});

router.get('/recipes/snacks', function (req, res) {
    res.render('comingsoon');
});

router.get('/recipes/salads', function (req, res) {
    res.render('comingsoon');
});

//////////////////// end ///////////////////////

router.get('/healthcoaching', function(req, res) {
    res.render('healthcoaching');
});

router.get('/forms', function(req, res) {
    res.render('forms');
});

router.get('/forms/revisit', function (req, res) {
    res.render('comingsoon');
});

router.get('/forms/women', function(req, res) {
    res.render('women');
});

router.get('/forms/men', function (req, res) {
    res.render('comingsoon');
});

/////////////////// forms //////////////////////

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

//////////////////// end ///////////////////////

router.get('/events', function(req, res) {
    //res.render('events', {layout: 'events.handlebars'});
    res.render('events');
});

>>>>>>> fontend
router.get('/blog', function(req, res) {
    res.render('blog');
});

<<<<<<< HEAD
=======
router.get('/contact', function(req, res) {
    res.render('contact');
});

/////////////////// admin //////////////////////

router.get('/admin/login', function (req, res) {
    res.render('alogin');
});

router.get('/admin/dashboard', function (req, res) {
    res.render('adash');
});

router.get('/admin/blog', function (req, res) {
    res.render('ablog');
});

    router.get('/admin/blog/add', function (req, res) {
        res.render('ablogadd');
    });

    router.get('/admin/blog/edit', function (req, res) {
        res.render('ablogedit');
    });

        router.get('/admin/blog/edit/exedit', function (req, res) {
            res.render('exedit');
        });

router.get('/admin/events', function (req, res) {
    res.render('aevents');
});

router.get('/admin/forms', function (req, res) {
    res.render('aforms');
});

router.get('/admin/recipes', function (req, res) {
    res.render('arecipes');
});


//////////////////// end ///////////////////////

/* Idioma = Espanol - Rutas */

router.get('/forms/mujeres', function (req, res) {
    res.render('mujeres');
});

>>>>>>> fontend
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