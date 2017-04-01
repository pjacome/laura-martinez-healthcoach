﻿'use strict'

/* admin crud routes */
var db = require('../../db');
var ObjectID = require('mongodb').ObjectID;
var obj_Recipes = require('./recipes');
module.exports.obj_Admin = {};

// login route
module.exports.POST = function(req, res) {
    var email = req.body.email,
        password = req.body.password,
        remember = req.body.remember;
    if(email === 'p@p.c' && password === 'pj') {
        console.log('>>> Authenticating ...');
        req.session.isAuthenticated = true;
        console.log('>>> You have now been Authenticated. <<<\n', req.session);
        console.log('>>> Redirecting ...');
        res.status(302).redirect('/en/admin/dashboard');
    } else {
        console.log('>>> Incorrect credentials. Authentication denied. <<<');
        console.log(email, ' |', password, ' |', remember);
        //if(req.session.isAuthenticated) req.session.isAuthenticated = false;
        console.log('isAuth:', req.session.isAuthenticated);
        res.sendStatus(404);
    }
}

// logout route
module.exports.ENDSESSION = function(req, res) {
    if(!req.session) {
        console.log('>>> Session does not exist. <<<');
        res.sendStatus(404);
    } else if(!req.session.isAuthenticated) {
        console.log('>>> Never authenticated. Proceed to login papge. <<<');
        req.session.isAuthenticated = false;
        res.sendStatus(404);
    } else if(req.session.isAuthenticated) {
        console.log('>>> Logging out ...');
        req.session.isAuthenticated = false;
        console.log('>>> Returning to login page ...');
        res.sendStatus(200);
    }
};

// displays [/dashboard, /blogs, /events, /forms, /recipes]
module.exports.GET = function(req, res) {
    var route = req.params.dashboard;
    var routes = /(dashboard|blogs|events|forms|recipes)/;
    if(!route.match(routes)) {
        console.log('>>> Incorrect URL: \''+route+'\' <<<');
        res.sendStaus(500);
    } else {
        if(route.match(/dashboard/)) {
            console.log('>>> Displaying Admin Dashboard ... ');
            res.render('en/admin/dashboard', {layout: 'admin-main.handlebars'});
        } else {
            console.log('>>> Displaying Dashboard ' + route);
            var options = {
                layout: 'admin-main.handlebars',
                category: route
            };
            // make db call to populate 'options' with data to render on client
            switch(route) {
                case 'blogs':
                    // TODO
                    // obj_Blogs.SEARCH(function(docs) {
                    //     options.data = docs;
                    //     res.render();
                    //});
                    res.render('en/admin/admin-dashboards', options);
                    break;
                case 'events':
                    res.render('en/admin/admin-dashboards', options);
                    break;
                case 'forms':
                    res.render('en/admin/admin-dashboards', options);
                    break;
                case 'recipes':
                    obj_Recipes.SEARCH(function(docs) {
                        options.data = docs;
                        res.render('en/admin/admin-dashboards', options);
                    });
                    break;
                default:
                    break;
            }
        }
    }
};