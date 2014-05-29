'use strict';

module.exports = function() {
    return {
        all: {
            src: ['gruntfile.js', 'server/**/*.js', 'client/**/*.js', 'testconfig/**/*.js', '!testconfig/coverage/**/*.js'],
            options: {
                jshintrc: true
            }
        }
    }
};
