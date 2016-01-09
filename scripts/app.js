var myApp = angular.module('myApp',[]);
var Player = function(account_id){
        console.log("Player Created");
        this.account_id = account_id;
};
Player.prototype.addHero = function(hero){
      this.hero = hero;
};
Player.prototype.addAccountInfo = function(info){
    this.account_info = info;
};
myApp.controller('myController',function($scope){
    $scope.match_id;
    $scope.match;
    $scope.matchData;
    $scope.players = [];
    $scope.names=['Fraser','Mollie','Jeff','Steve','Abba'];
    $scope.heroes;
    $scope.matchHeroes = [];
    $scope.gameInfo = [];
    $scope.search = function(){
        console.log("Searching... not.");
        $(function(){
            myurl = "http://mc8.org/fraz/apicall.php?type=GetPlayerSummaries&steamids="
            $.getJSON('http://mc8.org/fraz/apicall.php?type=GetMatchHistory',function(data){
                $scope.matchData = data;
                $scope.players = $scope.matchData.result.matches[0].players;
                $scope.match_id = $scope.matchData.result.matches[0].match_id;
                console.log($scope.players[0]);
                for(y = 0; y < 10; y++){
                    $scope.players[y].account_id = '765' + ($scope.players[y].account_id + 61197960265728);
                    if(y<9){
                        myurl += $scope.players[y].account_id +",";
                    }else{
                        myurl += $scope.players[y].account_id;
                    }
                    $scope.gameInfo.push(new Player($scope.players[y].account_id));
                }
                console.log(myurl);
                for(x = 0; x < 10; x++){
                    $scope.heroes.forEach(function(entry){
                        if(entry.id == $scope.players[x].hero_id)
                            {
                                console.log(entry);
                                $scope.matchHeroes.push(entry);
                                $scope.gameInfo[x].addHero(entry);
                            }
                    });
                }
                $scope.$apply();
            });
            $.getJSON(myurl,function(data){
                console.log(data);
                for(x=0;x <10; x++){
                    data.response.players.forEach(function(entry){
                        if($scope.gameInfo[x].account_id == entry.steamid){
                            console.log("Match");
                            $scope.gameInfo[x].addAccountInfo(entry);
                        }
                    });
                }
                console.log($scope.gameInfo);
                $scope.$apply();
            });
            
            $.getJSON("http://mc8.org/fraz/apicall.php?type=GetMatchDetails&match_id=" + $scope.match_id,function(data){
                console.log("HERE");
                $scope.match = data.result;
                console.log($scope.match);
                $scope.$apply();
            });
            
        });
    }
    
    $( document ).ready(function() {
        $.getJSON('http://mc8.org/fraz/apicall.php?type=GetHeroes',function(data){
            console.log(data);
            $scope.heroes = data.result.heroes;
            //$scope.heroes.forEach(function(entry){
               //console.log(entry);
            //});
            console.log('765' + (73376200+61197960265728));
            console.log('765' + (22215797+61197960265728));

        });
    });
});
