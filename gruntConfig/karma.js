'use strict';

module.exports = function() {
    return {
        options: {
            configFile: 'testconfig/karma.conf.js'
        },
        unit: {
            reporters: ['dots']
        },
        coverage: {
            reporters: ['progress', 'coverage']
        }
    }
};
