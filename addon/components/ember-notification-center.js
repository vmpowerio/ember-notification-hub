import Ember from 'ember';
import layout from '../templates/components/ember-notification-center';
export default Ember.Component.extend({
    layout,
    lastToggle: null,
    baseAssetPath: '/',
    isPulloutVisible: false,
    showLastNotification: false,
    notifications: Ember.inject.service('emberNotificationCenter'),
    _notificationStyle: Ember.computed(
        'left', 'width', 'top', 'openTop', 'bottom', 'opemBottom',
        'fontFamily', 'pullDown', 'isPulloutVisible', function() {
        let left = this.get('left') || '20%';
        let width = this.get('width') || '60%';
        let fontFamily = this.get('fontFamily');

        let top = this.get('top') || '-30px';
        let openTop = this.get('openTop') || '0';

        let bottom = this.get('bottom') || '-30px';
        let openBottom = this.get('openBottom') || '0';

        let pullDown = this.get('pullDown');
        let isPulloutVisible = this.get('isPulloutVisible');

        let style = `width: ${width}; left: ${left};`;

        if(fontFamily) {
            style += ` font-family: ${fontFamily};`
        }

        if(!pullDown) {
            style += ` bottom: ${isPulloutVisible ? openBottom : bottom};`
        } else {
            style += ` top: ${isPulloutVisible ? openTop : top};`
        }

        return Ember.String.htmlSafe(style);
    }),
    didRender: function () {
        this.set('rendered', true);
    },
    _scheduleToggle: function () {
        let lastToggle = Ember.run.later(() => {
            this.send('togglePullout');
            this.set('lastToggle', null);
        }, 3000);
        this.set('lastToggle', lastToggle);
    },
    _cancelToggle: function () {
        if (this.get('lastToggle')) {
            Ember.run.cancel(this.get('lastToggle'));
            this.set('lastToggle', null);
        }
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
            target._cancelToggle();
            target.get('lastNotification.promise')
            .then(() => {
                if (!target.get('isPulloutVisible')) {
                    // user collapsed pullout before finishing
                    return;
                }
                target._scheduleToggle();
            });
        } else {
            if (target.get('notifications.inProgress')) {
                // theres still an async promise going on
                return;
            }
            // synchronous notification
            if (target.get('lastToggle')) {
                target._cancelToggle();
            } else {
                target._scheduleToggle();
            }
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
