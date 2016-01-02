listOfBalls = [0,0,0];
currentSpell = 0;
answerSpell = 0;
time = 0;
score = 0;
gameInProgress = false;
listOfAllSpells = ["cold-snap","ghost-walk","ice-wall","emp","tornado","alacrity","sun-strike","forge-spirit","chaos-meteor","deafening-blast"]
var currentCountDown;
var countDownValue;
function addOrb(ball){
  switch(ball){
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
}

function changeAllOrbs(ball){
  document.getElementById('ballOne').src = document.getElementById('ballTwo').src;
  document.getElementById('ballTwo').src = document.getElementById('ballThree').src;
  document.getElementById('ballThree').src="images/invoker-"+ball+".png";
}

function invoke(){
  if(listOfBalls[0] != 0 && listOfBalls[1] != 0 && listOfBalls[2] != 0){
    theSpell = listOfBalls[0] + listOfBalls[1] + listOfBalls[2];
    switch(theSpell){
      case 3:
        document.getElementById('spell').src = "images/invoker-cold-snap.png";
        currentSpell = 0;
        break;
      case 5:
        document.getElementById('spell').src = "images/invoker-ghost-walk.png";
        currentSpell = 1;
        break;
      case 7:
        document.getElementById('spell').src = "images/invoker-tornado.png";
        currentSpell = 4;
        break;
      case 8:
        document.getElementById('spell').src = "images/invoker-ice-wall.png";
        currentSpell = 2;
        break;
      case 9:
        document.getElementById('spell').src = "images/invoker-emp.png";
        currentSpell = 3;
        break;
      case 10:
        document.getElementById('spell').src = "images/invoker-deafening-blast.png";
        currentSpell = 9;
        break;
      case 12:
        document.getElementById('spell').src = "images/invoker-alacrity.png";
        currentSpell = 5;
        break;
      case 13:
        document.getElementById('spell').src = "images/invoker-forge-spirit.png";
        currentSpell = 7;
        break;
      case 15:
        document.getElementById('spell').src = "images/invoker-chaos-meteor.png";
        currentSpell = 8;
        break;
      case 18:
        document.getElementById('spell').src = "images/invoker-sun-strike.png";
        currentSpell = 6;
        break;
    }
  }
}
function startGame(){
  if(gameInProgress!= true){
    document.getElementById('restartGame').style.visibility="visible";
    gameInProgress = true;
    resetGame();
    time = 30;
    score = 0;
    currentCountDown = createCountDown(30000);
    countDownValue = currentCountDown();
    newSpell();
    requestAnimationFrame(doGame);
  }
}
function newSpell(){
  randNum = Math.floor((Math.random() * 10));
  while(randNum == answerSpell){
    randNum = Math.floor((Math.random() * 10));
  }
  answerSpell = randNum;
  document.getElementById('answerSpell').src = "images/invoker-"+listOfAllSpells[answerSpell]+".png";
}
function doGame(){
  if(countDownValue > 0){
    document.getElementById('timer').innerHTML = "Timer : " + Math.round((countDownValue/1000));
    countDownValue = currentCountDown();
    requestAnimationFrame(doGame);
    if(currentSpell == answerSpell){
      score = score + 1;
      document.getElementById('score').innerHTML = "Score : " + score;
      newSpell();
    }
  }else{
    gameInProgress = false;
    document.getElementById('restartGame').style.visibility="hidden";
  }
}
function resetGame(){
  listOfBalls = [0,0,0]
  changeAllOrbs("nothing");
  changeAllOrbs("nothing");
  changeAllOrbs("nothing");
  document.getElementById('spell').src = "images/invoker-nothing.png";
  document.getElementById('score').innerHTML = "Score : " + 0;

}
function restartGame(){
  gameInProgress = false;
  startGame();
}
function createCountDown(timeRemaining) {
    var startTime = Date.now();
    return function() {
       return timeRemaining - ( Date.now() - startTime );
    }
}
function showGame(){
  document.getElementById('game').style.visibility="visible";
}
