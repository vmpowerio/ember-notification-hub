import EmberObject from '@ember/object';
import { run } from '@ember/runloop';
import { A } from '@ember/array';
import {
    moduleForComponent,
    test
} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ember-notification-pull-out', 'Integration | Component | ember-notification-pull-out', {
    integration: true
});

test('it renders notifications in correct order', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    const notifications = A();
    const store = this.container.lookup('service:store');
    const not1 = run(() => {
        return store.createRecord('emberNotificationLocalNotification', {
            title: 'Integration Test Notification 1',
            description: 'Some description 1',
            status: 'Pending'
        });
    });
    const not2 = run(() => {
        return store.createRecord('emberNotificationLocalNotification', {
            title: 'Integration Test Notification 2',
            description: 'Some description 2',
            status: 'Failed'
        });
    });
    const not3 = run(() => {
        return store.createRecord('emberNotificationLocalNotification', {
            title: 'Integration Test Notification 3',
            description: 'Some description 3',
            status: 'Success'
        });
    });
    notifications.unshiftObject(not1);
    notifications.unshiftObject(not2);
    notifications.unshiftObject(not3);
    this.set('notifications', new EmberObject({
        notifications: notifications
    }));
    // Template block usage:
    this.render(hbs `{{ember-notification-pull-out notifications=notifications}}`);
    assert.equal(this.$().text().trim().indexOf('Clear All') > -1, true);
    // not 1
    assert.equal(this.$().text().trim().indexOf('Pending') > -1, true);
    assert.equal(this.$().text().trim().indexOf('Some description') > -1, true);
    assert.equal(this.$().text().trim().indexOf('Integration Test Notification 1') > -1, true);
    // not 2
    assert.equal(this.$().text().trim().indexOf('Pending') > -1, true);
    assert.equal(this.$().text().trim().indexOf('Some description') > -1, true);
    assert.equal(this.$().text().trim().indexOf('Integration Test Notification 2') > -1, true);
    // not 3
    assert.equal(this.$().text().trim().indexOf('Pending') > -1, true);
    assert.equal(this.$().text().trim().indexOf('Some description') > -1, true);
    assert.equal(this.$().text().trim().indexOf('Integration Test Notification 3') > -1, true);
    // ensure order!
    assert.equal(this.$().text().trim().indexOf('Integration Test Notification 3') < this.$().text().trim().indexOf('Integration Test Notification 2'), true);
    assert.equal(this.$().text().trim().indexOf('Integration Test Notification 3') < this.$().text().trim().indexOf('Integration Test Notification 1'), true);
    assert.equal(this.$().text().trim().indexOf('Integration Test Notification 2') < this.$().text().trim().indexOf('Integration Test Notification 1'), true);
});
