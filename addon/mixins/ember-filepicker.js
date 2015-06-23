import Ember from 'ember';

var isServiceInjectionSupported = Ember.inject && Ember.inject.service;

export default Ember.Mixin.create({
	injectFilepickerService: function(){
		if (!isServiceInjectionSupported){
			this.set('filepicker', this.container.lookup('service:filepicker'));
		}
	}.on('init'),
	handleSelection: function(data) {
		if (this.get('onSelection')) {
			this.sendAction('onSelection', data);
		}
	},
	handleError: function(data) {
		if (data.code === 101 && this.get('onClose')) {
			this.sendAction('onClose');
		}
		else if (this.get('onError')) {
			this.sendAction('onError', data);
		}
	},
	onSelection: null,
	onError: null,
	onClose: null,
	options: null,
	pickerOptions : {},
	storeOptions : null,
	filepicker: Ember.inject ? Ember.inject.service() : null,
	openFilepicker: Ember.on('didInsertElement', function() {
		Ember.run.scheduleOnce('afterRender', this, function() {
			this.get('filepicker.promise').then(Ember.run.bind(this, function(filepicker) {
				var pickerOptions, storeOptions;
				var options = this.get('options');
				var usePickAndStore;
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
					filepicker.pickAndStore(
						pickerOptions,
						storeOptions,
						Ember.run.bind(this, this.handleSelection),
						Ember.run.bind(this, this.handleError)
					);
				}
				else {
					filepicker.pick(
						pickerOptions,
						Ember.run.bind(this, this.handleSelection),
						Ember.run.bind(this, this.handleError)
					);
				}
			}));
		});
	})

});