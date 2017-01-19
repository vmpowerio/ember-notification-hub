import Ember from 'ember';

export default Ember.Service.extend({
    store: Ember.inject.service(),
    init: function () {
        this._super();
        this.set('notifications.loading', true);
        this.get('store').findAll('ember-notification-local-notification')
            .then(notifications => {
                notifications.forEach(notification => {
                    if (notification.get('hasDirtyAttributes')) {
                        return;
                    }
                    this.get('notifications').pushObject(notification);
                });
                this.set('notifications.loading', false);
            });
        this.get('store').findAll('ember-notification-local-error');
    },
    notifications: Ember.A([]),
    clearAll: function () {
        var newArray = Ember.A([]);
        this.get('notifications').forEach(notification => {
            if (notification.get('status') === 'Pending') {
                newArray.push(notification);
                return;
            }
            const promises = [];
            notification.get('errors').forEach(error => {
                promises.push(error.destroyRecord());
            });
            notification.destroyRecord();
        });
        this.set('notifications', newArray);
    },
    inProgress: Ember.computed('notifications.@each.status', function () {
        return this._countNotifications('Pending');
    }),
    failed: Ember.computed('notifications.@each.status', function () {
        return this._countNotifications('Failed');
    }),
    succeeded: Ember.computed('notifications.@each.status', function () {
        return this._countNotifications('Success');
    }),
    notificationsObserver: Ember.computed('notifications.@each', 'notifications', function () {
        this.get('store').findAll('ember-notification-local-notification')
            .then(notifications => {
                this.set('notifications', notifications);
            });
    }),
    pushNotification: function (notification, promise) {
        const record = this.get('store').createRecord('ember-notification-local-notification', notification);
        if (!promise) {
            this._pushAlertNotification(record);
        } else if (promise.then) {
            record.promise = promise;
            this._pushTaskNotification(record);
        }
    },
    _countNotifications: function (status) {
        var count = 0;
        this.get('notifications').forEach(notif => {
            if (notif.get('status') === status) {
                count += 1;
            }
        });
        return count;
    },
    _pushAlertNotification: function (notification) {
        notification.save();
        this.notifications.unshiftObject(notification);
    },
    _pushTaskNotification: function (notification) {
        notification.set('status', 'Pending');
        this.get('notifications').unshiftObject(notification);
        notification.promise.then(() => {
                Ember.debug('setting succeeded');
                notification.set('status', 'Success');
                notification.save();
            })
            .catch(err => {
                var promise = new Ember.RSVP.Promise(resolve => {
                    resolve();
                });
                if (!err) {
                    return notification.set('status', 'Failed');
                }
                if (Array.isArray(err) || err.errros) {
                    let errPromises = [];
                    let errs = Array.isArray(err) ? err : err.errors;
                    errs.forEach(error => {
                        let localError = this.get('store').createRecord('ember-notification-local-error', error);
                        notification.get('errors').pushObject(localError);
                        errPromises.push(localError.save());
                    });
                    promise = Ember.RSVP.all(errPromises).then(() => {
                        return notification.save();
                    });
                } else if (err.message) {
                    let localError = this.get('store').createRecord('ember-notification-local-error', {
                        code: 'Unknown Error',
                        title: err.message
                    });
                    notification.get('errors').pushObject(localError);
                    promise = localError.save();
                }
                promise.then(() => {
                    notification.set('status', 'Failed');
                    notification.save()
                        .then(() => {
                            Ember.debug('saved local notification!');
                        })
                        .catch(err => {
                            Ember.debug(err.message);
                        });
                });
            });
    }
});
