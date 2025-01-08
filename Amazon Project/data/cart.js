export const cart  =[{
  productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity: 3
},{
  productId: '5b6fc6f-327a-4ec4-896f-486349e85a3d',
  quantity: 2
}]; //export allows using this in other files

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