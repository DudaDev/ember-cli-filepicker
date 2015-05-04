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
	options : {},
	filepicker: Ember.inject ? Ember.inject.service() : null,
	openFilepicker: function() {
		Ember.run.scheduleOnce('afterRender', this, function(){
			this.get('filepicker.promise').then(Ember.run.bind(this, function(filepicker) {
				var options = this.get('options');
        if (options && options.useStore) {
            filepicker.pickAndStore(
              options.picker,
              options.store,
              Ember.run.bind(this, this.handleSelection),
              Ember.run.bind(this, this.handleError)
            );
        }
        else {
          filepicker.pick(
            options.picker,
            Ember.run.bind(this, this.handleSelection),
            Ember.run.bind(this, this.handleError)
          );
        }
			}));
		});
	}.on('didInsertElement')
});
