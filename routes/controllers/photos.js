'use strict';

var fs = require('fs');
var db = require('../../db');
var ObjectID = require('mongodb').ObjectID;
module.exports.obj_Photos = {};

module.exports.POST = function(req, res) {
    // most of the validation happens in routes.js
    console.log('req.files:', req.files);
    console.log('req.body:', req.body);
    res.sendStatus(200);
};

module.exports.DELETE = function(req, res) {
    var filename = req.query.name;
    var path = 'public/images/uploads/' + filename;
    fs.unlink(path, function(err) {
        if(err) {
            console.log('>>>Error. Could not delete ' + filename + ' <<<', err.stack);
            res.status(400).send(filename);
        } else {
            console.log('Successfully deleted ' + filename + ' <<<');
            res.status(200).send(filename);
        }
    });
};