'use strict';

var officesupplies = require('../controllers/officesupplies');

module.exports = function(app) {
    app.get('/service/officesupplies', function(req, res) {
        officesupplies.all(req, res);
    });

    app.post('/service/officesupplies', function(req, res) {
        officesupplies.add(req, res);
    });

    app.post('/service/officesupplies/:id', function(req, res) {
        officesupplies.update(req, res);
    });
};