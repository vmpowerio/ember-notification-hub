import {
    moduleFor,
    test
} from 'ember-qunit';

moduleFor('service:ember-notification-center', 'Unit | Service | ember notification center', {
    // Specify the other units that are required for this test.
    needs: ['model:ember-notification-local-notification', 'model:ember-notification-local-error',
    'adapter:ember-notification-local-notification', 'adapter:ember-notification-local-error']
});

// this component is best tested via integration component tests
test('it exists', function (assert) {
    let service = this.subject();
    assert.ok(service);
});
