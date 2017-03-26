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
    console.log(email, ' |', password, ' |', remember);
    res.sendStatus(200);
}