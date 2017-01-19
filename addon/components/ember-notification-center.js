import Ember from 'ember';
import layout from '../templates/components/ember-notification-center';
export default Ember.Component.extend({
    layout,
    notifications: Ember.inject.service('emberNotificationCenter'),
    isPulloutVisible: false,
    showLastNotification: false,
    lastToggle: null,
    didRender: function () {
        this.set('rendered', true);
    },
    lastNotification: Ember.computed.alias('notifications.notifications.firstObject'),
    lastNotificationObserver: Ember.observer('lastNotification', target => {
        if (target.get('firstTime')) {
            target.set('firstTime', false);
            return;
        }
        if (target.get('notifications.notifications.loading')) {
            return;
        }
        if (target.get('lastNotification.promise')) {
            target.send('togglePullout');
            target.get('lastNotification.promise')
            .then(() => {
                target.send('togglePullout');
            });
        } else {
            // synchronous notification
            if (target.get('lastToggle')) {
                Ember.run.cancel(target.get('lastToggle'));
                target.set('lastToggle', null);
            } else {
                target.send('togglePullout');
            }
            let lastToggle = Ember.run.later(() => {
                target.send('togglePullout');
                target.set('lastToggle', null);
            }, 3000);
            target.set('lastToggle', lastToggle);
        }
    }),
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
