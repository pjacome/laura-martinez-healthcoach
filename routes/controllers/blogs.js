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
    // TODO: validation
    var id = req.params.id;
    if(id) {
        var objID = new ObjectID(id);
        db.client.collection('blogs').find({_id: objID}).toArray(function(err, docs) {
            if (err) {
                console.error(err);
                res.sendStatus(400);
            } else {
                console.log('requesting ALL blogs');
                console.log('Found 1 item:', docs[0]);
                docs = docs[0];
                var options = {
                    title: docs.title,
                    subheading: docs.subheading,
                    date: docs.date,
                    sections: docs.sections
                };
                res.render('en/blogs/blogitem', options);
            }
        });
    } else {
        db.client.collection('blogs').find({}).toArray(function(err, docs) {
            if (err) {
                console.error(err);
                res.sendStatus(400);
            } else {
                console.log('requesting ALL blogs');
                console.log(docs);
                var options = { blogResult: docs };
                res.render('en/blogs/list2', options);
            }
        });
    }
};

module.exports.PUT = function(req, res) {
    // TODO: validation
    res.sendStatus(400);
};

module.exports.DELETE = function(req, res) {
    // TODO: validation
    res.sendStatus(400);
};

module.exports.SEARCH = function(callback) {
    db.client.collection('blogs').find({}, function(err, cursor) {
        if(err) {
            console.log(err);
            return;
        }
        cursor.toArray(function(err, docs) {
            if (err) {
                console.log('Error converting cursor to Array', err);
                return;
            }
            callback(docs);
        });
    });
};

module.exports.SEARCH_BY_ID = function(id, callback) {
    var obj_ID = new ObjectID(id);
    db.client.collection('blogs').find({'_id': obj_ID}, function(err, cursor) {
        if(err) {
            console.log('Error searching for ID', err);
            return;
        }
        cursor.toArray(function(err, doc) {
            if(err) {
                console.log('Error converting cursor to Array', err);
                return;
            }
            callback(doc);
        });
    });
};