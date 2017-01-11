/* globals localStorage */
import {
    moduleForComponent,
    test
} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('ember-notification-center', 'Integration | Component | ember-notification-center', {
    integration: true,
    beforeEach: function () {
        localStorage.clear();
    }
});

test('it renders default state', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    this.render(hbs `{{ember-notification-center bottom="-25px" openBottom="0px" left="20%" width="60%" pullDown=false}}`);

    // notification counts
    assert.ok(this.$().text().trim().indexOf('0') > -1);
    assert.ok(this.$().text().trim().indexOf('0') > -1);
    // expected default text
    assert.equal(this.$().text().trim().indexOf('Notifications') > -1, true);
});

test('it renders pending and successful notification', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    const emberNotificationCenter = this.container.lookup('service:emberNotificationCenter');
    // push first pending notification
    Ember.run(() => {
        emberNotificationCenter.pushNotification({
            title: 'Integration Test Notification 1',
            description: 'Some description 1'
        }, new Ember.RSVP.Promise(resolve => {
            resolve();
        }));
        assert.expect(11);
        this.render(hbs `{{ember-notification-center bottom="-25px" openBottom="0px" left="20%" width="60%" pullDown=false}}`);
        assert.ok(this.$().text().trim().indexOf('1 Pending Tasks') > -1);
        assert.ok(this.$().text().trim().indexOf('Integration Test Notification 1') > -1);
        assert.ok(this.$().text().trim().indexOf('Some description 1') > -1);
        assert.ok(this.$().text().trim().indexOf('Pending') > -1);
        Ember.run.scheduleOnce('afterRender', () => {
            assert.ok(this.$().text().trim().indexOf('Pending') === -1);
            assert.ok(this.$().text().trim().indexOf('Success') > -1);
            // # of errors should be 1
            assert.ok(this.$().text().trim().indexOf('1') > -1);
            // # of successe should be 0
            assert.ok(this.$().text().trim().indexOf('0') > -1);
            // verify a notification is in the store
            var store = this.container.lookup('service:store');
            var notifs = store.peekAll('emberNotificationLocalNotification');
            // there should only be 1 notification model
            notifs.forEach(notif => {
                assert.equal(notif.get('status'), 'Success');
                assert.equal(notif.get('description'), 'Some description 1');
                assert.equal(notif.get('title'), 'Integration Test Notification 1');
            });
        });
    });
});

test('it renders pending and failure notification', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    const emberNotificationCenter = this.container.lookup('service:emberNotificationCenter');
    // push first pending notification
    Ember.run(() => {
        emberNotificationCenter.pushNotification({
            title: 'Integration Test Notification 2',
            description: 'Some description 2'
        }, new Ember.RSVP.Promise((resolve, reject) => {
            reject([{
                    code: '404 Not Found',
                    title: 'We cannot find that scrumptious bagel you are looking for'
                },
                {
                    code: '403 Unauthorized',
                    title: 'You do not have access to this nifty resource'
                }
            ]);
        }));
        this.render(hbs `{{ember-notification-center bottom="-25px" openBottom="0px" left="20%" width="60%" pullDown=false}}`);
        assert.ok(this.$().text().trim().indexOf('1 Pending Tasks') > -1);
        assert.ok(this.$().text().trim().indexOf('Integration Test Notification 1') > -1);
        assert.ok(this.$().text().trim().indexOf('Some description 1') > -1);
        assert.ok(this.$().text().trim().indexOf('Pending') > -1);
        Ember.run.scheduleOnce('afterRender', () => {
            // status text
            assert.equal(this.$().text().trim().indexOf('Pending'), -1);
            // title bar text
            assert.ok(this.$().text().trim().indexOf('Failed: Some description 2') > -1);
            // failed icon counter
            assert.ok(this.$().text().trim().indexOf('1') > -1);
            assert.ok(this.$().text().trim().indexOf('404 Not Found') > -1);
            assert.ok(this.$().text().trim().indexOf('We cannot find that scrumptious bagel you are looking for') > -1);
            assert.ok(this.$().text().trim().indexOf('403 Unauthorized') > -1);
            assert.ok(this.$().text().trim().indexOf('You do not have access to this nifty resource') > -1);
        });
    });
});
