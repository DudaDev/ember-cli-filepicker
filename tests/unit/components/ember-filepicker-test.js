import {
    moduleForComponent,
    test
}
from 'ember-qunit';
import Ember from 'ember';

moduleForComponent('ember-filepicker', {
    // specify the other units that are required for this test
    needs: ['service:filepicker']
});

test('it renders', function(assert) {
    assert.expect(2);

    // creates the component instance
    var component = this.subject();
    assert.equal(component._state, 'preRender');

    // renders the component to the page
    this.render();
    assert.equal(component._state, 'inDOM');
});

test('it opens filepicker on component element insertion', function(assert) {
    return new Ember.RSVP.Promise(function(resolve, reject){
        var subscriber,
            interval = 100,
            counter = -1 * interval,
            timeout = 10000;

        subscriber = window.setInterval(function(){
            counter += interval;
            if (timeout > counter) {
                if ($('#filepicker_dialog').length === 1) {
                    resolve();
                    window.clearInterval(subscriber);
                }
            } else {
                reject();
                window.clearInterval(subscriber);
            }
        }, interval);
    }).then(function(){
        assert.ok(true);
    }).catch(function(){
        assert.ok(false, 'Filepicker dialog did not load on component element insertion');
    });
});