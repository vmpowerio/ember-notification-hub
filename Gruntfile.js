var grunt = require('grunt');
require('load-grunt-tasks')(grunt);

var files = ['app/**/*.js', 'addon/**/*.js', 'blueprints/**/*.js', 'tests/**/*.js'];

grunt.initConfig({
    jscs: {
        files: {
            src: files
        },
        options: {
            config: '.jscsrc'
        }
    },
    jsbeautifier: {
        write: {
            files: {
                src: files
            },
            options: {
                config: '.beautifyrc'
            }
        }
    }
});
