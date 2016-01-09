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
            $.getJSON('http://mc8.org/fraz/apicall.php?type=GetMatchHistory&account_id='+$scope.steamid,function(data){
                $scope.matchData = data;
                console.log(data);
                $scope.match_id = data.result.matches[0].match_id;
                for(y = 0; y < 10; y++){
                    if(y<9){
                        myurl += data.result.matches[0].players[y].account_id +",";
                    }else{
                        myurl += data.result.matches[0].players[y].account_id;
                    }
                }
                console.log(myurl);
                for(x = 0; x < 10; x++){
                    $scope.heroes.forEach(function(entry){
                        if(x < $scope.players.length && entry.id == $scope.players[x].hero_id)
                            {
                                $scope.matchHeroes.push(entry);
                                $scope.gameInfo[x].addHero(entry);
                            }
                    });
                }
                $scope.$apply();
                $.getJSON("http://mc8.org/fraz/apicall.php?type=GetMatchDetails&match_id=" + $scope.match_id,function(data){
                console.log("HERE");
                $scope.match = data.result;
                for(x = 0; x < 10; x++){
                    $scope.match.players[x].account_id = '765' + ($scope.match.players[x].account_id + 61197960265728);
                }
                for(x = 0; x < 10; x++){
                    $scope.heroes.forEach(function(entry){
                        if(entry.id == $scope.match.players[x].hero_id)
                            {
                                $scope.match.players[x].hero_name = entry.localized_name;
                                $scope.match.players[x].hero_img = "http://cdn.dota2.com/apps/dota2/images/heroes/" + entry.name.replace('npc_dota_hero_','') + "_sb.png";
                            }
                    });

                }
                console.log($scope.match);
                $scope.$apply();
                $.getJSON(myurl,function(data){
                console.log(data);
                for(x = 0; x <10;x++){
                    data.response.players.forEach(function(entry){
                        if( x < $scope.match.players.length){
                            if($scope.match.players[x].account_id == entry.steamid)
                                $scope.match.players[x].steam_info = entry;
                        }
                    });
                }
                for(x = 0; x < 10; x++){
                    if($scope.match.players[x].steam_info == null){
                        console.log("No Info :" + x);
                        $scope.match.players[x].steam_info = {personaname:"Anonymous"};

                    }
                }
                $scope.$apply();
            });
            });


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
