import { validDeliveryOption } from "./delivery-options.js";

function Cart(param) {
  const cart = {
    cartItems: undefined,
    // if we change then name of cart to smth else itll cause problems so instead of cart we sue this keyword.
    loadFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(`cart-oop-${param}`));
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
    },
    saveToStorage() {
      localStorage.setItem(`cart-oop-${param}`,JSON.stringify(this.cartItems));
    },
    getCartItem(productId){
      let presentItem;
        this.cartItems.forEach((item)=>{
          if (productId === item.productId){
            presentItem = item;
          }
        });
        return presentItem;
    },
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
    },
    removeFromCart(productId){
      let newCart = [];
      this.cartItems.forEach((cartItem)=>{
        if (cartItem.productId !== productId){
          newCart.push(cartItem);
        };
      });
      this.cartItems = newCart;
      this.saveToStorage();
    },
    totalCartQuantity(cart) {
      let totalCart = 0;
      this.cartItems.forEach((item)=>{
        totalCart += item.quantity;
      });
      // console.log(totalCart);
      this.saveToStorage();
      return totalCart;
    },
    updateQuantity(productId, newQuantity) {
      this.cartItems.forEach((item)=>{
        if(item.productId === productId) {
          item.quantity = newQuantity;
        }
      })
      // console.log(cart);
      this.saveToStorage();
    },
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
    },
  };

  return cart;
}

const cart = Cart('basic');
const businessCart = Cart('business');

cart.loadFromStorage();
businessCart.loadFromStorage();
cart.addToCart('83d4ca15-0f35-48f5-b7a3-1ea210004f2e',2);
// console.log(cart);
// console.log(businessCart);
//moving all cart related code here