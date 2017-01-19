/* controller class for recipes */
var db = require('../../db');
var ObjectID = require('mongodb').ObjectID;
module.exports.obj_Recipes = {};

module.exports.POST = function(req, res) {
    var newRecipe = req.body;
    db.client.collection('recipes').insertOne(newRecipe, function(err, result) {
        if(err) {
            console.log(err);
            res.sendStatus(400);
        } else {
            console.log(result);
            res.sendStatus(200);
        }
    });
}

module.exports.GET = function(category, id) {
    if(category && id) {
        var obj_ID = new ObjectID(id);
        console.log('returning recipe based on: ' + category + ' and _id: ' + obj_ID);
        db.client.collection('recipes').find({'category': category, '_id': obj_ID}).toArray(function(err, docs) {
            console.log(docs);
            return docs;
        });
    } else if(category) {
        // return all
        console.log('returning recipes based on: ' + category);
        db.client.collection('recipes').find({'category': category}).toArray(function(err, docs) {
            console.log(docs);
            return docs;
        });
    }
}

module.exports.PUT = function(req, res) {
}

module.exports.DELETE = function(req, res) {
}