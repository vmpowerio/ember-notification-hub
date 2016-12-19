import {
    moduleForModel,
    test
} from 'ember-qunit';

moduleForModel('ember-notification-local-error', 'Unit | Model | ember notification local error', {
    // Specify the other units that are required for this test.
    needs: []
});

test('it exists', function (assert) {
    let model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
});
