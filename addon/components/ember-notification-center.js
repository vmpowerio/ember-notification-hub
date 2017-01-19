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
            if (!target.get('isPulloutVisible')) {
                target.send('togglePullout');
            }
            if (target.get('lastToggle')) {
                Ember.run.cancel(target.get('lastToggle'));
            }
            target.get('lastNotification.promise')
            .then(() => {
                if (!target.get('isPulloutVisible')) {
                    // user collapsed pullout before finishing
                    return;
                }
                target.send('togglePullout');
            });
        } else {
            if (target.get('notifications.inProgress')) {
                // theres still an async promise going on
                return;
            }
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
            if (this.get('lastToggle')) {
                Ember.run.cancel(this.get('lastToggle'));
            }
            // This hack is required since Chrome isn't smart enough
            // to trigger our animations right away. We're just
            // redrawing those elements.
            this.set('showLastNotification', false);
            this.toggleProperty('isPulloutVisible');
        }
    }
});
