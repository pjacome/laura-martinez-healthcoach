'use strict';

/* blogs controller */
var db = require('../../db');
var ObjectID = require('mongodb').ObjectID;
module.exports.obj_Blogs = {};

module.exports.POST = function(req, res) {
    console.log(req.body);
    res.sendStatus(400);
};

module.exports.GET = function (req, res) {
    res.sendStatus(400);
};

module.exports.PUT = function (req, res) {
    res.sendStatus(400);
};

module.exports.DELETE = function(req, res) {
    res.sendStatus(400);
};