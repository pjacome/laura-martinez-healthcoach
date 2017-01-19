var mongoClient = require('mongodb').MongoClient;

module.exports.init = function(callback) {
    var url = 'mongodb://192.168.1.64:27017';
    mongoClient.connect(url, function (err, database) {
        if (err) {
            console.log('could not connect to mongo db');
        } else {
            module.exports.client = database;
            console.log('connected to mongo db');
        }
    });
};