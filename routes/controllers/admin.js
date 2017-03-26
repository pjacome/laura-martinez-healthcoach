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
    if(email === 'p@p.com' && password === 'pj') {
        req.session.isAuthenticated = true;
        console.log('a', req.session);
        res.sendStatus(200);
    } else {
        console.log(email, ' |', password, ' |', remember);
        res.sendStatus(404);
    }
}