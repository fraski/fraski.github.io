// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var myApp = angular.module('starter', ['ionic'])

myApp.controller('gameCtrl', function ($scope) {
     listOfBalls = [0, 0, 0];
     $scope.currentSpell = 10;
     $scope.answerSpell = 10;
     $scope.time = 0;
     $scope.score = 0;
     gameInProgress = false;
     $scope.stats = [0, 0]; //stats will be as follows: keys pressed,spells invoked
     $scope.listOfAllSpells = ["cold-snap", "ghost-walk", "ice-wall", "emp", "tornado", "alacrity", "sun-strike", "forge-spirit", "chaos-meteor", "deafening-blast","nothing"]
     var currentCountDown;
     var countDownValue;
     
     $scope.addOrb = function (ball) {
         
         switch (ball) {
             case 1:
                 changeAllOrbs("quas");
                 break;
             case 3:
                 changeAllOrbs("wex");
                 break;
             case 6:
                 changeAllOrbs("exort");
                 break;
         }
         listOfBalls[0] = listOfBalls[1];
         listOfBalls[1] = listOfBalls[2];
         listOfBalls[2] = ball;
         $scope.stats[0] = $scope.stats[0] + 1;
     }

     function changeAllOrbs(ball) {
         document.getElementById('ballOne').src = document.getElementById('ballTwo').src;
         document.getElementById('ballTwo').src = document.getElementById('ballThree').src;
         document.getElementById('ballThree').src = "img/invoker-" + ball + ".png";
     }

     $scope.invoke = function () {
         if (listOfBalls[0] != 0 && listOfBalls[1] != 0 && listOfBalls[2] != 0) {
             theSpell = listOfBalls[0] + listOfBalls[1] + listOfBalls[2];
             switch (theSpell) {
                 case 3:
                     $scope.currentSpell = 0;
                     break;
                 case 5:
                     $scope.currentSpell = 1;
                     break;
                 case 7:
                     $scope.currentSpell = 4;
                     break;
                 case 8:
                     $scope.currentSpell = 2;
                     break;
                 case 9:
                     $scope.currentSpell = 3;
                     break;
                 case 10:
                     $scope.currentSpell = 9;
                     break;
                 case 12:
                     $scope.currentSpell = 5;
                     break;
                 case 13:
                     $scope.currentSpell = 7;
                     break;
                 case 15:
                     $scope.currentSpell = 8;
                     break;
                 case 18:
                     $scope.currentSpell = 6;
                     break;
             }
             $scope.stats[0] = $scope.stats[0] + 1;
             $scope.stats[1] = $scope.stats[1] + 1;
         }

     }
     $scope.startGame = function() {
         if (gameInProgress != true) {
             document.getElementById('restartGame').style.visibility = "visible";
             gameInProgress = true;
             resetGame();
             $scope.time = 30;
             $scope.score = 0;
             currentCountDown = createCountDown(30000);
             countDownValue = currentCountDown();
             newSpell();
             requestAnimationFrame(doGame);
         }
     }
     function newSpell() {
         randomNumber = Math.floor((Math.random() * 10));
         while (randomNumber == $scope.answerSpell) {
             randomNumber = Math.floor((Math.random() * 10));
             console.log(randomNumber);
         }
         $scope.answerSpell = randomNumber;
     }
     function doGame() {
         if (countDownValue > 0) {
             $scope.time = Math.round((countDownValue / 1000));
             countDownValue = currentCountDown();
             if ($scope.currentSpell == $scope.answerSpell) {
                 $scope.score = $scope.score + 1;
                 newSpell();
             }
             $scope.$apply();
             requestAnimationFrame(doGame);
         } else {
             gameInProgress = false;
             document.getElementById('restartGame').style.visibility = "hidden";
         }
     }
     function resetGame() {
         listOfBalls = [0, 0, 0]
         changeAllOrbs("nothing");
         changeAllOrbs("nothing");
         changeAllOrbs("nothing");
         $scope.currentSpell = 10;
         $scope.answerSpell = 10;
         $scope.stats = [0, 0];
     }
     $scope.restartGame = function () {
         gameInProgress = false;
         $scope.startGame();
     }
     function createCountDown(timeRemaining) {
         var startTime = Date.now();
         return function () {
             return timeRemaining - (Date.now() - startTime);
         }
     }
     function showGame() {
         document.getElementById('game').style.visibility = "visible";
     }

 })
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
