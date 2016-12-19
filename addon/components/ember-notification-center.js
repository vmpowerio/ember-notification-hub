import Ember from 'ember';
import layout from '../templates/components/ember-notification-center';
export default Ember.Component.extend({
    layout,
    notifications: Ember.inject.service('emberNotificationCenter'),
    isPulloutVisible: false,
    showLastNotification: false,
    lastNotification: Ember.computed.alias('notifications.notifications.firstObject'),
    actions: {
        retryFailedAction: function (notification) {
            notification.get('retryTarget').send('retryAction', notification.get('retryArgs'));
        },
        togglePullout: function () {

            // This hack is required since Chrome isn't smart enough
            // to trigger our animations right away. We're just
            // redrawing those elements.
            this.set('showLastNotification', false);
            this.toggleProperty('isPulloutVisible');
        }
    }
});
