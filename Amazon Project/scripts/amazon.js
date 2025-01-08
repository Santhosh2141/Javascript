import {cart} from '../data/cart.js'; // .. means going out of script folder. we can rename and use these variables too.
// like import {cart as myCart} from '../data/scripts.js'
import { products } from '../data/products.js';

let productsHtml = '';
products.forEach((product)=>{
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
        src="images/ratings/rating-${product.rating.stars*10}.png">
      <div class="product-rating-count link-primary">
        ${product.rating.count}
      </div>
    </div>

    <div class="product-price">
      $${(product.priceCents/100).toFixed(2)}
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
document.querySelectorAll('.js-add-to-cart')
.forEach((button)=>{
  button.addEventListener('click',()=>{
      // gives data attribute
    const {productId} = button.dataset;   // destructuring

    let selectedValue = document.querySelector(`.js-selected-value-${productId}`);
    const quantity = Number(selectedValue.value);

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
      console.log(timeoutId)
      addedTimeouts[productId] = timeoutId;
      console.log(addedTimeouts);
    },2000);

    let presentItem;
    cart.forEach((item)=>{
      if (productId === item.productId){
        presentItem = item;
      }
    });
    if (presentItem){
      presentItem.quantity += 1;
    } else {
      cart.push({
        productId,
        quantity
      });
    }
    
    let totalCart = 0;
    cart.forEach((item)=>{
      totalCart += item.quantity;
    });
    document.querySelector('.js-cart-text').innerHTML = totalCart;
    // console.log(totalCart);
    console.log(cart);
  });
});