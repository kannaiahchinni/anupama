(function(){

	/**
	*  Module
	*
	* Description
	*/
/*	angular.module('webapp').constant('Index',[function (){
				var cantoData= this;
				cantoData.cantos = [];
				cantoData.isCalled = false;
				cantoData.slokas =[];

	}]);*/
	console.log('inside of constant declaration ');
	
	angular.module('webapp').value('Index',{
		cantos :[],
		isCalled:'',
		slokas :[]

});
})();