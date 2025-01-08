import {cart, addToCart} from '../data/cart.js';
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
  console.log(matchingProduct);
  cartHtml += `<div class="cart-container">
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
                <div class="cart-product-quantity">
                  Quantity: ${item.quantity}
                  <a class="link" href="">Update</a>
                  <a class="link" href="">Delete</a>
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