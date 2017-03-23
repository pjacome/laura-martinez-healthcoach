var db = require('../../db');
var ObjectID = require('mongodb').ObjectID;
module.exports.obj_Photos = {};

module.exports.POST = function(req, res) {
    console.log('req.files:', req.files);
    res.sendStatus(200);
}