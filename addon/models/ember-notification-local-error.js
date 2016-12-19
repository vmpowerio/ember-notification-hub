import DS from 'ember-data';

export default DS.Model.extend({
    code: DS.attr('string'),
    title: DS.attr('string')
});
