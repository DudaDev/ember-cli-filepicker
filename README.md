# Ember-cli-filepicker

[![npm version](https://badge.fury.io/js/ember-cli-filepicker.svg)](http://badge.fury.io/js/ember-cli-filepicker)
[![Build Status](https://travis-ci.org/DudaDev/ember-cli-filepicker.svg)](https://travis-ci.org/DudaDev/ember-cli-filepicker) 
[![Ember Observer Score](http://emberobserver.com/badges/ember-cli-filepicker.svg)](http://emberobserver.com/addons/ember-cli-filepicker) 

## Installation

* `ember install:addon ember-cli-filepicker`

## Usage
* Create your filepicker.io key using the following URL: https://www.filepicker.io/.
* Add your filepicker.io key in your config/environment.js
```javascript
//config/environment.js 
module.exports = function(environment) {
  var ENV = {
    //...
    filepickerKey: '<your-filepicker-key>'
  };
//...
```
* Use the filepicker.io documentation for options like extensions and services.
* In your template:
```handlebars
{{ember-filepicker pickerOptions=pickerOptions onSelection='fileSelected' onClose='onClose' onError='onError'}}
```
* The above will use the pick method.
* You should pass pickerOptions with the pick options (mimetype, services, etc).

* If you want to use [pickAndStore](https://www.filepicker.com/documentation/file_ingestion/javascript_api/pick_and_store?v=v2), also pass storeOptions (location, etc):
```handlebars
{{ember-filepicker pickerOptions=pickerOptions storeOptions=storeOptions onSelection='fileSelected' onClose='onClose' onError='onError'}}
```
* If you want to use [pickMultiple](https://www.filepicker.com/documentation/file_ingestion/javascript_api/pick_multiple?v=v2) files (without storing them), pass multiple=true :
```handlebars
{{ember-filepicker pickerOptions=pickerOptions multiple=true onSelection='fileSelected' onClose='onClose' onError='onError'}}
```


## Notes
In order to have access to the `filepicker` instance you can:
* If `Ember.inject.service` is supported then in your object you can use:
```javascript
export default Ember.Component.extend({
	//injecting the filepicker object
	filepicker: Ember.inject.service(),

	someFunction: function(){
		//Use the promise in case you are not sure that your component will be surly initialized after filepicker has been loaded
		this.get('filepicker.promise').then(function(filepicker){
			//do something with filepicker
		});

		//OR if you are sure filepicker has already been loaded use:
		this.get('filepicker.instance')
	}
});
```
* Otherwise, you can use the lookup method:
```javascript
export default Ember.Component.extend({
	//injecting the filepicker object
	filepicker: Ember.inject.service(),

	someFunction: function(){
		var filepicker = this.container.lookup('service:filepicker');
		//do something with the filepicker.instance or filepicker.promise
	}
});
```

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
