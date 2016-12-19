import Ember from 'ember';
import layout from '../templates/components/ember-notification-pull-out';

export default Ember.Component.extend({
    layout,
    actions: {
        clearAll: function () {
            this.get('notifications').clearAll();
        }
    }
});
