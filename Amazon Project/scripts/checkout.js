import { renderOrderSumamry } from "./checkout/order-summary.js";
import { renderPaymtSummary } from "./checkout/payment-summary.js";
import { renderCheckoutHeader } from "./checkout/checkout-header.js";
import '../data/backend-practise.js';
// import '../data/cart-class.js';
// using import direct runs all the code in that file 
renderOrderSumamry();
renderPaymtSummary();
renderCheckoutHeader();