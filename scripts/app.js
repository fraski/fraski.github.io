var myApp = angular.module('myApp',[]);

myApp.controller('myController',function($scope){
    $scope.names=['Fraser','Mollie','Jeff','Steve','Abba'];
    $scope.search = function(){
        console.log("Searching... not.");  
        $.getJson('url',data,function(jsonData)){                       
              console.log(jsonData);   
            });
    }
});