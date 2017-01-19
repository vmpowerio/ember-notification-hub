import Ember from 'ember';

export default Ember.Controller.extend({
    emberNotificationCenter: Ember.inject.service(),
    actions: {
        testSync: function () {
            this.get('emberNotificationCenter').pushNotification({
                title: 'Test Synchronous Action',
                description: 'This shows an asynchronous notification with a promise',
                status: 'Success'
            });
        },
        testFail: function () {
            this.get('emberNotificationCenter').pushNotification({
                title: 'Test Async Action 1',
                description: 'This shows an asynchronous notification with a promise'
            }, new Ember.RSVP.Promise((resolve, reject) => {
                setTimeout(() => {
                    reject([{
                            code: '404 Bad Request',
                            title: 'You must boogy before riding'
                        },
                        {
                            code: '403 Not Authorized',
                            title: 'Who do you think you are?'
                        }
                    ]);
                }, 3000);
            }));
        },
        testPass: function () {
            this.get('emberNotificationCenter').pushNotification({
                title: 'Test Async Action 1',
                description: 'This shows successful asynchronous notification with a promise'
            }, new Ember.RSVP.Promise(resolve => {
                setTimeout(() => {
                    resolve();
                }, 3000);
            }));
        }
    }
});
