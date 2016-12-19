import {
    emberNotificationAnd
} from 'dummy/helpers/ember-notification-and';
import {
    module,
    test
} from 'qunit';

module('Unit | Helper | ember notification and');

// Replace this with your real tests.
test('it performs AND operations', function (assert) {
    let result1 = emberNotificationAnd([true, true]);
    let result2 = emberNotificationAnd([false, true]);
    let result3 = emberNotificationAnd([false, false]);
    assert.equal(result1, true);
    assert.equal(result2, false);
    assert.equal(result3, false);
});
