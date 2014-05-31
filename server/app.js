'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

var express = require('express'),
    config = require('./config'),
    mongoose = require('mongoose'),
    expressLoad = require('express-load'),
    path = require('path');

var db = mongoose.connect(config.dbpath + '/' + config.dbname);
var app = express();

// Express settings
require('./express')(app, db);

// Bootstrap routes
var modelsPath = path.join(__dirname, 'models');
var routesPath = path.join(__dirname, 'routes');
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
