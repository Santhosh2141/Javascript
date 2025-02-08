// import {cart, addToCart, totalCartQuantity } from '../data/cart.js'; // .. means going out of script folder. we can rename and use these variables too.
// like import {cart as myCart} from '../data/scripts.js'
import { amazonCart } from '../data/cart-class.js';
import { products, loadProducts } from '../data/products.js';

loadProducts(renderProductsGrid);

function renderProductsGrid() {
  let productsHtml = '';

  const url = new URL(window.location.href);
  let searched = url.searchParams.get('search');
  document.querySelector('.js-search-bar').value = searched;
  console.log(searched);
  console.log(products);
  let filteredProducts = products;
  if (searched){
    filteredProducts = (products.filter((product)=>{
      // return product.name.toLowerCase().includes(searched) ;
      let mathcingKey = false;
      product.keywords.forEach((keyword)=>{
        if(keyword.toLowerCase().includes(searched.toLowerCase())){
          mathcingKey = true;
        }
      })
      return mathcingKey || product.name.toLowerCase().includes(searched.toLowerCase());
    }));
  }
  console.log(filteredProducts);

  filteredProducts.forEach((product)=>{
    productsHtml += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src= ${product.image}>
      </div>
  
      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>
  
      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="${product.getStarsURL()}">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>
  
      <div class="product-price">
        ${product.getPrice()}
      </div>
  
      <div class="product-quantity-container">
        <select class = "js-selected-value-${product.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>
      <div class="item-links">
      ${product.extraInfoHTML()}
      </div>
      <div class="product-spacer"></div>
  
      <div class="added-to-cart js-added-to-cart-${product.id}">
        <img src="images/icons/checkmark.png">
        Added
      </div>
  
      <button class="add-to-cart-button js-add-to-cart" data-product-id= "${product.id}">
        Add to Cart
      </button>
    </div>`
  });
  
  // we use productId instead of productName as 2 products can have the same name
  
  // console.log(productsHtml);
  // as there are multiple products we dont knkow which product was added to cart.
  // so we a data attribute to html code. any value can be added as attribute.
  // data attribute should start w the word "data" and be separated by -
  document.querySelector('.js-products-grid').innerHTML = productsHtml;
  
  let totalCart = amazonCart.totalCartQuantity();
  
  document.querySelector('.js-cart-text').innerHTML = totalCart;
  
  function addMsg(productId) {
    let addedMsg = document.querySelector(`.js-added-to-cart-${productId}`);
    addedMsg.classList.add('js-added-to-cart-visible');
  
    let timeoutId;
    // as multiple products have multiple add to carts and timeouts we do this to check the multiple add to carts for the same button
    const addedTimeouts = {};
    let prevTimeout = addedTimeouts[productId];
  
    if(prevTimeout){
      clearInterval(prevTimeout);
    }
  
    timeoutId = setTimeout(()=>{
      addedMsg.classList.remove('js-added-to-cart-visible');
      // console.log(timeoutId)
      addedTimeouts[productId] = timeoutId;
    },3000);
  }
  
  document.querySelectorAll('.js-add-to-cart')
  .forEach((button)=>{
    button.addEventListener('click',()=>{
        // gives data attribute
      const {productId} = button.dataset;   // destructuring
      let selectedValue = document.querySelector(`.js-selected-value-${productId}`);
      const quantity = Number(selectedValue.value);
      amazonCart.addToCart(productId,quantity);
      let totalCart = amazonCart.totalCartQuantity();
      document.querySelector('.js-cart-text').innerHTML = totalCart;
      addMsg(productId);
    });
  });
}
