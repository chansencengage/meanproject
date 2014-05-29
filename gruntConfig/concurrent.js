'use strict';

module.exports = function() {
    return {
        tasks: ['nodemon', 'watch'],
        options: {
            logConcurrentOutput: true
        }
    }
};
