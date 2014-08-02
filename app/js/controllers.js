'use strict';

/* Controllers */
angular.module('myApp.controllers', [])

.controller('ClockController', ['$scope', 'formats', 'quotes',
    function($scope, formats, quotes) {

        $scope.settings = {
            running: false,
            sound: true,
            repeat: true,
            minutes: null,
            tickTime: 1000, // 1000 = once a second
            roundNumber: 0,
            formats: []
        };

        quotes.add('foobar');
        $scope.quotes = quotes.quips();

        quotes.add('barvoo');

        $scope.modalShown = false;

        $scope.toggleModal = function() {
            $scope.modalShown = !$scope.modalShown;
        };

        var $settings = $scope.settings;

        $settings.formats = formats.query();

        console.log($settings.formats);

        //console.log($settings.formats[0]);

        $scope.ConvertTime = function(seconds) {
            var hours = Math.floor(seconds / 3600);
            var minutes = Math.floor((seconds - (hours * 3600)) / 60);
            var seconds = seconds - (hours * 3600) - (minutes * 60);

            if (hours < 10) {
                hours = "0" + hours;
            }
            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            if (seconds < 10) {
                seconds = "0" + seconds;
            }
            return {
                hours: hours,
                minutes: minutes,
                seconds: seconds
            };
        };

        $scope.reset = function() {
            var seconds = $settings.minutes * 60;
            $scope.timeLeft = $scope.ConvertTime(seconds);
            $scope.seconds = seconds;
        }

        var minutes = $settings.minutes;
        $scope.seconds = minutes * 60;

        $scope.timeLeft = $scope.ConvertTime($scope.seconds);

        var interval = setInterval(function() {
            //console.log('hey', $scope.timeLeft);
            if ($settings.running && $scope.seconds >= 0) {
                $scope.pauseButtonText = 'pause';

                $scope.timeLeft = $scope.ConvertTime($scope.seconds);

                $scope.$apply();

                $scope.seconds--;
            }

            if ($settings.running && $scope.seconds == 0 && $settings.repeat) {
                $scope.reset();
            }
        }, $settings.tickTime);
    }
])

.controller('structureController', ['$scope', 'People', 'roundsFactory', 'quotes',
    function($scope, People, roundsFactory, quotes) {
        $scope.people = People.query();

        //$scope.speak = true;
        $scope.headings = ['#', 'time', 'little', 'big', 'ante'];
        // $scope.numberOfFormats = $scope.formats.split('\n').length;
        console.log($scope.formats);
        $scope.formats = $('#preset').html();
        $scope.quotes = quotes.quips();
        $scope.totalTime = null;


        $scope.say = function(message) {
            if ($scope.speak) {
	        	quotes.say(message);
            }

            return this;
        }


        //$scope.speak = true;

        // $scope.randomQuote = function() {
        //     $scope.quoteIndex = Math.floor(Math.random() * $scope.quotes.length) + 0;
        //     $scope.say($scope.quotes[$scope.quoteIndex]);
        // }



        var formatTemplate = roundsFactory.template();

        $scope.showFormats = function() {
            var formats = $scope.formats.split('\n');

            $scope.totalTime = 0;
            $scope.rounds = roundsFactory.rounds(formats);

            if ($scope.currentRoundIndex < 0) {
                $scope.currentRoundIndex = 0;
            } else if ($scope.currentRoundIndex >= $scope.rounds.length) {
                $scope.currentRoundIndex = $scope.rounds.length - 1;
            }
            $scope.currentRound = $scope.rounds[$scope.currentRoundIndex];

            console.log(formats);

        }
        $scope.showFormats();
        $scope.currentRoundIndex = 0;

        quotes.randomQuote();
    }
])

.controller('settingsController', ['$scope', 'People', 'quotes',
    function($scope, People, quotes) {

        $scope.stuff = People.query();

        $scope.orderByField = 'age';

        $scope.addQuote = function(quote){
        	quotes.say(quote);
        	quotes.add(quote);
        }



        console.log($scope);

    }
]);
