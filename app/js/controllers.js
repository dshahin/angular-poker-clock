'use strict';

/* Controllers */
angular.module('myApp.controllers',  [])
	
	.controller('ClockController', ['$scope','formats', function($scope, formats) {


		$scope.settings = {
			running : false,
			sound : true,
			repeat : true,
			minutes : null,
			tickTime : 1000,  // 1000 = once a second
			roundNumber : 0,
			formats : []
		};

		$scope.modalShown = false;
		
		$scope.toggleModal = function() {
		    $scope.modalShown = !$scope.modalShown;
		};

		var $settings = $scope.settings;

		$settings.formats = formats.query();

		console.log($settings.formats);

		//console.log($settings.formats[0]);

		$scope.ConvertTime = function(seconds){
			var hours = Math.floor(seconds / 3600);
		    var minutes = Math.floor((seconds - (hours * 3600)) / 60);
		    var seconds = seconds - (hours * 3600) - (minutes * 60);

		    if (hours < 10) { hours = "0" + hours; }
		    if (minutes < 10) { minutes = "0" + minutes; }
		    if (seconds < 10) { seconds = "0" + seconds; }
		    return {hours : hours , minutes : minutes , seconds : seconds};
		};

		$scope.reset = function(){
			var seconds = $settings.minutes * 60;
			$scope.timeLeft = $scope.ConvertTime(seconds);
			$scope.seconds = seconds;
		}

		var minutes = $settings.minutes	;
		$scope.seconds = minutes * 60;
		
		$scope.timeLeft = $scope.ConvertTime($scope.seconds);
		
		var interval = setInterval(function(){
			//console.log('hey', $scope.timeLeft);
			if($settings.running && $scope.seconds >= 0){
				$scope.pauseButtonText = 'pause';
				
				$scope.timeLeft = $scope.ConvertTime($scope.seconds);
				
				$scope.$apply();

				$scope.seconds--;
			}

			if($settings.running && $scope.seconds == 0 && $settings.repeat){
				$scope.reset();
			} 	
		}, $settings.tickTime);
	}])
	
	.controller('MyCtrl2', ['$scope', 'People', function($scope, People) {
		$scope.people = People.query();
	}])

	.controller('MyCtrl3', ['$scope',  'People',  function($scope,  People) {

		$scope.stuff = People.query();

		$scope.orderByField = 'age';
 
	}]);





