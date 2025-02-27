import { validDeliveryOption } from "./delivery-options.js";

export class Cart {
  cartItems;
  #param;
  // putting a # infront makes it a private property
  //similarly for methods as well
  constructor(parameter){
    this.#param = parameter,
    this.#loadFromStorage();
  }
  #loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(`cart-oop-${this.#param}`));
    if (!this.cartItems){
      this.cartItems = [{
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
  saveToStorage() {
    localStorage.setItem(`cart-oop-${this.#param}`,JSON.stringify(this.cartItems));
  }
  getCartItem(productId){
    let presentItem;
      this.cartItems.forEach((item)=>{
        if (productId === item.productId){
          presentItem = item;
        }
      });
      return presentItem;
  }
  addToCart(productId,quantity){
    // let selectedValue = document.querySelector(`.js-selected-value-${productId}`);
    // const quantity = Number(selectedValue.value);
    let presentItem = this.getCartItem(productId);
    if (presentItem){
      presentItem.quantity += 1;
    } else {
      this.cartItems.push({
        productId,
        quantity,
        deliveryOptionId: '1'
      });
    }
    this.saveToStorage();
  }
  removeFromCart(productId){
    let newCart = [];
    this.cartItems.forEach((cartItem)=>{
      if (cartItem.productId !== productId){
        newCart.push(cartItem);
      };
    });
    this.cartItems = newCart;
    this.saveToStorage();
  }
  totalCartQuantity() {
    let totalCart = 0;
    this.cartItems.forEach((item)=>{
      totalCart += item.quantity;
    });
    // console.log(totalCart);
    this.saveToStorage();
    return totalCart;
  }
  updateQuantity(productId, newQuantity) {
    this.cartItems.forEach((item)=>{
      if(item.productId === productId) {
        item.quantity = newQuantity;
      }
    })
    // console.log();
    this.saveToStorage();
  }
  updateDeliveryOption(productId, deliveryOptionId){
      
    let presentItem = this.getCartItem(productId);
    
    if(!presentItem){
      return;
    }
  
    if(!validDeliveryOption(deliveryOptionId)){
      return;
    }
    
    presentItem.deliveryOptionId = deliveryOptionId;
  
    this.saveToStorage();
  }
  loadCart(fun) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET','https://supersimplebackend.dev/cart');
    xhr.addEventListener('load',() => {
      console.log(xhr.response);
      fun();
    });
    xhr.send();
  }
  async loadCartFetch(){
    const resp = await fetch('https://supersimplebackend.dev/cart');
    const result = await resp.text();
    console.log(result);
    // return result;
  }
  clearCart() {
    this.cartItems = [];
    this.saveToStorage();
  }
}

// class lets us have setup code called constructor

const cart1 = new Cart('basic');    // each object created for a class is called an instance of a class
const businessCart = new Cart('business');    // the value passed as the parameter will be used in the contructor

// console.log(cart1);
// console.log(businessCart);

export const amazonCart = new Cart('amazon');
amazonCart.cartItems.saveToStorage;
// console.log(amazonCart);

//moving all cart related code herevalidDeliveryOption, 