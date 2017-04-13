'use strict';

/* blogs controller */
var db = require('../../db');
var ObjectID = require('mongodb').ObjectID;
module.exports.obj_Blogs = {};

module.exports.POST = function(req, res) {
    // TODO: validation
    console.log(req.body);
    var newBlog = req.body;
    db.client.collection('blogs').insertOne(newBlog, function(err, result) {
        if(err) {
            console.err(err);
            res.sendStatus(400);
        } else if(result) {
            res.sendStatus(200);
        } else {
            res.sendStatus(500);
        }
    });
};

module.exports.GET = function(req, res) {
    res.sendStatus(400);
};

module.exports.PUT = function(req, res) {
    res.sendStatus(400);
};

module.exports.DELETE = function(req, res) {
    res.sendStatus(400);
};