import {
    moduleFor,
    test
} from 'ember-qunit';

moduleFor('service:ember-notification-center', 'Unit | Service | ember notification center', {
    // Specify the other units that are required for this test.
    // needs: ['service:foo']
});

// this component is best tested via integration component tests
test('it exists', function (assert) {
    let service = this.subject();
    assert.ok(service);
});
