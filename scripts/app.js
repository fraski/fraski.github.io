var myApp = angular.module('myApp',[]);

myApp.controller('myController',function($scope){
    $scope.names=['Fraser','Mollie','Jeff','Steve','Abba'];
    $scope.search = function(){
        console.log("Searching... not.");
        $.getJson('http://mc8.org/fraz/apicall.php',data,function(jsonData){
              console.log(jsonData);
            });
    }
});
