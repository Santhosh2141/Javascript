import { renderOrderSumamry } from "./checkout/order-summary.js";
import { renderPaymtSummary } from "./checkout/payment-summary.js";
import { renderCheckoutHeader } from "./checkout/checkout-header.js";
import { loadProductsFetch } from "../data/products.js";
import { amazonCart } from "../data/cart-class.js";
// import '../data/backend-practise.js';
// import '../data/cart-class.js';
// using import direct runs all the code in that file 

async function loadPage(){
  // await waits for the code to finish in the backend before going to the next lineS

  try{
    // throw 'error1'    //manually creates error. goes directly to catch
    await Promise.all([
      loadProductsFetch(),
      amazonCart.loadCartFetch()
    ])
    // USING FETCH INSTEAD OF PROMISE
    // await loadProductsFetch();
    // await amazonCart.loadCartFetch();
    // USING PROMISE INSTEAD OF FETCH
    // const value = await new Promise((resolve, reject)=>{
      // throw doesnt work in the future. promise gives aanother parameter called reject
      // throw 'error2'    //if its a normal promise itll go to .catch func. as it has await it goes to catch{}
      // amazonCart.loadCart(()=>{
      //   // reject('error3');
      //   resolve('value2');
      // });
      
    // });
  }
  catch(error){
    console.log('Error occured. Please try later')
  }
   // here well put .then((value)=>{}). instead of using .then we can use a variable and assign value to that using above method
  renderOrderSumamry();
  renderPaymtSummary();
  renderCheckoutHeader();
  // return 'value2';    // this acts like resolve(value) value is value2
}   // async gets a function and returns a promise

loadPage();
// promise takes a parameter called resolve similar to done in jasmine
// htis helps to run asynchronous code.

// when we run promise it runs 2 codes at the same time.
// so Promise->loadProducts->resolve and
// loadProducts->renederSUmmary runs at the saem time

// we can also run multiple promises at the same time

// PROMISE WITHOUT FETCH
/*Promise.all([
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
  */

/*new Promise((resolve)=>{
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
*/

// PROMISE WITH FECTH
// fetch returns a promise. so we have to use that promise. Promise.all needs a promise. that returned one will be used here.
// Promise.all([
//   loadProductsFetch(),
//   new Promise((resolve)=>{
//     amazonCart.loadCart(()=>{
//       resolve();
//     });
//   })
// ]).then(()=>{
//   renderOrderSumamry();
//   renderPaymtSummary();
//   renderCheckoutHeader();
// })

// NORMAL CALLBACK
// promise is similar to callbacks
// each layer of nesting is created due to callbacks. so we use promise
/* loadProducts(()=>{  // this code runs. the function inside runs after loadproducts is run
  amazonCart.loadCart(()=>{   // this code runs. the function inside runs after loadcart is run
    renderOrderSumamry();
    renderPaymtSummary();
    renderCheckoutHeader();
  })
}); */
