'use strict'

/* admin crud routes */
var bcrypt = require('bcrypt');
var db = require('../../db');
var ObjectID = require('mongodb').ObjectID;
var obj_Recipes = require('./recipes');
module.exports.obj_Admin = {};

// create admin account
module.exports.CREATE = function (req, res) {
    CheckSizeOfAdminCollection(req, res, function() {
        const saltRounds = 10;
        const plaintextPassword = req.body.password;
        bcrypt.hash(plaintextPassword, saltRounds, function(err, hash) {
            var newAdmin = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hash
            };

            db.client.collection('admin').find({email: newAdmin.email}).toArray(function(err, docs) {
                if(err) {
                    console.log('Error while looking up admin with email \'' + newAdmin.email + '\'');
                    res.sendStatus(500);
                } else if(docs.length > 0) {
                    // email already exists. must choose new email
                    res.status(200).send('Email already in use');
                } else {
                    // create new admin account
                    db.client.collection('admin').insertOne(newAdmin, function(err, result) {
                        if (err) {
                            console.log('error creating new admin');
                            console.log(err);
                            res.sendStatus(500);
                        } else {
                            console.log('success. new admin created.');
                            res.sendStatus(200);
                        }
                    });
                }
            });
        });
    });
};

// check if admin account exists already
module.exports.CHECK_IF_ADMIN_EXISTS = function(req, res) {
    CheckSizeOfAdminCollection(req, res, function() {});
};

// login route
module.exports.POST = function(req, res) {
    var email = req.body.email,
        password = req.body.password,
        remember = req.body.remember;

    db.client.collection('admin').findOne({email: email}, function(err, document) {
        if(err) {
            console.log('error searching for admin in database', err);
            res.sendStatus(500);
        } else if(!document) {
            console.log('no admin found by the email name of \''+email+'\' in database:', document);
            res.sendStatus(404);
        } else {
            const hash = document.password;
            bcrypt.compare(password, hash, function(err, result) {
                console.log('result =', result);
                if (result) {
                    req.session.isAuthenticated = true;
                    res.sendStatus(200);
                    // redirect happens on client-side
                } else {
                    console.log('>>> Incorrect credentials. Authentication denied. <<<');
                    console.log(email, ' |', password, ' |', remember);
                    console.log('isAuth:', req.session.isAuthenticated);
                    res.sendStatus(404);
                }
            });
        }
    });
}

// logout route
module.exports.ENDSESSION = function(req, res) {
    if(!req.session) {
        console.log('>>> Session does not exist. <<<');
        res.sendStatus(404);
    } else if(!req.session.isAuthenticated) {
        console.log('>>> Never authenticated. Proceed to login papge. <<<');
        req.session.isAuthenticated = false;
        res.sendStatus(404);
    } else if(req.session.isAuthenticated) {
        console.log('>>> Logging out ...');
        req.session.isAuthenticated = false;
        console.log('>>> Returning to login page ...');
        res.sendStatus(200);
    }
};

// displays dashboards and operational pages: [add, edit]
module.exports.GET = function(req, res) {
    var dashboard = req.params.dashboard;
    var operation = req.params.operation;
    if(dashboard.match(/(dashboard|blogs|events|forms|recipes)/) && !operation) {
        // render dashboard
        DisplayDashboard(req, res);
    } else if(operation.match(/(add|edit)/)) {
        // render add or edit page
        DisplayOperation(req, res);
    } else {
        // render 400 page
        res.sendStatus(400);
    }
};

// Helpers
function DisplayDashboard(req, res) {
    // displays [blogs, events, forms, recipes] dashboard
    var route = req.params.dashboard;
    var routes = /(dashboard|blogs|events|forms|recipes)/;
    if (!route.match(routes)) {
        console.log('>>> Incorrect URL: \'' + route + '\' <<<');
        res.sendStaus(400);
    } else {
        if (route.match(/dashboard/)) {
            console.log('>>> Displaying Admin Dashboard ... ');
            res.render('en/admin/dashboard', {layout: 'admin-main.handlebars'});
        } else if(route.match(/(blogs|events|forms|recipes)/)) {
            console.log('>>> Displaying Dashboard ' + route);
            var options = {
                layout: 'admin-main.handlebars',
                category: route
            };
            // make db call to populate 'options' with data to render on client
            switch (route) {
                case 'blogs':
                    // TODO
                    // obj_Blogs.SEARCH(function(docs) {
                    //     options.data = docs;
                    //     res.render();
                    //});
                    res.render('en/admin/admin-dashboards', options);
                    break;
                case 'events':
                    res.render('en/admin/admin-dashboards', options);
                    break;
                case 'forms':
                    res.render('en/admin/admin-dashboards', options);
                    break;
                case 'recipes':
                    obj_Recipes.SEARCH(function(docs) {
                        options.data = docs;
                        res.render('en/admin/admin-dashboards', options);
                    });
                    break;
                default:
                    break;
            }
        }
    }
}

function DisplayOperation(req, res) {
    // displays [add, edit] pages
    var dashboard = req.params.dashboard;
    var route = req.params.operation;
    var routes = /(add|edit)/;
    if (!route.match(routes)) {
        console.log('>>> Incorrect URL: \'' + route + '\' <<<');
        res.sendStaus(400);
    } else if(route.match(/(add)/)) {
        var options = {
            layout: 'admin-main.handlebars'
        };
        res.render('en/admin/'+dashboard+'/add', options);
    } else if(route.match(/(edit)/)) {
        var options = {
            layout: 'admin-main.handlebars'
        };
        switch(dashboard) {
            case 'blogs':
                break;
            case 'events':
                break;
            case 'forms':
                break;
            case 'recipes':
                if(route.match(/add/)) {
                    // add
                    res.render('en/admin/recipes/add', options);
                } else {
                    // edit
                    var id = req.query.id;
                    console.log(id);
                    obj_Recipes.SEARCH_BY_ID(id, function(doc) {
                        console.log('>>> docs:', doc[0]);
                        console.log('>>> Opening file for editing ...');
                        options.data = doc[0];
                        options.helpers = {
                            select: function(theSelected, options) {
                                return options.fn(this).replace(
                                    new RegExp(' value=\"' + theSelected + '\"'), '$& selected="selected"'
                                );
                            }
                        };
                        res.render('en/admin/recipes/edit', options);
                    });
                }
                break;
            default:
                break;
        }
    }
}

function CheckSizeOfAdminCollection(req, res, cont) {
    db.client.collection('admin').find().toArray(function(err, docs) {
        if(err) {
            console.log('Error while retrieving all admin accounts', err);
            res.sendStatus(500);
        } else if(docs.length > 1) {
            console.log('No more admins may be created.');
            res.sendStatus(400);
        } else {
            console.log('Enough space to create a new admin');
            if(cont !== undefined || cont !== null) {
                cont();
            }
        }
    });
}