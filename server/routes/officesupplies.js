'use strict';

var officesupplies = require('../controllers/officesupplies');

module.exports = function(app) {
    app.get('/service/officesupplies', officesupplies.all);

    app.post('/service/officesupplies', officesupplies.add);

    app.post('/service/officesupplies/:id', officesupplies.update);
};