
import injectScript from 'ember-inject-script';

export default {
	name: 'filepicker',
    initialize: function(container, application) {

		var key = application.filepickerKey,
            url = "//api.filepicker.io/v1/filepicker.js",
            promise = injectScript(url).then(function() {
                filepicker.setKey(key);
                return filepicker;
            });

        application.register('ember-cli-filepicker:api', promise, {instantiate: false});
        application.inject('component:ember-filepicker', 'filepicker', 'ember-cli-filepicker:api');
    }
};