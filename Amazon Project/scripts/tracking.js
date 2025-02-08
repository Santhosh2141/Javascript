import { getOrderId } from "../data/orders.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { amazonCart } from "../data/cart-class.js";

async function loadTracking() {
  await loadProductsFetch();

  const url = new URL(window.location.href);
  let orderId = url.searchParams.get('orderId');   
  let productid = url.searchParams.get('productId'); 
  let order = getOrderId(orderId);
  let product = getProduct(productid);
  console.log(order);
  let productInfo;
  order.products.forEach((product) => {
    if(product.productId === productid){
      productInfo = product;
    }
  });
  const today = dayjs();
  let orderDate = dayjs(order.orderTime);
  let deliveryDate = dayjs(productInfo.estimatedDeliveryTime);
  console.log(today, orderDate, deliveryDate);
  const percentage = ((today-orderDate)/(deliveryDate-orderDate))*100;
  let deliveredMsg = today > dayjs(productInfo.estimatedDeliveryTime) ? 'Delivered On' : 'Arriving On'
  console.log(percentage);
  let html = 
  `
  <div class="track-title">
    ${deliveredMsg} ${dayjs(productInfo.estimatedDeliveryTime).format('MMMM D')}
  </div>
  <div class="track-detail"> 
    ${product.name}
  </div>
  <div class="track-detail">
    Quantity: ${productInfo.quantity}
  </div>
  <div class="track-image-container">
    <img class="track-image" src="${product.image}">
  </div>
  <div class="tracker-grid">
    <div class="tracker-name ${percentage <= 50 ? 'active-progress' : ''}">
      Preparing
    </div>
    <div class="tracker-name ${(percentage > 50 &&  percentage <= 99) ? 'active-progress' : ''}">
      Shipped
    </div>
    <div class="tracker-name ${percentage >= 100 ? 'active-progress' : ''}">
      Delivered
    </div>
  </div>
  <div class="progress-bar-container">
    <div class="progress-bar" style = "width: ${percentage}%">
    </div>
  </div>
  `;
  document.querySelector('.track-item-grid').innerHTML = html;
  let totalCart = amazonCart.totalCartQuantity();
  document.querySelector('.js-cart-text').innerHTML = totalCart;
}

loadTracking();
