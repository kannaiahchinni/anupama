(function(){
	
	angular.module('webapp').controller('homeCtrl',['$scope', '$location','$http','_','Index','service','$modal',function($scope,$location,$http,_,Index,service,$modal){
				
		$scope.cantoIndex = []; // this array to hold the sloka index objects. 
		$scope.completeSlokas = [];
		
		$scope.chapters =[];
		$scope.slokas = [];
		$scope.showSearchBar = false;
		$scope.canto =1;
		$scope.canto1 =[];
		$scope.htmlname = "";
		
		$scope.sloka = true;
		$scope.summary=false;
		$scope.allSlokas = true;
		$scope.searchBar = true;
		$scope.showModal = false;
		
		$scope.active ="";
		
		
		$scope.slokaInfo =[];
		
		//$scope.summaryFileName = "html/SV-1/summary.html";
			$scope.home = function(){
			//console.log("navigating to home page ");	
			$location.path("/home/slokas");
			console.log($scope.showSummary);
			
		}
			$scope.load = function(sno,sloka){
				var num = parseInt(sloka.slokaNo);
				$scope.active = num;
				console.log($scope.active);
				var file ="" , canto ="";
				if(sloka.sloka != "Summary"){
					$scope.summary=false;
					$scope.sloka = true;
						$scope.showInterface = true;
						$scope.searchBar = false;
					$scope.showSummary = false; //hiding summary division to show sloka information 
					var cls="."+sno+"."+num;
				_.each($scope.chapters, function(s){
					if(parseInt(s.slokaNo) == num){
						$scope.slokas = [];
						var format = ["I","II","III"];
						$scope.slokas.push(s);
						$scope.showSearchBar = true;
						 file = "SV-".concat(num);
						 canto = "SV-".concat(format[sno-1]);
						$scope.htmlname = "html/"+canto+"/"+file+"/"+file+".html";
					}
				});
				
				}else{
					$scope.summary = true;
					$scope.sloka = false;
					//$scope.show = false;
					$scope.summaryFileName = "html/SV-"+sno+"/summary.html";
					// $("."+sno+".0").addClass("active");
				//	$scope.showSearchBar = false;
				//	$scope.slokas = $scope.chapters;
				}
				
				
				//console.log($scope.slokas.length);
			}
		
		$scope.init = function(){
			
			service.getSlokaIndex().success(function(data){
				$scope.cantoIndex = data[0];
			});
			
			service.getAllSlokas().success(function(data){
				$scope.completeSlokas = data;
				console.log(data);
				$scope.slokas = $scope.completeSlokas[0].canto1;
				$scope.chapters = angular.copy($scope.slokas);
				console.log(angular.toJson($scope.completeSlokas.canto2));
			});
						
		}
		$scope.init();
		
		
		/*$scope.loadCantos = function(){
			console.log("inside of loadCantos method ..");
			console.log(angular.toJson($scope.cantoIndex));
			
			if(!Index.isCalled){
				$http.get('json/completeIndex.json').success(function(data){
					Index.cantos = data[0];
					$scope.canto1 = Index.cantos;
					Index.isCalled = true;
				}).error(function(){
					console.log('error');
				});
			}else{
				$scope.canto1 = Index.cantos;
			}
			console.log("Index.isCalled value "+ Index.isCalled);
			console.log($scope.canto1);
		}*/
		
		$scope.showAllSlokas = function(chapter){
			$scope.sloka = true;
			$scope.showInterface = false;
			//$location.path("home/slokas");
			$scope.searchBar = true;
			$scope.loadData(chapter);
			console.log('inside of all slokas');
			$scope.summary = false;
		}
		
		$scope.showPopUp = function(num,sloka){
			var format = ["I","II","III"];
			 var file = "SV-".concat(num);
			var canto = "SV-".concat(format[$scope.canto-1]);
			filename = "html/"+canto+"/"+file+"/"+file+".html";
			$scope.fileName = filename;
			$scope.slokaText= sloka;
			filename = "html/translate.html";
			console.log('filename : '+ filename);
			console.log('filename '+ $scope.fileName);
			console.log($scope.canto);
			 //$scope.showModal = !$scope.showModal;
			 $modal.open({
				 templateUrl:filename,
				/*template:'<div class="model"><div class="modal-header">Translation</div>'
					+'<div class="modal-body">'
					+'<div ng-include="\'fileName\'"></div>'
					+'</div></div>',*/
				size:'lg',
				controller:'modelController',
				resolve:{
					fileName:function(){
						return $scope.fileName;
					},
					sloka: function(){
						return $scope.slokaText;
					}
				}
				
			});
			 console.log('filename : '+ filename);
			 $('.modal-body').load(filename);
			 console.log('filename : '+ filename);
		}
		
		$scope.loadData = function(no){
			console.log(no);
			$scope.canto = no;
			if(no ==1){
				$scope.slokas = $scope.completeSlokas[0].canto1;
			}
			else if(no ==2){
				$scope.slokas = $scope.completeSlokas[1].canto2;
			}else if(no == 3){
				$scope.slokas = $scope.completeSlokas[2].canto3;
			}
			//$scope.slokas = $scope.completeSlokas.canto1;
			$scope.chapters = angular.copy($scope.slokas);
		}
		
		//$scope.loadCantos();
			
	}]).controller('modelController',['$modalInstance','fileName','$scope','sloka','$log',function($modalInstance,fileName,$scope,sloka,$log){
	
		$scope.fileName = fileName;
		$scope.slokaText = sloka;
		$log.info($scope.fileName);
	 	$log.info($scope.slokaText);	
		$scope.close = function(){
			$modalInstance.dismiss();
		}
		
	}]).controller('summaryCtrl',['$scope','$log',function($scope,$log){
		
		$log.info('inside of summaryCtrl ');
		$scope.current = "sloka1";
/*		$scope.$watch(current,function(){
			$log.info($scope.current);
		});
*/		
		$scope.active = function(val){
			$scope.current = val;
			$log.info($scope.current);
		}
		
	}])
	
	;/*.directive('modal', function () {
	    return {
	        template: '<div class="modal fade">' + 
	            '<div class="modal-dialog">' + 
	              '<div class="modal-content">' + 
	                '<div class="modal-header">' + 
	                  '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' + 
	                  '<h4 class="modal-title">{{ title }}</h4>' + 
	                '</div>' + 
	                '<div class="modal-body" ng-transclude></div>' + 
	              '</div>' + 
	            '</div>' + 
	          '</div>',
	        restrict: 'E',
	        transclude: true,
	        replace:true,
	        scope:true,
	        link: function postLink(scope, element, attrs) {
	          scope.title = attrs.title;

	          scope.$watch(attrs.visible, function(value){
	            if(value == true)
	              $(element).modal('show');
	            else
	              $(element).modal('hide');
	          });

	          $(element).on('shown.bs.modal', function(){
	           // scope.$apply(function(){
	              scope.$parent[attrs.visible] = true;
	           // });
	          });

	          $(element).on('hidden.bs.modal', function(){
	           // scope.$apply(function(){
	              scope.$parent[attrs.visible] = false;
	            //});
	          });
	        }
	      };
	    });*/
	
})();
