import { renderOrderSumamry } from "./checkout/order-summary.js";
import { renderPaymtSummary } from "./checkout/payment-summary.js";
import { renderCheckoutHeader } from "./checkout/checkout-header.js";
import '../data/cart-oop.js';
// using import direct runs all the code in that file 
renderOrderSumamry();
renderPaymtSummary();
renderCheckoutHeader();