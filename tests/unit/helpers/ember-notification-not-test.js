import {
    emberNotificationNot
} from 'dummy/helpers/ember-notification-not';
import {
    module,
    test
} from 'qunit';

module('Unit | Helper | ember notification not');

// Replace this with your real tests.
test('it works', function (assert) {
    let result1 = emberNotificationNot([true]);
    let result2 = emberNotificationNot([false]);
    assert.equal(result1, false);
    assert.equal(result2, true);
});
