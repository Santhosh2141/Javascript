import {cart, addToCart, removeFromCart , totalCartQuantity, updateQuantity} from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';


let cartHtml = '';
cart.forEach((item) => {
  const cartId = item.productId;
  let matchingProduct;
  products.forEach((product)=>{
    if (product.id === cartId){
      matchingProduct = product;
    }
  });
  // console.log(matchingProduct);
  cartHtml += `<div class="cart-container js-cart-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>
            <div class="cart-item-grid">
              <div class="cart-image-container">
                <img class="cart-image" src=${matchingProduct.image}>
              </div>
              <div class="cart-item-details">
                <div class="cart-product-name">
                  ${matchingProduct.name}
                </div>
                <div class="cart-product-price">
                  $${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="cart-product-quantity js-cart-quantity-${matchingProduct.id}">
                  Quantity: <span class="js-update-quantity-${matchingProduct.id}">${item.quantity}</span>
                  <span class="update-link js-update" data-product-id="${matchingProduct.id}">
                    Update
                  </span>
                  <input class="quantity-input js-quantity-input">
                  <span class="save-quantity-link link" data-product-id="${matchingProduct.id}">
                    Save
                  </span>
                  <span class="link js-delete" data-product-id="${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>
              <div class="choose-delivery">
                <div class="choose-delivery-container">
                  Choose Delivery Option:
                  <div class="delivery-grid">
                    <div class="delivery-option">
                      <input type="radio" name="delivery-option-${matchingProduct.id}">
                      <div>
                        <div class="delivery-option-date">
                          Tuesday, June 21
                        </div>
                        <div class="delivery-option-price">
                          FREE Shipping
                        </div>
                      </div>
                    </div>
                    <div class="delivery-option">
                      <input type="radio" name="delivery-option-${matchingProduct.id}">
                      <div>
                        <div class="delivery-option-date">
                          Tuesday, June 13
                        </div>
                        <div class="delivery-option-price">
                          $6.99 Shipping
                        </div>
                      </div>
                    </div>
                    <div class="delivery-option">
                      <input type="radio" name="delivery-option-${matchingProduct.id}">
                      <div>
                        <div class="delivery-option-date">
                          Wednesday, June 14
                        </div>
                        <div class="delivery-option-price">
                          $4.99 Shipping Fee
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
});


document.querySelector('.js-order-details').innerHTML = cartHtml;
// document.querySelectorAll('.js-update').forEach((button)=>{
//   button.addEventListener('click', ()=>{
//     cart.forEach((item)=>{
//       if (item.productId === cartId){
//         item.quantity++;
//       }
//     })
//   })
// })
  
let totalCart = totalCartQuantity(cart);

document.querySelector('.js-checkout-items').innerHTML = `${totalCart} items`

document.querySelectorAll('.js-delete').forEach((button)=>{
  button.addEventListener('click',()=>{
    const {productId} = button.dataset;
    
    cart.forEach((item) => {
      // if(item.id === productId){
      //   item.quantity -= 1;
      //   console.log(productId);
      // };
      if (item.quantity > 1) {
        return;
      }else if (item.quantity === 1){
      removeFromCart(productId);
      const container = document.querySelector(`.js-cart-container-${productId}`);
      container.remove();
      let totalCart = totalCartQuantity(cart);
      document.querySelector('.js-checkout-items').innerHTML = `${totalCart} items`
      }
    });
  });
});

document.querySelectorAll('.js-update').forEach((button)=>{
  button.addEventListener('click', ()=>{
    const {productId} = button.dataset;
    document.querySelector(`.js-cart-container-${productId}`).classList.add('is-editing-quantity');
  })
});

document.querySelectorAll('.save-quantity-link').forEach((button)=>{
  button.addEventListener('click',()=>{
    const {productId} = button.dataset;
    console.log(productId);

    document.querySelector(`.js-cart-container-${productId}`).classList.remove('is-editing-quantity');
    console.log(document.querySelector(`.js-cart-container-${productId}`).classList);

    let newQuantity = document.querySelector('.js-quantity-input');
    newQuantity = Number(newQuantity.value);

    updateQuantity(productId,newQuantity);
    let totalCart = totalCartQuantity(cart);
    
    document.querySelector('.js-checkout-items').innerHTML = `${totalCart} items`;
    document.querySelector(`.js-update-quantity-${productId}`).innerHTML = newQuantity;
  })
});


