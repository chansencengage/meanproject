'use strict';

module.exports = function() {
    return {
        dev: {
            script: '../server/app.js',
            options: {
                args: [],
                ignore: ['client/**'],
                ext: 'modules,html',
                nodeArgs: ['--debug'],
                delayTime: 1,
                env: {
                    PORT: 3000
                },
                cwd: __dirname
            }
        }
    }
};
