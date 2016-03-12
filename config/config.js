(function(){
	angular.module('webapp').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider,$urlRouterProvider) {
		console.log('router configuration loaded here ...');
		$stateProvider.state('/',{
			url:'/',
			templateUrl:'html/index.html'
		}).state('preface',{
			url:'/preface',
			templateUrl:'html/preface.html'
		}).state('about',{
			url:'/about',
			templateUrl:'html/about.html'
		}).state('contact',{
			url:'/contact',
			templateUrl:'html/contact.html'
		}).state('home',{
			url:'/home',
			templateUrl:'html/home.html'
		}).state('summary',{
			url:'/summary',
			templateUrl:'html/summary.html'
		}).state('home.slokas',{
			url:'/slokas',
			templateUrl:'html/sv1/allslokas.html'
		}).state('poet',{
			url:'/poet',
			templateUrl:'html/poet.html'
		}).state('epic',{
			url:'/epic',
			templateUrl:'html/epic.html'
		})
		$urlRouterProvider.otherwise('/');
	}]).run(function($state, $rootScope,Index,service){
		$("#menu-toggle").click(function(e) {
			console.log("clicked");
         e.preventDefault();
         $("#wrapper").toggleClass("toggled");
        /* $('[data-toggle="tooltip"]').tooltip(); */
         
         function toggleChevron(e) {
        	    $(e.target)
        	        .prev('.panel-heading')
        	        .find("i.indicator")
        	        .toggleClass('glyphicon-chevron-down glyphicon-chevron-up');
        	}
        	$('#accordion').on('hidden.bs.collapse', toggleChevron);
        	$('#accordion').on('shown.bs.collapse', toggleChevron);
        	console.log("calling service");
         Index = service.getData();
         
     });
	}).filter('highlight', function($sce) {
	    return function(text, phrase) {
	        if (phrase) text = text.replace(new RegExp('('+phrase+')', 'gi'),
	          '<span class="highlighted">$1</span>')

	        return $sce.trustAsHtml(text);
	      }
	});

	
	
	
	
})();

