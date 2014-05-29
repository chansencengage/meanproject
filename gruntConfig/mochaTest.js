'use strict';

module.exports = function() {
    return {
        options: {
            reporter: 'spec',
            require: 'server/app.js'
        },
        src: ['server/**/*_spec.js']
    }
};
