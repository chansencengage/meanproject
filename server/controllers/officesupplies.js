'use strict';

var mongoose = require('mongoose'),
    OfficeSuppliesModel = mongoose.model('OfficeSupplies');

exports.all = function(req, res) {
    OfficeSuppliesModel.find({}, function(err, data) {
        res.json(data);
    });
};

exports.add = function(req, res) {
    var officeSupply = new OfficeSuppliesModel(req.body);

    officeSupply.save(function(err) {
        if (err) {
            console.log(err);
            res.send(500, {
                error: 'Something went wrong'
            });
            return;
        }
        res.json(officeSupply._doc);
    })
};

exports.update = function(req, res) {
    var params = req.body;
    delete params._id;

    OfficeSuppliesModel.update({
        _id: new Object(req.params.id)
    }, params, {
        upsert: false
    }, function(err) {
        if (err) {
            console.log(err);
            res.send(500, {
                error: 'Something went wrong'
            });
            return;
        }

        var model = req.body;
        model._id = req.params.id;
        res.json(model);
    });
};
