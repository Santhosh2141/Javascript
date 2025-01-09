export let cart = JSON.parse(localStorage.getItem('cart'));
if (!cart){
  cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 3
  },{
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1
  }]; //export allows using this in other files
} 
console.log(cart);

//moving all cart related code here
export function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}
export function addToCart(productId){
  let selectedValue = document.querySelector(`.js-selected-value-${productId}`);
  const quantity = Number(selectedValue.value);
  let presentItem;
  cart.forEach((item)=>{
    if (productId === item.productId){
      presentItem = item;
    }
  });
  if (presentItem){
    presentItem.quantity += 1;
  } else {
    cart.push({
      productId,
      quantity
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