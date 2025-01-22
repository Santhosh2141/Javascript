import { renderOrderSumamry } from "./checkout/order-summary.js";
import { renderPaymtSummary } from "./checkout/payment-summary.js";
import { renderCheckoutHeader } from "./checkout/checkout-header.js";
import { loadProducts } from "../data/products.js";
import { amazonCart } from "../data/cart-class.js";
// import '../data/backend-practise.js';
// import '../data/cart-class.js';
// using import direct runs all the code in that file 

// promise takes a parameter called resolve similar to done in jasmine
// htis helps to run asynchronous code.

// when we run promise it runs 2 codes at the same time.
// so Promise->loadProducts->resolve and
// loadProducts->renederSUmmary runs at the saem time

//we can also run multiple promises at the same time
Promise.all([
  new Promise((resolve)=>{
    loadProducts(()=>{
      resolve('value1');   //resolver tells when to go to next step
    })    // whatever paraeter is sent in 'resolve' will be stored in the parameter of 'then'
  }),
  new Promise((resolve)=>{
    amazonCart.loadCart(()=>{
      resolve();
    })
  })
]).then(()=>{
  renderOrderSumamry();
  renderPaymtSummary();
  renderCheckoutHeader();
})

new Promise((resolve)=>{
  loadProducts(()=>{
    resolve('value1');   //resolver tells when to go to next step
  })    // whatever paraeter is sent in 'resolve' will be stored in the parameter of 'then'
}).then((value)=>{   // if we want a new promise inside we return new Promise

  console.log(value);
  return new Promise((resolve)=>{
    amazonCart.loadCart(()=>{
      resolve();
    })
  })
}).then(()=>{
  renderOrderSumamry();
  renderPaymtSummary();
  renderCheckoutHeader();
});


// promise is similar to callbacks
// each layer of nesting is created due to callbacks. so we use promise
/* loadProducts(()=>{  // this code runs. the function inside runs after loadproducts is run
  amazonCart.loadCart(()=>{   // this code runs. the function inside runs after loadcart is run
    renderOrderSumamry();
    renderPaymtSummary();
    renderCheckoutHeader();
  })
}); */
