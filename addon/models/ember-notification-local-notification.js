import DS from 'ember-data';

export default DS.Model.extend({
    title: DS.attr('string'),
    description: DS.attr('string'),
    // status should be 'succcess' 'pending' failed'
    status: DS.attr('string'),
    errors: DS.hasMany('ember-notification-local-error')
});
