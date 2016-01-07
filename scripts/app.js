var myApp = angular.module('myApp',[]);

myApp.controller('myController',function($scope){
    $scope.names=['Fraser','Mollie','Jeff','Steve','Abba'];
    $scope.search = function(){
        console.log("Searching... not.");  
        var url = "callback=?https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/V001/?      key=367780BAA81ACCAA8F08F8DF9F6E5D8C&account_id=76561198033641928&matches_requested=1";
        $.getJSON(url,function data(){
           console.log(data); 
        });
    }
});