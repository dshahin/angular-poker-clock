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
    }])

    .factory('roundsFactory', function(){
        
        var factory ={};
        
        factory.template = function(){
          return {
            type: 'round',
            minutes: 0,
            little: 0,
            big: 0,
            ante: 0
          };
        }

        factory.rounds = function(formats){
          var formatTemplate = this.template();
          var rounds = [];
          angular.forEach(formats, function(format){
            var fields = format.split(/\s/);
            var newFormat = {};
            
            angular.copy(formatTemplate, newFormat);
            newFormat.minutes = fields[0];
            newFormat.little = fields[1];
            newFormat.big = fields[2];
            newFormat.ante = fields[3];
            rounds.push(newFormat);

            
          });
          return rounds;

        }
        return factory;
    });


