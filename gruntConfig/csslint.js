'use strict';

module.exports = function() {
    return {
        options: {
            csslintrc: '.csslintrc'
        },
        all: {
            src: ['client/css/**/*.css']
        }
    }
};
