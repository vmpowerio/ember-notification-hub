/*jshint node:true*/
/* global require, module */
var EmberAddon = require('ember-cli/lib/broccoli/ember-addon');
var nodeSass = require('node-sass');
module.exports = function (defaults) {
    var app = new EmberAddon(defaults, {
        nodeSass: nodeSass,
        includePaths: [
          'app/styles'
        ]
    });

    /*
      This build file specifies the options for the dummy test app of this
      addon, located in `/tests/dummy`
      This build file does *not* influence how the addon or the app using it
      behave. You most likely want to be modifying `./index.js` or app's build file
    */
    app.import('vendor/icons/favicon.ico', {
        destDir: 'assets/icons'
    });
    app.import('bower_components/materialize/dist/css/materialize.css');
    app.import('bower_components/material-design-icons-iconfont/dist/fonts/material-icons.css');
    app.import('bower_components/material-design-icons-iconfont/dist/fonts/MaterialIcons-Regular.woff', {
        destDir: 'assets'
    });
    app.import('bower_components/material-design-icons-iconfont/dist/fonts/MaterialIcons-Regular.woff2', {
        destDir: 'assets'
    });
    app.import('bower_components/material-design-icons-iconfont/dist/fonts/MaterialIcons-Regular.svg', {
        destDir: 'assets'
    });
    app.import('bower_components/material-design-icons-iconfont/dist/fonts/MaterialIcons-Regular.ttf', {
        destDir: 'assets'
    });
    app.import('bower_components/material-design-icons-iconfont/dist/fonts/MaterialIcons-Regular.eot', {
        destDir: 'assets'
    });
    return app.toTree();
};
