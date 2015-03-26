import config from '../config/environment';
import injectScript from 'ember-inject-script';
import Ember from 'ember';

var resolveFn;

export default (Ember.Service || Ember.Object).extend({
	init: function() {
		injectScript(this.get('scriptURL')).then(function() {
			filepicker.setKey(this.get('key'));
			this.set('instance', filepicker);
			resolveFn(filepicker);
		}.bind(this));
	},
	key: config.filepickerKey || config.APP.filepickerKey,
	scriptURL : '//api.filepicker.io/v1/filepicker.js' || config.filepickerURL || config.APP.filepickerURL,
	promise: new Ember.RSVP.Promise(function(resolve, reject) {
		resolveFn = resolve;
	}),
	instance: null 
});