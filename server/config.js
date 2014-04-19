'use strict';

var path = require('path'),
    rootPath = path.normalize(__dirname + '/..');

module.exports = {
    root: rootPath,
    port: process.env.PORT || 3000,
    templateEngine: 'swig',
    sessionSecret: 'O#(DMW#sdf0234j03WQ6g3dnjKLSDFJosfkm',
    sessionCollection: 'sessions',
    dbpath: 'mongodb://localhost:27017',
    dbname: 'officesupplies',
    app: {
        name: 'TEST - Development'
    }
};