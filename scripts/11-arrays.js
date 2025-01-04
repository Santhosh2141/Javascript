
let toDo = [{
  name: 'make dishes', 
  dueDate: '2024-02-01'},
{
  name: 'go to gym', 
  dueDate: '2024-02-01'
}];
function addItem(){
  const inputElement = document.querySelector('.add-item'); //document.queryselector gets the value in the input field
  toDo.push(inputElement.value); // value property represents the value in the text box
  console.log(toDo);
  inputElement.value = '';
}

function addedItems(){
  let i = 0;
  let toDoItems = '';
  while (i < toDo.length){
    todoObject = toDo[i];
    const {name , dueDate} = todoObject;//destructing
    const html = `<p>${name}${dueDate}</p>`;
    toDoItems += html;
    i++;
  }
  
  document.querySelector('.added-items').innerHTML = toDoItems;
}
function handleKeyDown(event){
  if (event.key === 'Enter')
    addItem();
}


const myArray = [10,20,30];
console.log(myArray[0]);
[1, 'hello', true, {name: 'Santhosh', age: 21}, [10,20,30]];
console.log(Array.isArray([1,2]));
console.log(myArray.length);
myArray.push(100);
console.log(myArray);
myArray.splice(0,1) // we give 2 values. 1st calue is the index. 2nd value i number of values from the index given.
console.log(myArray)

// let i = 1;
// while (i < 5){
//   console.log(i);
//   i++;
// }
// for (let i = 0; i < 5; i++){
//   console.log(i);
// }

const firstElem = myArray[0];
const lastElem = myArray[(myArray.length-1)];

console.log(myArray);
for (let i = 0; i < myArray.length; i++){
  if (i === 0)
    myArray[i] = lastElem;
  if (i === myArray.length-1)
    myArray[i] = firstElem;
}
console.log(myArray);

for (let i = 0; i < 5; i++){
  console.log(5-i);
}

function addNum(array1,array2){
  let myNewArray = [];
  let i = 0;
  while (i < array1.length){
    myNewArray.push(array1[i]+array2[i]);
    i++;
  }
  console.log(myNewArray);
  console.log(array1);
  let count = 0;
  for (let i = 0; i < array1.length; i++){
    if (array1[i] > 0){
      count += 1;
    }
  }
  console.log(count);
}


function minMax(array1){
  const final = {
    min: array1[0],
    max: array1[0]
  }

  for (let i = 0; i<array1.length;i++){
    if (array1[i]<=final.min)
      final.min = array1[i];
  }
  for (let i = 0; i<array1.length;i++){
    if (array1[i]>=final.max)
      final.max = array1[i];
  }
  console.log(final);
}
addNum([-2,-1,0,99,2],myArray);
minMax([]);

function countWords(array){
  let count = {

  }

  for (let i = 0;i < array.length; i++){
    let repeat = array[i];
    if (count[repeat])
      count[repeat] += 1; // object[variable] creates an object with variable(here repeat) as its property name(so apple is added as a property for the object count). if obj[var] exists add 1.
    else
      count[repeat] = 1;
  }
  console.log(count);
}

countWords(['apple','grape','apple','apple']);

arrayT =[-2,-1,0,1,100];
function incArray(arr){
  let incArray1 = [];
  for(let i = 0; i < arr.length; i++){
    incArray1.push(arr[i]+1);
  }
  return incArray1
}

console.log(incArray(arrayT));