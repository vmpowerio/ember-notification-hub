import {
    moduleFor,
    test
} from 'ember-qunit';

moduleFor('adapter:ember-notification-local-error', 'Unit | Adapter | ember notification local error', {
    // Specify the other units that are required for this test.
    // needs: ['serializer:foo']
});

// This adapter just specifies we use localstorage adapter
test('it exists', function (assert) {
    let adapter = this.subject();
    assert.ok(adapter);
});
