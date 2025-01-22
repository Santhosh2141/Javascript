// import { cart, totalCartQuantity } from "../../data/cart.js";
import { amazonCart } from "../../data/cart-class.js";

export function renderCheckoutHeader(){
  let checkoutHeaderHtml = 
  `
  <div class="checkout-header-left">
    <a href="amazon.html">
      <img class="amazon-logo" src="images/amazon-logo.png">
    </a>
  </div>
  <div class="checkout-name">
    Checkout(
    <a class="checkout-items js-checkout-items" href="amazon.html">
    ${amazonCart.totalCartQuantity()} items
    </a>
    )
  </div>
  <div class="lock icon">
    <img class="lock" src="images/icons/checkout-lock-icon.png">
  </div>
  `
  document.querySelector('.js-checkout-header').innerHTML = checkoutHeaderHtml;
  // console.log("checkout Header");
}

