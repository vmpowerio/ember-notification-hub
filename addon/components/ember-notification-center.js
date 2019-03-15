import { alias } from '@ember/object/computed';
import { later, cancel } from '@ember/runloop';
import { htmlSafe } from '@ember/template';
import { computed, observer } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import layout from '../templates/components/ember-notification-center';
export default Component.extend({
    layout,
    lastToggle: null,
    baseAssetPath: '/',
    isPulloutVisible: false,
    showLastNotification: false,
    notifications: service('emberNotificationCenter'),
    _notificationStyle: computed(
        'left', 'width', 'top', 'openTop', 'bottom', 'openBottom',
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
            style += ` font-family: ${fontFamily};`;
        }

        if(!pullDown) {
            style += ` bottom: ${isPulloutVisible ? openBottom : bottom};`;
        } else {
            style += ` top: ${isPulloutVisible ? openTop : top};`;
        }

        return htmlSafe(style);
    }),
    didRender: function () {
        this.set('rendered', true);
    },
    _scheduleToggle: function () {
        let lastToggle = later(() => {
            this.send('togglePullout');
            this.set('lastToggle', null);
        }, 3000);
        this.set('lastToggle', lastToggle);
    },
    _cancelToggle: function () {
        if (this.get('lastToggle')) {
            cancel(this.get('lastToggle'));
            this.set('lastToggle', null);
        }
    },
    lastNotification: alias('notifications.notifications.firstObject'),
    lastNotificationObserver: observer('lastNotification', target => {
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
                cancel(this.get('lastToggle'));
            }
            // This hack is required since Chrome isn't smart enough
            // to trigger our animations right away. We're just
            // redrawing those elements.
            this.set('showLastNotification', false);
            this.toggleProperty('isPulloutVisible');
        }
    }
});
