import { Promise } from 'rsvp';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default Controller.extend({
    emberNotificationCenter: service(),
    actions: {
        testSync: function () {
            this.get('emberNotificationCenter').pushNotification({
                title: 'Test Synchronous Action',
                description: 'This shows an synchronous notification without a promise',
                status: 'Success'
            });
        },
        testFail: function () {
            this.get('emberNotificationCenter').pushNotification({
                title: 'Test Async Action 1',
                description: 'This shows an asynchronous notification with a promise'
            }, new Promise((resolve, reject) => {
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
            }, new Promise(resolve => {
                setTimeout(() => {
                    resolve();
                }, 3000);
            }));
        }
    }
});
