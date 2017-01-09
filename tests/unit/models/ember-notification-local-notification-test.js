import {
    moduleForModel,
    test
} from 'ember-qunit';

moduleForModel('ember-notification-local-notification', 'Unit | Model | ember notification local notification', {
    // Specify the other units that are required for this test.
    needs: ['model:ember-notification-local-error']
});

test('it exists', function (assert) {
    let model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
});
