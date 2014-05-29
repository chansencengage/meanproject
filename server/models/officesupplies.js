'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var OfficeSuppliesSchema = new Schema({
    name: {
        type: String,
        trim: true
    },
    supplies: {
        type: Object
    }
}, {
    collection: 'officesupplies'
});

OfficeSuppliesSchema.index({
    name: 1,
    description: 1
});

mongoose.model('OfficeSupplies', OfficeSuppliesSchema);
