import {
	moduleFor,
	test
}
from 'ember-qunit';
import Ember from 'ember';

moduleFor('service:filepicker', {
	// Specify the other units that are required for this test.
	// needs: ['service:foo']
});

// Replace this with your real tests.
test('it exists', function(assert) {
	var service = this.subject();
	assert.ok(service);
});

test('it resolves the promise ', function(assert) {
	assert.expect(3);

	var service = this.subject();
	var promise = service.get('promise');

	assert.ok(promise instanceof Ember.RSVP.Promise, "promise' value is not an intance of proper RSVP.Promise");

	return promise.then(function(filepicker) {
		assert.ok(!!filepicker, 'Resolved a falsy value as filepicker');
		assert.equal(typeof filepicker.pick, "function", 'The resolved filepicker object does not have pick method');
	});
});

test('it returns a proper filepicker instance', function(assert) {
	var service = this.subject();
	return service.get('promise').then(function(filepicker) {
		assert.equal(service.get('instance'), filepicker, "'instance' value is not the resolved filepicker object");
	});
});

test('it fails when script url is wrong', function(assert) {
	var service = this.subject({
		scriptURL: '//not-a-filepicker.com/script.js',
		scriptLoadTimeout: 500
	});
	var promise = service.get('promise');
	return promise.then(function() {
			assert.ok(false, "Promise resolved successfully while it shouldn't have");
		})
		.catch(function(error) {
			assert.ok(!!error);
		});
});

test("unless promise resolved, 'instance' is null", function(assert) {
	var service = this.subject();
	assert.ok(service.get('instance') === null, "'instance' value is not null even without promise resolution");
});