'use strict';

var express = require('express');
var router  = express.Router();

/* Language = English - Routes */

// ###########################################################################
// The following endpoints merely render the templates but are not responsible
// for the data displayed on the pages
// ###########################################################################

// use '/' route to see what default language the client prefers
// or read into displying the proper partial
//router.get('/', function (req, res) {res.render('home');});
router.get('/', function (req, res) { res.redirect('en/home');});
router.get('/home', function (req, res) { res.redirect('en/home'); });
router.get('/en/home', function(req, res) {res.render('en/home');});
router.get('/en/about', function(req, res) {res.render('en/about');});
router.get('/en/recipes', function(req, res) {res.render('en/recipes/recipes');});
router.get('/healthcoaching', function (req, res) { res.render('en/healthcoaching'); });
router.get('/events', function (req, res) { res.render('en/events'); });
router.get('/blog', function (req, res) { res.render('en/blog'); });
router.get('/contact', function (req, res) { res.render('en/contact'); });

/////////////////// recipes ////////////////////
router.get('/recipes/breakfast', function(req, res) {res.render('en/comingsoon');});
router.get('/recipes/entrees', function (req, res) {res.render('en/comingsoon');});
router.get('/recipes/desserts', function (req, res) {res.render('en/comingsoon');});
router.get('/recipes/drinks', function (req, res) {res.render('en/comingsoon');});
router.get('/recipes/snacks', function (req, res) {res.render('en/comingsoon');});
router.get('/recipes/salads', function (req, res) { res.render('en/comingsoon'); });

/////////////////// forms //////////////////////
router.get('/forms', function (req, res) { res.render('en/forms/forms'); });
router.get('/forms/revisit', function (req, res) { res.render('en/comingsoon'); });

router.get('/forms/women', function (req, res) { res.render('en/women'); });
/*
router.get('/forms/women/page1', function(req, res) {res.render('en/forms/women/p1');});
router.get('/forms/women/page2', function(req, res) {res.render('en/forms/women/p2');});
router.get('/forms/women/page3', function(req, res) {res.render('en/forms/women/p3');});
router.get('/forms/women/page4', function(req, res) {res.render('en/forms/women/p4');});
router.get('/forms/women/page5', function(req, res) {res.render('en/forms/women/p5');});
router.get('/forms/women/page6', function(req, res) {res.render('en/forms/women/p6');});
router.get('/forms/women/page7', function(req, res) {res.render('en/forms/women/p7');});
*/

// '/forms/men' is just a placeholder endpoint. first page starts at p1
router.get('/forms/men', function (req, res) { res.render('en/comingsoon'); });
router.get('/forms/p1', function(req, res) {res.render('en/forms/forms-p1');});
router.get('/forms/p2', function(req, res) {res.render('en/forms/forms-p2');});
router.get('/forms/p3', function(req, res) {res.render('en/forms/forms-p3');});
router.get('/forms/p4', function(req, res) {res.render('en/forms/forms-p4');});
router.get('/forms/p5', function(req, res) {res.render('en/forms/forms-p5');});
router.get('/forms/p6', function(req, res) {res.render('en/forms/forms-p6');});
router.get('/forms/p7', function(req, res) {res.render('en/forms/forms-p7');});

/////////////////// admin //////////////////////
router.get('/admin/login', function (req, res) {res.render('en/admin/alogin');});
router.get('/admin/dashboard', function (req, res) {res.render('en/admin/adash');});
router.get('/admin/blog', function (req, res) {res.render('en/admin/ablog');});
    router.get('/admin/blog/add', function (req, res) {res.render('en/admin/ablogadd');});
    router.get('/admin/blog/edit', function (req, res) {res.render('en/admin/ablogedit');});
        router.get('/admin/blog/edit/exedit', function (req, res) {res.render('en/admin/exedit');});

router.get('/admin/events', function (req, res) {res.render('en/admin/aevents');});
router.get('/admin/forms', function (req, res) {res.render('en/admin/aforms');});
router.get('/admin/recipes', function (req, res) {res.render('en/admin/arecipes');});

// ###########################################################################
// The following endpoints manipulate data and are responsible for CRUD
// operations - including getting the data for viewing on client-side
// ###########################################################################

//blog
// router.get ('/blog/read/all', obj_Blog.GET);
// router.post('/blog/create', obj_Blog.POST);
// router.put ('/blog/edit/?:id, obj_Blog.PUT);
// router.delete('/blog/edit/?:id, obj_Blog.DELETE);

//recipes
// router.get ('/recipes/read/all', obj_Recipes.GET);
// router.post('/recipes/create', obj_Recipes.POST);
// router.put ('/recipes/edit/?:id, obj_Recipes.PUT);
// router.delete('/recipes/edit/?:id, obj_Recipes.DELETE);

//forms
// router.get ('//read/all', obj_.GET);
// router.post('//create', obj_.POST);
// router.put ('//edit/?:id, obj_.PUT);
// router.delete('//edit/?:id, obj_.DELETE);

//events
// router.get ('//read/all', obj_.GET);
// router.post('//create', obj_.POST);
// router.put ('//edit/?:id, obj_.PUT);
// router.delete('//edit/?:id, obj_.DELETE);



/* Idioma = Espanol - Rutas */

router.get('/formas/mujeres', function (req, res) {
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