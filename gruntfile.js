'use strict';

module.exports = function(grunt) {
    // Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: requireConfig('watch.js')(),
        jshint: requireConfig('jshint.js')(),
        jsbeautifier: requireConfig('jsbeautifier.js')(),
        uglify: requireConfig('uglify.js')(),
        csslint: requireConfig('csslint.js')(),
        cssmin: requireConfig('cssmin.js')(),
        nodemon: requireConfig('nodemon.js')(),
        concurrent: requireConfig('concurrent.js')(),
        mochaTest: requireConfig('mochaTest.js')(),
        env: requireConfig('env.js')(),
        karma: requireConfig('karma.js')()
    });

    requireConfig('npm-tasks.js')(grunt);

    //Making grunt default to force in order not to break the project.
    //    grunt.option('force', true);

    if (process.env.NODE_ENV === 'production') {
        grunt.registerTask('default', ['jshint', 'jsbeautifier', 'csslint', 'cssmin', 'uglify', 'concurrent']);
    } else {
        grunt.registerTask('default', ['jshint', 'jsbeautifier', 'csslint', 'concurrent']);
    }

    grunt.registerTask('test', ['jsbeautifier', 'env:test', 'mochaTest', 'karma:unit']);

    grunt.registerTask('coverage', ['env:test', 'mochaTest', 'karma:coverage']);

    grunt.registerTask('build', ['jshint', 'jsbeautifier', 'csslint', 'cssmin', 'uglify', 'test', 'coverage']);

    function requireConfig(file) {
        return require('./gruntConfig/' + file);
    }
};
