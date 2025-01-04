let score = JSON.parse(localStorage.getItem('score'));
// let score = JSON.parse(localStorage.getItem('score') || score = {won: 0, lost: 0, tie: 0}) ; using default operator ||

if (!score){
  score = {
    won: 0,
    lost: 0,
    tie: 0
  }
}

function displayScore(){
  document.querySelector('.js-score').innerHTML = `Wins: ${score.won} Losses: ${score.lost} Ties: ${score.tie}`; 
}

displayScore();

function playGame(plaerMove){
  let result = '';
  compValue = pickCompMove(plaerMove);
  if (plaerMove === 'Scissors'){
    if (compValue === 'Scissors'){
      result = 'Tie';
    } else if (compValue === 'Rock'){
      result = 'You lost';
    }else {
      result = 'You Won';
    }
  } else if (plaerMove === 'Paper'){
    if (compValue === 'Paper'){
      result = 'Tie';
    } else if (compValue === 'Scissors'){
      result = 'You lost';
    } else {
      result = 'You Won';
    }
  } else {
    if (compValue === 'Rock'){
      result = 'Tie';
    } else if (compValue === 'Paper'){
      result = 'You lost';
    } else if (compValue === 'Scissors') {
      result = 'You Won';
    }
  }
  if (result === 'Tie')
    score.tie++;
  else if (result === 'You lost')
    score.lost++;
  else if (result === 'You Won')
    score.won++;

  localStorage.setItem('score', JSON.stringify(score)); // this is cuz, when we reload, the values reset. so save is we use it and localstorage takes only string

  displayScore();
  document.querySelector('.js-result').innerHTML = result;
  document.querySelector('.js-move').innerHTML = `You picked <img src = "images/${plaerMove}-emoji.png" class = "move-icon">, Computer picked <img src = "images/${compValue}-emoji.png" class = "move-icon">.`;
  // multiline strings can use enter for next line instead of \n
}


function pickCompMove(plaerMove){
  let compValue = '';
  let chosen = plaerMove;
  let randomNumber =  Math.random(0,1);
  if (randomNumber < 1/3){
    console.log(randomNumber);
    compValue = 'Rock';
    console.log(`You picked ${chosen}, Computer picked ${compValue}`);
  } else if (randomNumber >= 1/3 && randomNumber < 2/3){
    console.log(randomNumber);
    compValue = 'Paper';
    console.log(`You picked ${chosen}, Computer picked ${compValue}`);
  } else if (randomNumber >= 2/3) {
    console.log(randomNumber);
    compValue = 'Scissors';
    console.log(`You picked ${chosen}, Computer picked ${compValue}`);
  }
  return compValue;
}


let scoreHT = JSON.parse(localStorage.getItem('scoreHT')) || ({ win: 0,loss: 0});

function displayScoreHT(){
  document.querySelector('.js-score1').innerHTML = `Wins: ${scoreHT.win} Losses: ${scoreHT.loss}`;
}

displayScoreHT();

function headTail(picked){
  let choice = Math.random(0,1);
  let val = '';
  if(choice >1/2){
    val = 'heads';
    console.log(val);
  }else{
    val = 'tails';
    console.log(val);
  }
  
  localStorage.setItem('scoreHT',JSON.stringify(scoreHT));

  if (val === picked){
    scoreHT.win++;
    document.querySelector('.js-move1').innerHTML = `You Won. You picked <img class="flip-icon" src="images/${picked}.jpg"> Computer picked <img class="flip-icon" src="images/${val}.jpg">`;
  }else{
    scoreHT.loss++;
    document.querySelector('.js-move1').innerHTML = `You Lost. You picked <img class="flip-icon" src="images/${picked}.jpg"> Computer picked <img class="flip-icon" src="images/${val}.jpg">`;
  }

  displayScoreHT();
  
}