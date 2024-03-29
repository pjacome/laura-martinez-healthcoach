'use strict';

var express = require('express');
var router  = express.Router();
var obj_Recipes = require('./controllers/recipes');
var obj_Contact = require('./controllers/contacts');

/* Language = English - Routes */

// ###########################################################################
// The following endpoints merely render the templates but are not responsible
// for the data displayed on the pages
// ###########################################################################

// use '/' route to see what default language the client prefers
// or read into displying the proper partial
//router.get('/', function (req, res) {res.render('home');});
router.get('/', function(req, res) {res.redirect('en/home');});
router.get('/en', function (req, res) { res.redirect('en/home'); });
router.get('/home', function(req, res) {res.redirect('en/home');});
router.get('/en/home', function(req, res) {res.render('en/home');});
router.get('/en/about', function(req, res) {res.render('en/about');});
router.get('/en/recipes', function(req, res) {res.render('en/recipes/recipes');});
router.get('/en/healthcoaching', function(req, res) {res.render('en/healthcoaching');});
router.get('/en/events', function(req, res) {res.render('en/events');});
router.get('/en/blog', function(req, res) {res.render('en/blog');});
router.get('/en/contact', function(req, res) {res.render('en/contact');});



/////////////////// recipes ////////////////////
router.get('/en/recipes/search', function(req, res) {res.render('en/comingsoon');});
router.get('/en/recipes/:category', obj_Recipes.GET);
router.get('/en/recipes/:category/:id', obj_Recipes.GET);
router.post('/en/recipes/create', obj_Recipes.POST);



/////////////////// forms //////////////////////
router.get('/en/forms', function(req, res) {res.render('en/forms/forms');});
router.get('/en/forms/revisit', function(req, res) {res.render('en/comingsoon');});

router.get('/en/forms/women', function(req, res) {res.render('en/forms/women/women');});
router.get('/en/forms/women/page1', function(req, res) {res.render('en/forms/women/p1', {layout: 'formpages.handlebars'});});
router.get('/en/forms/women/page2', function(req, res) {res.render('en/forms/women/p2', {layout: 'formpages.handlebars'});});
router.get('/en/forms/women/page3', function(req, res) {res.render('en/forms/women/p3', {layout: 'formpages.handlebars'});});
router.get('/en/forms/women/page4', function(req, res) {res.render('en/forms/women/p4', {layout: 'formpages.handlebars'});});
router.get('/en/forms/women/page5', function(req, res) {res.render('en/forms/women/p5', {layout: 'formpages.handlebars'});});
router.get('/en/forms/women/page6', function(req, res) {res.render('en/forms/women/p6', {layout: 'formpages.handlebars'});});
router.get('/en/forms/women/page7', function(req, res) {res.render('en/forms/women/p7', {layout: 'formpages.handlebars'});});


// '/forms/men' is just a placeholder endpoint. first page starts at p1
// -> same applies for the '/women' routes
router.get('/en/forms/men', function(req, res) {res.render('en/comingsoon');});
router.get('/en/forms/p1', function(req, res) {res.render('en/forms/forms-p1');});
router.get('/en/forms/p2', function(req, res) {res.render('en/forms/forms-p2');});
router.get('/en/forms/p3', function(req, res) {res.render('en/forms/forms-p3');});
router.get('/en/forms/p4', function(req, res) {res.render('en/forms/forms-p4');});
router.get('/en/forms/p5', function(req, res) {res.render('en/forms/forms-p5');});
router.get('/en/forms/p6', function(req, res) {res.render('en/forms/forms-p6');});
router.get('/en/forms/p7', function(req, res) {res.render('en/forms/forms-p7');});

/////////////////// admin //////////////////////
router.get('/en/admin/login', function(req, res) {res.render('en/admin/alogin');});
router.get('/en/admin/dashboard', function(req, res) {res.render('en/admin/adash');});
router.get('/en/admin/blog', function(req, res) {res.render('en/admin/ablog');});
    router.get('/en/admin/blog/add', function(req, res) {res.render('en/admin/ablogadd');});
    router.get('/en/admin/blog/edit', function(req, res) {res.render('en/admin/ablogedit');});
        router.get('/en/admin/blog/edit/exedit', function(req, res) {res.render('en/admin/exedit');});

router.get('/en/admin/events', function(req, res) {res.render('en/admin/aevents');});
router.get('/en/admin/forms', function(req, res) {res.render('en/admin/aforms');});
router.get('/en/admin/recipes', function(req, res) {res.render('en/admin/arecipes');});

// ###########################################################################
// The following endpoints manipulate data and are responsible for CRUD
// operations - including getting the data for viewing on client-side
// ###########################################################################

//blog
// router.get ('/en/blog/read/all', obj_Blog.GET);
// router.post('/en/blog/create', obj_Blog.POST);
// router.put ('/en/blog/edit/?:id, obj_Blog.PUT);
// router.delete('/en/blog/edit/?:id, obj_Blog.DELETE);

//recipes
//router.get   ('/en/recipes/read/all', obj_Recipes.GET);
//router.post  ('/en/recipes/create',   obj_Recipes.POST);
//router.put   ('/en/recipes/edit/?:id', obj_Recipes.PUT);
//router.delete('/en/recipes/edit/?:id', obj_Recipes.DELETE);

//forms
// router.get   ('/en/read/all', obj_Forms.GET);
// router.post  ('/en/create',   obj_Forms.POST);
// router.put   ('/en/edit/?:id, obj_Forms.PUT);
// router.delete('/en/edit/?:id, obj_Forms.DELETE);

//events
// router.get   ('/en/read/all', obj_Events.GET);
// router.post  ('/en/create',   obj_Events.POST);
// router.put   ('/en/edit/?:id, obj_Events.PUT);
// router.delete('/en/edit/?:id, obj_Events.DELETE);

router.post('/en/contact/send', obj_Contact.POST);

/* Idioma = Espanol - Rutas */

router.get('/formas/mujeres', function(req, res) {
    res.render('es/mujeres');
});

















/*
    Catch 400 Errors
*/

router.use(function(req, res) {
    console.log("\nLooking for URL: '" + req.url + "'");
    res.type('text/html');
    res.status(404);
    res.render('en/400');
});

/*
    Catch 500 Errors
*/

router.use(function(err, req, res, next) {
    console.log('\nTried to access ' + req.url);
    console.error(err.stack);
    res.status(500);
    res.render('en/500');
});

module.exports = router;