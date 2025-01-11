import {cart, removeFromCart , totalCartQuantity, updateQuantity, updateDeliveryOption} from '../../data/cart.js';
import { getProduct, products } from '../../data/products.js';
import formatCurrency from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions } from '../../data/delivery-options.js';
import { renderPaymtSummary } from './payment-summary.js';
// the method used is default export when we want to import only 1 thing. other method is named export
// in format currency we use export default formatCurrency. 1 file can have only 1 export default
// we can use this URL as a direct script tag but, script tag will cause naming conflicts.
// so we use these ext libs as modules


// console.log(dayjs());
/* we need to get todays date, 
add 7 days for free delivery
add 3 days for earlier delivery
add 1 day for earliest delivery
so we use dayjs as it had those functionalities*/
// const today = dayjs();
//console.log(today.add(7,'days'));   //add takes 2 parameters. 1st is the quantity, 2nd is the type of time
// const deliveryDateAdd7 = today.add(7,'days');
// console.log(deliveryDateAdd7.format('dddd,MMMM DD'));
// const deliveryDateAdd3 = today.add(3,'days');
// console.log(deliveryDateAdd3.format('dddd,MMMM DD'));
// const deliveryDateAdd1 = today.add(1,'days');
// console.log(deliveryDateAdd1.format('dddd,MMMM DD'));

export function renderOrderSumamry(){

  let cartHtml = '';
  cart.forEach((item) => {
    const cartId = item.productId;
    let matchingProduct = getProduct(cartId);
    // console.log(matchingProduct);

    const deliveryOptionId =item.deliveryOptionId;
    let chosenDay ;
    deliveryOptions.forEach((deliveryOption)=>{
      if (deliveryOption.id === deliveryOptionId){
        chosenDay = deliveryOption.deliveryDate;
      }
    });
    const today = dayjs();
    let chosenDate =  today.add(chosenDay,'days');
    chosenDate = chosenDate.format('dddd, MMMM DD');

    cartHtml += `<div class="cart-container js-cart-container-${matchingProduct.id}">
              <div class="delivery-date">
                Delivery date: ${chosenDate}
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
                    <input class="quantity-input js-quantity-input-${matchingProduct.id}">
                    <span class="save-quantity-link link js-save-quantity-link" data-product-id="${matchingProduct.id}">
                      Save
                    </span>
                    <span class="link js-delete" data-product-id="${matchingProduct.id}">
                      Delete
                    </span>
                    <span class="incorrect-quantity js-incorrect-quantity" data-product-id="${matchingProduct.id}">
                    </span>
                  </div>
                </div>
                <div class="choose-delivery">
                  <div class="choose-delivery-container">
                    Choose Delivery Option:
                    <div class="delivery-grid">
                      ${deliveryOptionsHtml(matchingProduct.id,item)}
                    </div>
                  </div>
                </div>
              </div>
            </div>`;
  });

  function calculateDate(deliveryOption){
    // console.log(dayjs());
    const today = dayjs();
    let deliveryDateAdd = today.add(deliveryOption.deliveryDate,'days');
    deliveryDateAdd = deliveryDateAdd.format('dddd, MMMM DD');
    return deliveryDateAdd;
  }

  function deliveryOptionsHtml(productId,item){

    let html = '';
    deliveryOptions.forEach((deliveryOption)=>{
      
      const deliveryDateAdd = calculateDate(deliveryOption);

      const priceString = deliveryOption.priceCents === 0 ? 'FREE ' : `$${formatCurrency(deliveryOption.priceCents)} -`;

      const isChecked = deliveryOption.id === item.deliveryOptionId; 
      //Here we check the deliveryOptionID
      /* It checkd the cart DeliveryOption. If it is 1, it checks the first option */

      html += `
        <div class="delivery-option js-delivery-option" data-product-id="${productId}" data-delivery-option-id="${deliveryOption.id}">
          <input type="radio" name="delivery-option-${productId}" ${isChecked?'checked':''}>
          <div>
            <div class="delivery-option-date">
              ${deliveryDateAdd}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
        </div>

      `
      
    });
    return html;
  }

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

  document.querySelector('.js-checkout-items').innerHTML = `${totalCart} items`;
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

  update();
  function update(){
    document.querySelectorAll('.js-update').forEach((button)=>{
      button.addEventListener('click', ()=>{
        const {productId} = button.dataset;
        document.querySelector(`.js-cart-container-${productId}`).classList.add('is-editing-quantity');
      })
    });
  }

  function updateCart(productId){
    document.querySelector(`.js-cart-container-${productId}`).classList.remove('is-editing-quantity');
    // console.log(document.querySelector(`.js-cart-container-${productId}`).classList);

    let newQuantity = document.querySelector(`.js-quantity-input-${productId}`);
    newQuantity = Number(newQuantity.value);
    if(newQuantity >= 0 && newQuantity < 1000){
      updateQuantity(productId,newQuantity);
      let totalCart = totalCartQuantity(cart);
      document.querySelector('.js-checkout-items').innerHTML = `${totalCart} items`;
      document.querySelector(`.js-update-quantity-${productId}`).innerHTML = newQuantity;
      document.querySelector('.incorrect-quantity').innerHTML = '';
    } else {
      document.querySelector('.incorrect-quantity').innerHTML = 'You have entered an incorrect Quantity';
      // document.querySelector('.incorrect-quantity')
    }
  }

  document.querySelectorAll('.save-quantity-link').forEach((button)=>{
    button.addEventListener('click',()=>{
      const {productId} = button.dataset;
      console.log(productId);
      updateCart(productId);
      renderPaymtSummary();
    })
  });

  document.body.addEventListener('keydown',(event)=>{
    if(event.key === 'Enter'){
    update();
    }
  });

  // using this method when we click option and then refresh page it automatically changes.

  /* But we want to do it immediately we can use DOM to select that element and update the date directly
  but this is useless as multiple things like payment should be updated. 
  so we use it as a function renderOrderSummary to rerun the whoel page 
  
  THIS METHOD IS CALLED MVC - MODEL VIEW CONTROLLER
  WE SPLIT CODE IN 3 PARTS
  DATA PART - MODEL
  CARTITEM GENERATION OF HTML - VIEW
  EVENT LISTENERS - CONTROLLER */

  document.querySelectorAll('.js-delivery-option').forEach((radioButton)=>{
    radioButton.addEventListener('click',()=>{
      const {productId,deliveryOptionId} = radioButton.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSumamry();
      renderPaymtSummary();
    })
  });
}

