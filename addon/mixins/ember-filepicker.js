import Ember from 'ember';

export default Ember.Mixin.create({
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

	show: function() {
		filepicker.pick(
			this.get('options'),
			this.handleSelection.bind(this),
			this.handleError.bind(this)
		);
	}.on('didInsertElement')
});