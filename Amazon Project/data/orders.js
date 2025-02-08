export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {
  orders.unshift(order);   // adds order to the front of the array
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('orders',JSON.stringify(orders));
}

export function getOrderId(orderId){
  let matchingOrder;

  orders.forEach((order)=>{
    if(orderId === order.id){
      matchingOrder = order;
    }
  });
  return matchingOrder;
}