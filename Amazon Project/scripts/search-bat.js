import { loadProductsFetch, products } from "../data/products.js";

async function loadSearch() {

  await loadProductsFetch();
  
  let button = document.querySelector('.js-search-button')
  button.addEventListener(('click'),()=>{
    let search = document.querySelector('.search-bar').value;
    document.querySelector('.search-bar').value = search;
    window.location.href = `amazon.html?search=${search}`;
  });

  let input = document.querySelector('.js-search-bar')
  input.addEventListener(('keyup'),(event)=>{
    if (event.key === 'Enter'){
      button.click();
    }
  })
}
loadSearch();


