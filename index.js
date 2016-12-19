/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-notif-hub',

  included: function (app) {
    this._super.included.apply(this, arguments);
    app.import('bower_components/material-design-icons/iconfont/material-icons.css');
    app.import('bower_components/material-design-icons/iconfont/MaterialIcons-Regular.woff', {
        destDir: 'assets'
    });
    app.import('bower_components/material-design-icons/iconfont/MaterialIcons-Regular.woff2', {
        destDir: 'assets'
    });
    app.import('bower_components/material-design-icons/iconfont/MaterialIcons-Regular.svg', {
        destDir: 'assets'
    });
    app.import('bower_components/material-design-icons/iconfont/MaterialIcons-Regular.ttf', {
        destDir: 'assets'
    });
    app.import('bower_components/material-design-icons/iconfont/MaterialIcons-Regular.eot', {
        destDir: 'assets'
    });
    app.import('bower_components/roboto-fontface/fonts/Roboto-Regular.eot', {
        destDir: 'font/roboto'
    });
    app.import('bower_components/roboto-fontface/fonts/Roboto-Regular.svg', {
        destDir: 'font/roboto'
    });
    app.import('bower_components/roboto-fontface/fonts/Roboto-Regular.ttf', {
        destDir: 'font/roboto'
    });
    app.import('bower_components/roboto-fontface/fonts/Roboto-Regular.woff', {
        destDir: 'font/roboto'
    });
    app.import('bower_components/roboto-fontface/fonts/Roboto-Regular.woff2', {
        destDir: 'font/roboto'
    });
    app.import('bower_components/roboto-fontface/fonts/Roboto-Light.woff2', {
        destDir: 'font/roboto'
    });
    app.import('bower_components/roboto-fontface/fonts/Roboto-Light.svg', {
        destDir: 'font/roboto'
    });
    app.import('bower_components/roboto-fontface/fonts/Roboto-Light.ttf', {
        destDir: 'font/roboto'
    });
    app.import('bower_components/roboto-fontface/fonts/Roboto-Light.woff', {
        destDir: 'font/roboto'
    });
  }
};
