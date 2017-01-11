/* jshint node: true */
'use strict';
var nodeSass = require('node-sass');
module.exports = {
    name: 'ember-notif-hub',
    included: function (app) {
        this._super.included.apply(this, arguments);
        if (!app.sassOptions) {
            app.sassOptions = {};
            console.log('NO INCLUDE PATH');
            app.sassOptions.includePaths = [];
        }
        app.sassOptions.nodeSass = nodeSass;
        console.log('adding to INCLUDE!');
        app.sassOptions.includePaths.push('app/styles');
        this.ui.writeLine('Including Ember Notification Hub PNG Icons...');
        // these come from the material-icons bower package
        // but including the icon font woul dhadd up to 400-500kb to the app
        app.import('vendor/icons/ic_done_white_24dp_2x.png', {
            destDir: 'icons'
        });
        app.import('vendor/icons/ic_error_outline_white_24dp_2x.png', {
            destDir: 'icons'
        });
        app.import('vendor/icons/ic_more_vert_white_24dp_2x.png', {
            destDir: 'icons'
        });
    },
    afterInstall: function () {
        // Add addons to package.json and run defaultBlueprint
        return this.addAddonsToProject({
            // a packages array defines the addons to install
            packages: [
                // name is the addon name, and target (optional) is the version
                {name: 'ember-localstorage-adapter'},
                {name: 'ember-cli-sass'}
            ]
        });
    }
};
