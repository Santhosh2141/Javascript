let todo = JSON.parse(localStorage.getItem('todo'));
if(!todo){
  todo = [];
}
displayAddedItem();
function addItem(){
  let inputElement = document.querySelector('.todoList');
  let dateElement = document.querySelector('.js-due-date-input');
  todo.push({
    name: inputElement.value,
    dueDate: dateElement.value});
  console.log(todo);
  inputElement.value = '';
  localStorage.setItem('todo',JSON.stringify(todo));
}
function displayAddedItem(){
  let todoHtml = '';
  let i = 0;
  for(i = 0;i<todo.length;i++){
    let todoObject = todo[i];
    const {name, dueDate} = todoObject;
    const html = // whenever you change the list you have to save to localstorage.
    `<div>${name}</div> 
    <div> ${dueDate}</div> 
    <button class="delete-button" onclick = "todo.splice(${i},1); displayAddedItem(); localStorage.setItem('todo',JSON.stringify(todo));"> 
    Delete
    </button>`;
    todoHtml += html;
  }
  document.querySelector('.display').innerHTML = todoHtml;
}
function handleEvent(event){
  if (event.key === 'Enter'){
    addItem();
    displayAddedItem();
  }
}

const array1 = [1,2,3];
const array2 = array1.slice();
array2.push(4);
console.log(array1);
console.log(array2);

function searchElemnt(search, word){
  for(let i = 0; i < search.length;i++){
    if (search[i] === word){
      return i;
    }
  }
  return -1;
}
function uniqueElement(unique){
  uniqueArray = [];
  for(let i = 0; i < unique.length;i++){
      if(searchElemnt(uniqueArray,unique[i]) === -1){
      uniqueArray.push(unique[i])
    }
  }
  return uniqueArray;
}
console.log(uniqueElement(['name','search','word','search','word']));
console.log(uniqueElement(['not','found']));


function checkElement(check,word){
  reverArray = check.slice().reverse();
  console.log(check);
  console.log(reverArray);
  let newArray =[];
  let i = 0;
  count = 0;
  while(i<reverArray.length){
    if (check[i] === word && count < 2){
      count++;
      i++;
      continue;
    }
    newArray.push(check[i]);
    i++;
  }
  return newArray.reverse();
}

console.log(checkElement(['new','egg','word','egg','food','eat','egg','play'],'egg'));

for(let i = 1; i <= 20; i++){
  if(i%3 === 0 && i%5 === 0){
    console.log('FizzBuzz');
  } else if (i%3 === 0){
    console.log('Fizz');
  } else if (i%5 === 0){
    console.log('Buzz');
  } else{
    console.log(i);
  }
}