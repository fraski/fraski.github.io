var dotaApp = angular.module('dotaApp',[]);
dotaApp.controller('dotaController',function($scope){
    $scope.match_id;
    $scope.match;
    $scope.matchData;
    $scope.players = [];
    $scope.names=['Fraser','Mollie','Jeff','Steve','Abba'];
    $scope.heroes;
    $scope.matchHeroes = [];
    $scope.gameInfo = [];
    $scope.items;
    $scope.winString;
    $scope.getItem = function(item_id){
      var val = "";
      $scope.items.forEach(function(entry){
          if(entry.id == item_id){
              console.log("should return now");
              val = entry.name;
          }
      });
        if(val!= "")
            return "http://cdn.dota2.com/apps/dota2/images/items/" + val.replace('item_','') + "_lg.png"; 
    };
    $scope.search = function(){
        if($scope.steamid != "" && $scope.steamid != null){
            console.log("Began Searching");
            $(function(){
                myurl = "http://mc8.org/fraz/apicall.php?type=GetPlayerSummaries&steamids="
                $.getJSON('http://mc8.org/fraz/apicall.php?type=GetMatchHistory&account_id='+$scope.steamid,function(data){
                    console.log("GetMatchHistory");
                    console.log('http://mc8.org/fraz/apicall.php?type=GetMatchHistory&account_id='+$scope.steamid);
                    $scope.matchData = data;
                    console.log(data);
                    $scope.match_id = data.result.matches[0].match_id;
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
                        console.log("GetMatchDetails");
                        console.log("http://mc8.org/fraz/apicall.php?type=GetMatchDetails&match_id=" + $scope.match_id);
                        $scope.match = data.result;
                        console.log($scope.match);
                        if($scope.match.radiant_win == false){
                                $scope.winString = "Dire Victory";
                        }else{
                                $scope.winString = "Radiant Victory";
                        }

                        for(x = 0; x < 10; x++){
                            $scope.match.players[x].account_id = '765' + ($scope.match.players[x].account_id + 61197960265728);
                            if(x<9){
                                myurl += $scope.match.players[x].account_id  +",";
                            }else{
                                myurl += $scope.match.players[x].account_id ;
                            }
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
                            console.log("GetPlayersInfo")
                            console.log(myurl);
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
    }

    $( document ).ready(function() {
        console.log("loaded?");
        $.getJSON('http://mc8.org/fraz/apicall.php?type=GetHeroes',function(data){
            console.log(data);
            $scope.heroes = data.result.heroes;
            console.log('765' + (73376200+61197960265728));
            console.log('765' + (22215797+61197960265728));
            console.log('765' + (37485709+ 61197960265728))

        });
        $.getJSON('http://mc8.org/fraz/apicall.php?type=GetGameItems',function(data){
            console.log(data);
            $scope.items = data.result.items;
        });
        console.log("HELLO?");
        $.getJSON('http://www.craftiii4.co.uk/3squared/api.php', function (data) {
                console.log("HELLO?");
                console.log(data);
        });
    });
});
