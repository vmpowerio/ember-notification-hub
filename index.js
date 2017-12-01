/* jshint node: true */
'use strict';

module.exports = {
    name: 'ember-notification-hub',

    included: function(app) {
        this._super.included.apply(this, arguments);
        this._ensureThisImport();

        let config = this._getAddonOptions();

        if (!config.sassOptions) {
            config.sassOptions = {};
            config.sassOptions.includePaths = [];
        }

        config.sassOptions.includePaths.push('app/styles');

        this.ui.writeLine('Including Ember Notification Hub PNG Icons...');
        // these come from the material-icons bower package
        // but including the icon font would add up to 400-500kb to the app
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

    _getAddonOptions() {
        return this.parent && this.parent.options ||
            this.app && this.app.options || {};
    },

    _ensureThisImport() {
        if (!this.import) {
            this._findHost = function findHostShim() {
                let current = this;
                let app;

                // eslint-disable-next-line
                do {
                    app = current.app || app;
                } while (current.parent.parent && (current = current.parent));

                return app;
            };
            this.import = function importShim(asset, options) {
                let app = this._findHost();
                app.import(asset, options);
            };
        }
    }
};