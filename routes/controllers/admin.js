'use strict'

/* admin crud routes */
var db = require('../../db');
var ObjectID = require('mongodb').ObjectID;
module.exports.obj_Admin = {};

// login route
module.exports.POST = function(req, res) {
    var email = req.body.email,
        password = req.body.password,
        remember = req.body.remember;
    if(email === 'p@p.c' && password === 'pj') {
        req.session.isAuthenticated = true;
        console.log('>>> You have now been Authenticated. <<<\n', req.session);
        res.redirect('en/admin/dashboard');
    } else {
        console.log(email, ' |', password, ' |', remember);
        if(req.session.isAuthenticated) req.session.isAuthenticated = false;
        console.log('isAuth:', req.session.isAuthenticated);
        res.sendStatus(404);
    }
}