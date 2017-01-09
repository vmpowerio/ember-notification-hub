import Ember from 'ember';

export function emberNotificationAnd(params) {
    return params[0] && params[1];
}

export default Ember.Helper.helper(emberNotificationAnd);
