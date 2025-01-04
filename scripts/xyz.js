let todo = JSON.parse(localStorage.getItem('todo'));
if(!todo){
  todo = [];
}
displayAddedItem();
function displayAddedItem(){
  let todoHtml = '';
  todo.forEach((todoObject, index) => {
    const {name, dueDate} = todoObject;
    const html = 
    `<div>${name}</div> 
    <div> ${dueDate}</div> 
    <button class="delete-button js-delete-button" onclick = ""> 
    Delete
    </button>`;
    todoHtml += html;
  });
  document.querySelector('.display').innerHTML = todoHtml;
  document.querySelectorAll('.js-delete-button')
  .forEach((deleteButton,index)=>{
    deleteButton.addEventListener('click',()=>{
      todo.splice(index,1); 
      displayAddedItem(); 
      localStorage.setItem('todo',JSON.stringify(todo));
    });
  });
}


document.querySelector('.js-add-button').addEventListener('click', ()=>{
  addItem();
});

function addItem(){
  let inputElement = document.querySelector('.todoList');
  let dateElement = document.querySelector('.js-due-date-input');
  todo.push({
    name: inputElement.value,
    dueDate: dateElement.value});
  console.log(todo);
  inputElement.value = '';
  localStorage.setItem('todo',JSON.stringify(todo));
  displayAddedItem();
};




function handleEvent(event){
  if (event.key === 'Enter'){
    addItem();
    displayAddedItem();
  }
}
