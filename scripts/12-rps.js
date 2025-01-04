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

let isAutoPlaying = false;
let intervalID;   //intervalID keeps changing so to save the prev ID we set it here.

let buttonAutoPlay = document.querySelector('.auto-play');
buttonAutoPlay.addEventListener('click',() => {
  autoPlay();
})

function autoPlay(){

  if(!isAutoPlaying){
    intervalID  = setInterval(() => {   // setintereval returns ID which can be used.
      const plaerMove = pickCompMove();
      playGame(plaerMove);
      isAutoPlaying = true;
      document.querySelector('.auto-play').innerText = "Stop Play";
    },2000)
  } else{
    clearInterval(intervalID);
    isAutoPlaying = false;
    document.querySelector('.auto-play').innerText = "Auto Play";
  }
}

document.querySelector('.js-rock-button').addEventListener('click', () => {playGame('Rock')});
document.querySelector('.js-paper-button').addEventListener('click', () => {playGame('Paper')});
document.querySelector('.js-scissors-button').addEventListener('click', () => {playGame('Scissors')});
document.querySelector('.reset').addEventListener('click',() => {
  document.querySelector('.js-reset-confirmation').innerHTML = `
  <p>Are you sure you want to reset score</p>
  <button class = 'js-reset-yes'>Yes</button>
  <button class = 'js-reset-no'>No</button>`;
  document.querySelector('.js-reset-yes').addEventListener('click', ()=>{
    score.won = 0; 
    score.lost = 0; 
    score.tie = 0; 
    localStorage.removeItem('score'); 
    displayScore();
    document.querySelector('.js-reset-confirmation').innerHTML = '';
  });
  document.querySelector('.js-reset-no').addEventListener('click', ()=>{
    document.querySelector('.js-reset-confirmation').innerHTML = '';
  });
});

// when we give playgame directly it runs the function and returns undefined. so we use arrow function.

document.body.addEventListener('keydown',(event) => {
  if(event.key === 'r'){ 
    playGame('Rock')
  } else if(event.key === 'p'){
    playGame('Paper')
  } else if(event.key === 's'){
    playGame('Scissors')
  } else if(event.key === 'a'){
    autoPlay();
  } else if(event.key === 'Backspace'){
    document.querySelector('.js-reset-confirmation').innerHTML = `
    <p>Are you sure you want to reset score</p>
    <button class = 'js-reset-yes'>Yes</button>
    <button class = 'js-reset-no'>No</button>`;
    document.querySelector('.js-reset-yes').addEventListener('click', ()=>{
      score.won = 0; 
      score.lost = 0; 
      score.tie = 0; 
      localStorage.removeItem('score'); 
      displayScore();
      document.querySelector('.js-reset-confirmation').innerHTML = '';
    });
    document.querySelector('.js-reset-no').addEventListener('click', ()=>{
      document.querySelector('.js-reset-confirmation').innerHTML = '';
    });
  } 
});
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


function pickCompMove(){
  let compValue = '';
  //let chosen = plaerMove;
  let randomNumber =  Math.random(0,1);
  if (randomNumber < 1/3){
    console.log(randomNumber);
    compValue = 'Rock';
    //console.log(`You picked ${chosen}, Computer picked ${compValue}`);
  } else if (randomNumber >= 1/3 && randomNumber < 2/3){
    console.log(randomNumber);
    compValue = 'Paper';
    //console.log(`You picked ${chosen}, Computer picked ${compValue}`);
  } else if (randomNumber >= 2/3) {
    console.log(randomNumber);
    compValue = 'Scissors';
    //console.log(`You picked ${chosen}, Computer picked ${compValue}`);
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
    //console.log(val);
  }else{
    val = 'tails';
    //console.log(val);
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

