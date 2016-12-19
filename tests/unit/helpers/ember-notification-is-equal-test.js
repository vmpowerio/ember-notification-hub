import {
    emberNotificationIsEqual
} from 'dummy/helpers/ember-notification-is-equal';
import {
    module,
    test
} from 'qunit';

module('Unit | Helper | ember notification is equal');

// Replace this with your real tests.
test('it works', function (assert) {
    let result1 = emberNotificationIsEqual('string1', 'string1');
    let result2 = emberNotificationIsEqual('string2', 'string1');
    let result3 = emberNotificationIsEqual(24, 24);
    assert.equal(result1, true);
    assert.equal(result2, false);
    assert.equal(result3, true);
});
