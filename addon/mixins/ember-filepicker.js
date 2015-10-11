import Ember from 'ember';

var isServiceInjectionSupported = Ember.inject && Ember.inject.service;

var PICK_METHOD_NAME = 'pick',
	PICK_MULTIPLE_METHOD_NAME = 'pickMultiple',
	PICK_AND_STORE_METHOD_NAME = 'pickAndStore';

export default Ember.Mixin.create({
	injectFilepickerService: Ember.on('init', function() {
		if (!isServiceInjectionSupported) {
			this.set('filepicker', this.container.lookup('service:filepicker'));
		}
	}),

	handleSelection: function(data) {
		if (this.get('onSelection')) {
			this.sendAction('onSelection', data);
		}
	},
	handleError: function(data) {
		if (data.code === 101 && this.get('onClose')) {
			this.sendAction('onClose');
		} else if (this.get('onError')) {
			this.sendAction('onError', data);
		}
	},
	onSelection: null,
	onError: null,
	onClose: null,
	options: null,
	pickerOptions: {},
	storeOptions: null,
	multiple: false,
	filepicker: Ember.inject ? Ember.inject.service() : null,
	openFilepicker: Ember.on('didInsertElement', function() {
		Ember.run.scheduleOnce('afterRender', this, function() {
			this.get('filepicker.promise').then(Ember.run.bind(this, function(filepicker) {
				var pickerOptions, storeOptions,
					options = this.get('options'),
					usePickAndStore,
					filepickerMethod,
					args = [];

				if (options) {

					pickerOptions = options.picker;
					storeOptions = options.store;
					usePickAndStore = (pickerOptions && options.useStore);
					Ember.deprecate("'options' was passed instead of 'pickerOptions' and possibly 'storeOptions'. The options parameter has been split into these parameters.");

				} else {

					pickerOptions = this.get('pickerOptions');
					storeOptions = this.get('storeOptions');
					usePickAndStore = (pickerOptions && storeOptions);

				}

				if (usePickAndStore) {

					if (this.get('multiple') && (pickerOptions && !pickerOptions.multiple)) {
						pickerOptions = Ember.merge({
							multiple: true
						}, pickerOptions);
					}
					filepickerMethod = PICK_AND_STORE_METHOD_NAME;
					args.push(pickerOptions);
					args.push(storeOptions);

				} else {
					args.push(pickerOptions);
				}

				args.push(Ember.run.bind(this, this.handleSelection));
				args.push(Ember.run.bind(this, this.handleError));

				if (!filepickerMethod) {
					if (this.get('multiple')) {
						filepickerMethod = PICK_MULTIPLE_METHOD_NAME;
					} else {
						filepickerMethod = PICK_METHOD_NAME;
					}
				}

				filepicker[filepickerMethod].apply(filepicker, args);
			}));
		});
	})

});
