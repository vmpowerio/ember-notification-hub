import Component from '@ember/component';
import layout from '../templates/components/ember-notification-pull-out';

export default Component.extend({
    layout,
    actions: {
        clearAll: function () {
            this.get('notifications').clearAll();
        }
    }
});
