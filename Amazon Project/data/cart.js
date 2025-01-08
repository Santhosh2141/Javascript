export const cart  =[]; //export allows using this in other files

//moving all cart related code here

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
}