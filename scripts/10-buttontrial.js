function activateButton(buttonClass){
  const buttonElem = document.querySelector(buttonClass);
  if(!buttonElem.classList.contains('toggle-button')){
    turnOffPrev();
    buttonElem.classList.add('toggle-button');
  } else{
    buttonElem.classList.remove('toggle-button');
  }
}
function turnOffPrev(){
  const prevButton = document.querySelector('.toggle-button');
  if (prevButton){
    prevButton.classList.remove('toggle-button');

  }
}
