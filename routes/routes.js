'use strict';

var express = require('express');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var obj_Recipes = require('./controllers/recipes');
var obj_Contact = require('./controllers/contacts');
var obj_Photos = require('./controllers/photos');
var obj_Blogs = require('./controllers/blogs');
var obj_Admin = require('./controllers/admin');
var router = express.Router();

/* Language = English - Routes */

// ###########################################################################
// The following endpoints merely render the templates but are not responsible
// for the data displayed on the pages
// ###########################################################################

// use '/' route to see what default language the client prefers
// or read into displying the proper partial
//router.get('/', function (req, res) {res.render('home');});
router.get('/', function(req, res) {res.redirect('en/home');});
router.get('/en', function (req, res) {res.redirect('en/home');});
router.get('/home', function(req, res) {res.redirect('en/home');});
router.get('/en/home', function(req, res) {console.log(req.session);res.render('en/home');});
router.get('/en/about', function(req, res) {res.render('en/about');});
router.get('/en/recipes', function(req, res) {res.render('en/recipes/recipes');});
router.get('/en/healthcoaching', function(req, res) {res.render('en/healthcoaching');});
router.get('/en/events', function(req, res) {res.render('en/events');});
//router.get('/en/blogs', function(req, res) {res.render('en/blogs');});
router.get('/en/contact', function(req, res) {res.render('en/contact');});


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
var IsLoggedIn = function(req, res, next) {
    if(req.session.isAuthenticated)
        res.redirect('/en/admin/dashboard');
    else
        next();
};
var Authenticate = function(req, res, next) {
    if (!req.session) {
        console.log('b:',req.session);
        console.log('>>> You are not authenticated. Returning to login page <<<');
        res.redirect('/en/admin/login');
    } else if (req.session.isAuthenticated) {
        console.log('2');
        next();
    } else {
        console.log('3');
        res.redirect('/en/admin/login');
    }
};

// login route
router.post('/login', obj_Admin.POST);
router.post('/logout', obj_Admin.ENDSESSION);
router.post('/en/admin/create', obj_Admin.CREATE);
router.post('/en/admin/exists', obj_Admin.CHECK_IF_ADMIN_EXISTS);
// TODO: login route (below) requires a special layout
router.get('/en/admin/login', IsLoggedIn, function(req, res) {res.render('en/admin/login', {layout: 'admin-forms.handlebars'});});
router.get('/en/admin/create', function(req, res) {res.render('en/admin/create', {layout: 'admin-forms.handlebars'});});
router.get('/en/admin', function(req, res) {res.redirect('admin/login');});
router.get('/en/admin/:dashboard', Authenticate, obj_Admin.GET);
router.get('/en/admin/:dashboard/:operation', Authenticate, obj_Admin.GET);

// ###########################################################################
// The following endpoints manipulate data and are responsible for CRUD
// operations - including getting the data for viewing on client-side
// ###########################################################################

/////////////////// recipes ////////////////////
//TODO - a 'search result' page
router.get('/en/recipes/search', function (req, res) { res.render('en/comingsoon'); });

//recipes
router.get('/en/recipes/:category', obj_Recipes.GET);
router.get('/en/recipes/:category/:id', obj_Recipes.GET);
router.post  ('/admin/recipes', Authenticate, obj_Recipes.POST);
router.put   ('/admin/recipes', Authenticate, obj_Recipes.PUT);
router.delete('/admin/recipes', Authenticate, obj_Recipes.DELETE);

//blogs
router.get   ('/en/blogs',     obj_Blogs.GET);
router.get   ('/en/blogs/:id', obj_Blogs.GET);
router.post  ('/admin/blogs', Authenticate, obj_Blogs.POST);
router.put   ('/admin/blogs', Authenticate, obj_Blogs.PUT);
router.delete('/admin/blogs', Authenticate, obj_Blogs.DELETE);

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

// file upload
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, __dirname + '/../public/images/uploads');
    },
    filename: function (req, file, cb) {
        var ext = file.originalname.split('.');
        var name = ext[0];
        ext = ext[ext.length - 1];
        cb(null, file.originalname);
    },
});
var upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb) {
        var ext = file.originalname.split('.');
        ext = ext[ext.length - 1];
        var mime = file.mimetype;
        console.log('ext', ext);
        if(!mime.match(/image\/(png|jpe?g|gif|tiff|PNG|JPE?G|GIF|TIFF)$/i))
            cb(null, false);
        if (!ext.match(/(png|jpe?g|gif|tiff|PNG|JPE?G|GIF|TIFF)$/))
            cb(null, false);

        cb(null, true);
    }
});
var photos = upload.array('photos[]', 12);
router.post  ('/admin/photos/upload', Authenticate, photos, obj_Photos.POST);
router.delete('/admin/photos', Authenticate, obj_Photos.DELETE);

// contact via email
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