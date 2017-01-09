// is-equal helper is necessary to determine which option is currently selected.
import Ember from 'ember';

export function emberNotificationNot(params) {
    return !params[0];
}

export default Ember.Helper.helper(emberNotificationNot);
