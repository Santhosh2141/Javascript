import { validDeliveryOption } from "./delivery-options.js";

export let cart ;
// console.log(cart);
loadFromStorage();
export function loadFromStorage (){
  cart = JSON.parse(localStorage.getItem('cart'));
  if (!cart){
    cart = [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 3,
      deliveryOptionId: '1'
    },{
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
      deliveryOptionId: '2'
    }]; //export allows using this in other files
  } 
}

//moving all cart related code here
export function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}

export function getCartItem(productId){
  let presentItem;
    cart.forEach((item)=>{
      if (productId === item.productId){
        presentItem = item;
      }
    });
    return presentItem;
}

export function addToCart(productId,quantity){
  // let selectedValue = document.querySelector(`.js-selected-value-${productId}`);
  // const quantity = Number(selectedValue.value);
  let presentItem = getCartItem(productId);
  if (presentItem){
    presentItem.quantity += 1;
  } else {
    cart.push({
      productId,
      quantity,
      deliveryOptionId: '1'
    });
  }
  saveToStorage();
}

export function removeFromCart(productId){
  let newCart = [];
  cart.forEach((cartItem)=>{
    if (cartItem.productId !== productId){
      newCart.push(cartItem);
    };
  });
  cart = newCart;
  saveToStorage();
}

export function totalCartQuantity(cart) {
  let totalCart = 0;
  cart.forEach((item)=>{
    totalCart += item.quantity;
  });
  console.log(totalCart);
  saveToStorage();
  return totalCart;
}

export function updateQuantity(productId, newQuantity) {
  cart.forEach((item)=>{
    if(item.productId === productId) {
      item.quantity = newQuantity;
    }
  })
  console.log(cart);
  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId){
  
  let presentItem = getCartItem(productId);
  
  if(!presentItem){
    return;
  }

  if(!validDeliveryOption(deliveryOptionId)){
    return;
  }
  
  presentItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}