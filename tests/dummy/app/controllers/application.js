import Ember from 'ember';

export default Ember.ObjectController.extend({

	showFilePicker: false,

	actions : {
		showPicker: function() {
			this.set('showFilePicker', true);
		},
		hidePicker: function() {
			this.set('showFilePicker', false);
		},
		fileSelected: function(data) {
			this.send('hidePicker', data);
		},
		onClose: function() {
			this.send('hidePicker');
		},
		onError: function(error) {
			this.send('hidePicker', error);
		}
	}

});