let todoList = JSON.parse(localStorage.getItem('todoList'));
if(!todoList){
  todoList = [];
  // todoList = [{
  //   name: 'make dinner',
  //   dueDate: '2022-12-22'
  // }, {
  //   name: 'wash dishes',
  //   dueDate: '2022-12-22'
  // }];
}
renderTodoList();

function renderTodoList() {
  let todoListHTML = '';

  todoList.forEach((todoObject, index) => {
    const { name, dueDate } = todoObject;
    const html = 
    // whenever you change the list you have to save to localstorage.
    ` <div>${name}</div>
      <div>${dueDate}</div>
      <button class="delete-button js-delete-todo-button">Delete</button> 
    `;
    todoListHTML += html;
  });

  document.querySelector('.js-todo-list')
    .innerHTML = todoListHTML;
// as there are multiple delete buttons we use ALL
  document.querySelectorAll('.js-delete-todo-button')
    .forEach((deleteButton, index) => {
      deleteButton.addEventListener('click', () => {
        todoList.splice(index, 1);
        localStorage.setItem('todoList',JSON.stringify(todoList));
        renderTodoList();
      });
    });
}

document.querySelector('.js-add-todo-button')
  .addEventListener('click', () => {
    addTodo();
  });

function addTodo() {
  const inputElement = document.querySelector('.name-input');
  const name = inputElement.value;

  const dateInputElement = document.querySelector('.date-input');
  const dueDate = dateInputElement.value;

  todoList.push({
    //name: name,
    //dueDate: dueDate,
    name,
    dueDate
  });

  inputElement.value = '';
  localStorage.setItem('todoList',JSON.stringify(todoList));
  renderTodoList();
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
