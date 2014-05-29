'use strict';

module.exports = function() {
    return {
        js: {
            files: ['gruntfile.js', 'server/**/*.js', 'client/**/*.js', 'testconfig/**/*.js'],
            tasks: ['jshint'],
            options: {
                livereload: true
            }
        },
        html: {
            files: ['client/views/**'],
            options: {
                livereload: true
            }
        },
        css: {
            files: ['client/css/**'],
            tasks: ['csslint'],
            options: {
                livereload: true
            }
        }
    }
};
