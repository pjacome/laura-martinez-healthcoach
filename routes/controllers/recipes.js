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
        } else if(result) {
            res.sendStatus(200);
        } else {
            res.sendStatus(500);
        }
    });
};

module.exports.GET = function(req, res) {
    var category = req.params.category;
    var id = req.params.id;
    // validate the query parameters before making any database calls
    if(category && id) {
        var obj_ID = new ObjectID(id);
        console.log('returning recipe based on: ' + category + ' and _id: ' + obj_ID);
        db.client.collection('recipes').find({'category': category, '_id': obj_ID}).toArray(function(err, docs) {
            if(docs.length === 0) {
                res.render('en/400');
            } else {
                console.log(docs);
                docs = docs[0];
                var options = {
                    title: docs.title,
                    ingredients: docs.ingredients,
                    description: docs.description,
                    additionalNotes: docs.additionalNotes,
                    images: docs.imageURLs
                };
                res.render('en/recipes/recipeitem', options);
            }
        });
    } else if(category) {
        // return all under the same category
        console.log('returning recipes based on: ' + category);
        db.client.collection('recipes').find({'category': category}).toArray(function(err, docs) {
            console.log(docs);
            var categoryCapitalized = category.charAt(0).toUpperCase() + category.slice(1);
            var options = {
                layout: 'recipepages.handlebars',
                categoryTitle: 'Breakfast',
                recipeResult: docs
            };
            res.render('en/recipes/list', options);
        });
    } else {
        res.render(400);
    }
};

module.exports.PUT = function(req, res) {
    // TODO: needs validation
    console.log('>>> Updating ' + req.query.id + '... ');
    var id = req.query.id;
    var obj_ID = new ObjectID(id);
    var filter = {_id: {$eq: obj_ID}};
    var update = req.body;
    var options = {upsert: false};
    db.client.collection('recipes').updateOne(filter, update, options, function(err, result) {
        if(err) {
            console.log('>>> Error updating ' + id + ' <<<', err);
            res.sendStatus(500);
        } else {
            console.log('>>> Successfully updated ' + id + ' <<<');
            res.sendStatus(200);
        }
    });
};

module.exports.DELETE = function(req, res) {
    if(req.query.deleteMultiple === 'true') {
        DeleteMultiple(req, res);
    } else {
        DeleteSingle(req, res);
    }
};

module.exports.SEARCH = function(callback) {
    db.client.collection('recipes').find({}, function(err, cursor) {
        if(err) { 
            console.log(err);
            return;
        }
        cursor.toArray(function(err, docs) {
            if(err) {
                console.log('Error converting cursor to Array', err);
                return;
            }
            callback(docs);
        });
    });
};

module.exports.SEARCH_BY_ID = function(id, callback) {
    var obj_ID = new ObjectID(id);
    db.client.collection('recipes').find({'_id': obj_ID}, function(err, cursor) {
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

function DeleteSingle(req, res) {
    // TODO: needs validation
    var id = req.query.id;
    var obj_ID = new ObjectID(id);
    console.log('>>> Deleting recipe #' + id);
    db.client.collection('recipes').remove({_id: { $eq: obj_ID }}, function(err, result) {
        if(err) {
            console.log('>>> Error. Unable to delete item. <<<', err);
            res.sendStatus(500);
        }
        else {
            console.log('>>> Item #' + id + ' deleted. <<<');
            res.sendStatus(200);
        }
    });
}

function DeleteMultiple(req, res) {
    return;
}
