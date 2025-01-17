// import { cart, totalCartQuantity } from "../../data/cart.js";
import { amazonCart } from "../../data/cart-class.js";
import { deliveryOptions } from "../../data/delivery-options.js";
import { getProduct } from "../../data/products.js";
import formatCurrency from "../utils/money.js";

export function renderPaymtSummary(productId){
  console.log('payment summary');
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
      <div>
        Total before Tax:
      </div>
      <div class="payment-row-value  line-row">
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
    <button class="place-order">Place Order</button>
  `
  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHtml;
}

