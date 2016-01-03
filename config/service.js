(function(){

	console.log('inside of service ');
	angular.module('webapp').factory('service',['Index','$http',function (Index,$http) {
		
		var service ={
				cantos:[],
				isCalled:false,
				slokas:[]
				
		};

		return {
			getSlokaIndex : function(){
				return $http.get('json/completeIndex.json');
				/*$http.get('json/completeIndex.json').success(function(data){
					service.cantos = data[0];
					console.log(service.cantos);
					service.isCalled = true;
				}).error(function(){
					console.log('error');
				});*/
			},
			getAllSlokas : function(){
				/*$http.get('json/completeCantos.json').success(function(data){
					service.slokas = data[0];
					service.isCalled = true;
				}).error(function(){
					console.log('error');
				});*/

				return $http.get('json/completeCantos.json');
			},
			getCantoIndex : function(){
				console.log(service.cantos);
				return service.cantos;
			},
			getSlokas : function(){
				return service.slokas;
			}
			
		}
		
		return service;
	}]);
	console.log('inside of service ');
})();