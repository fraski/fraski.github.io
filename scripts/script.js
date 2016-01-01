listOfBalls = [0,0,0]
function addOrb(ball){
  switch(ball){
    case 1:
      changeAllOrbs("quas");
      break;
    case 2:
      changeAllOrbs("wex");
      break;
    case 3:
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
  if(listOfBalls[0] == 1 && listOfBalls[1] == 1 && listOfBalls[2] == 1){
    document.getElementById('spell').src = "images/invoker-cold-snap.png";
  }else if (listOfBalls[0] == 2 && listOfBalls[1] == 2 && listOfBalls[2] == 2) {
    document.getElementById('spell').src = "images/invoker-emp.png";
  }else if (listOfBalls[0] == 3 && listOfBalls[1] == 3 && listOfBalls[2] == 3) {
    document.getElementById('spell').src = "images/invoker-sun-strike.png";
  }

}
function startGame(){
  //decrease timer till 0
}
