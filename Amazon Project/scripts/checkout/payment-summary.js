// import { cart, totalCartQuantity } from "../../data/cart.js";
import { amazonCart } from "../../data/cart-class.js";
import { deliveryOptions } from "../../data/delivery-options.js";
import { getProduct } from "../../data/products.js";
import formatCurrency from "../utils/money.js";
import '../../data/orders.js';
import { addOrder } from "../../data/orders.js";

export function renderPaymtSummary(productId){
  // console.log('payment summary');
  let amountPriceCents = 0;
  let shippingPriceCents = 0;
  amazonCart.cartItems.forEach((item) => {
    const matchingProduct = getProduct(item.productId)
    amountPriceCents += matchingProduct.priceCents * item.quantity;
    deliveryOptions.forEach((deliveryOption)=>{
      if (item.deliveryOptionId === deliveryOption.id){
        shippingPriceCents += deliveryOption.priceCents;
      }
    });
  });
  
  const estimatedPriceCents = shippingPriceCents + amountPriceCents;
  const taxPriceCents = estimatedPriceCents * 0.1;
  const totalPriceCents = taxPriceCents + estimatedPriceCents;

  const paymentSummaryHtml = 
  `
    <div class="payment-title">
      Order Summary
    </div>
    <div class="payment-details">
      <div class="js-total-items">
        Items (${amazonCart.totalCartQuantity()}):
      </div>
      <div class="payment-row-value">
        $${formatCurrency(amountPriceCents)}
      </div>
    </div>
    <div class="payment-details">
      <div>
        Shipping & handling:
      </div>
      <div class="payment-row-value js-shipping-${productId}">
        $${formatCurrency(shippingPriceCents)}
      </div>
    </div>
    <div class="payment-details subtotal-row">
      <div class='title-row'>
        Total before Tax:
      </div>
      <div class="payment-row-value line-row">
        $${formatCurrency(estimatedPriceCents)}
      </div>
    </div>
    <div class="payment-details">
      <div>
        Estimated tax (10%):
      </div>
      <div class="payment-row-value">
        $${formatCurrency(taxPriceCents)}
      </div>
    </div>
    <div class="payment-details total-row">
      <div class="payment-total-title">
        Order total:
      </div>
      <div class="payment-total js-total-${productId}">
        $${formatCurrency(totalPriceCents)}
      </div>
    </div>
    <button class="place-order js-place-order">Place Order</button>
  `
  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHtml;

  // This part is used to get the order created.
  // so when we click. it creates a promise using ASYNC AWAIT.
  // fetch that api to post the order or the cart items
  // this then does resolve by sending a response to the then part.
  // this response we save it in a var. and we wait for it to get converted to a JSON.
  // we then add this order to our list of orders.

  document.querySelector('.js-place-order')
  .addEventListener('click', async()=>{
    try {
      const response = await fetch('https://supersimplebackend.dev/orders', {
        method: 'POST',
        headers: {
          'Content-type' : 'application/json'
        },
        body: JSON.stringify({
          cart: amazonCart.cartItems
        })
      });  // for the order we need to send the cart to backend
      const order = await response.json();
      addOrder(order);
      console.log(order);
    } catch(error) {
      console.log('Unexpected error. Try again Later')
    }
    amazonCart.clearCart();
    console.log(amazonCart.cartItems);
    // window.location is used to nagivate to another page. href specifies the url
    window.location.href = 'orders.html';
  });

}

