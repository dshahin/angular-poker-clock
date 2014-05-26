'use strict';

/* Services */


angular.module('myApp.services', [])
	//register version
	.value('version', '0.1')
	//create peole resource
  	.factory('People', ['$resource',function($resource){
    	return $resource('json/people.json', {}, {
      		query: {
      			method:'GET', 
      			isArray:true
      		}
  		});
	  }])
    .factory('formats', ['$resource',function($resource){
      return $resource('json/formats.json', {}, {
          query: {
            method:'GET', 
            isArray:true
          }
      });
    }]);


