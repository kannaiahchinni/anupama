(function(){
		// Defining angular module 
	
	angular.module('underscore', []).factory('_', function() {
	  return window._;
	});
	
	angular.module('webapp',['ui.router','underscore','ngAnimate', 'ui.bootstrap']);	
	console.log('created module with dependencies ');
	
	
	
	
})();