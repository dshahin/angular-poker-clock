'use strict';

/* Directives */


angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]).

  directive('appFoo', [ function() {
    
    	return {
	      restrict: 'AE',
	      replace: 'true',
	      templateUrl: 'partials/foo-bar.html'
	  };
    
  }]).

  directive('format', [ function() {
    
    	return {
	      restrict: 'AE',
	      replace: 'true',
	      templateUrl: 'partials/format-template.html',
	      link :function(scope, elem, attrs){
	      		console.log(attrs.foo);
	      },
	      controller: function($scope, $compile, $http) {
	      // $scope is the appropriate scope for the directive
		      this.addChild = function(appRound) { 
		        console.log('Got the message from nested directive:' + appRound.message);
		      };
	      }
	  };
    
  }]).

  directive('appRound', [ function() {
    
    	return {
	      restrict: 'AE',
	      replace: 'true',
	      require: '^format',
	      templateUrl: 'partials/round-template.html',
	      link :function(scope, elem, attrs){
	      		console.log(attrs);
	      }
	  };
    
  }]).

  directive('modalDialog', function() {
	  return {
	    restrict: 'E',
	    scope: {
	      show: '='
	    },
	    replace: true, // Replace with the template below
	    transclude: true, // we want to insert custom content inside the directive
	    link: function(scope, element, attrs) {
	      scope.dialogStyle = {};
	      if (attrs.width)
	        scope.dialogStyle.width = attrs.width;
	      if (attrs.height)
	        scope.dialogStyle.height = attrs.height;
	      scope.hideModal = function() {
	        scope.show = false;
	      };
	    },
	    templateUrl: "partials/modal.html"// See below
	  };
	});
