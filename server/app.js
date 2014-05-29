'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

var express = require('express'),
    config = require('./config'),
    mongoose = require('mongoose'),
    expressLoad = require('express-load');

var db = mongoose.connect(config.dbpath + '/' + config.dbname);
var app = express();

// Express settings
require('./express')(app, db);

// Bootstrap routes
var modelsPath = __dirname + '\\models';
var routesPath = __dirname + '\\routes';
expressLoad(modelsPath, {
    extlist: /^(?!.*_spec\.).*\.(js$)/
}).then(routesPath, {
    extlist: /(.*)\.(js$)/
}).into(app);


// Start the app by listening on <port>
var port = process.env.PORT || config.port;
app.listen(port);
console.log('Express app started on port ' + port);

module.exports = app;
