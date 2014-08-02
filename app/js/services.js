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
    })

    .factory('quotes',[function($scope){
        var factory = {};
        //var quips = ['shuffle up and deal', 'cards in the air', 'giddyup'];
        var quips = [];
        return {
            quips : function(){
            return quips;
          },
          say : function(message) {
              window.speechSynthesis.speak(new SpeechSynthesisUtterance(message));
          },
          add : function(quip){
            quips.push(quip);
          },
          randomQuote : function() {
            var quoteIndex = Math.floor(Math.random() * quips.length) + 0;
            this.say(quips[quoteIndex]);
          }
        }
        return factory;
    }]);


