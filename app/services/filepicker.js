import config from '../config/environment';
import injectScript from 'ember-inject-script';
import Ember from 'ember';


export default (Ember.Service || Ember.Object).extend({

	_isPromiseFulfilled: false,
	_initFilepicker: Ember.on('init', function() {
		var _resolveFn, _rejectFn,
			_isPromiseFulfilled = false;
			
		this.set('promise', new Ember.RSVP.Promise(function(resolve, reject) {
			_resolveFn = resolve;
			_rejectFn = reject;
		}));

		injectScript(this.get('scriptURL'))
			.then(Ember.run.bind(this, function() {
				var filepicker = window.filepicker;
				if (filepicker && filepicker.pick) {
					filepicker.setKey(this.get('key'));
					if (!(this.isDestroyed || this.isDestroying)) {
						this.set('instance', filepicker);	
					}
					_resolveFn.call(null, filepicker);	
					_isPromiseFulfilled = true;
				} else {
					_rejectFn.call(null, new Error("Could not load filepicker. Please check 'scriptURL' directs to filepicker script."));
				}
				
			}))
			.catch(Ember.run.bind(this, function(error) {
				_rejectFn.call(null, error);
			}));

		Ember.run.later(this, function(){
			if (!_isPromiseFulfilled){
				_rejectFn.call(null, new Error('Filepicker script load timeout.'));
			}
		}, this.get('scriptLoadTimeout'));

	}),
	key: config.filepickerKey || config.APP.filepickerKey,
	scriptURL : config.filepickerURL || config.APP.filepickerURL || '//api.filepicker.io/v2/filepicker.js',
	scriptLoadTimeout: config.filepickerScriptLoadTimeout || config.APP.filepickerScriptLoadTimeout || 10000,
	promise: null,
	instance: null
});
