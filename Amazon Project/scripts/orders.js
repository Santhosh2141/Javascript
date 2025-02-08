import { amazonCart } from '../data/cart-class.js';
import '../data/orders.js';
import { orders } from '../data/orders.js';
import { getProduct, loadProductsFetch} from '../data/products.js';
import formatCurrency from './utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

console.log(orders);

function loadOrderDetails(){
  let orderDetails = '';
  let prodHtml = '<div class="order-container">';
  orders.forEach((order)=>{
    let html = 
    `
    <div class = 'order-header'>
      <div class="order-details">
        <div class="order-title">Order Placed:</div>
        <div class="order-value">${dayjs(order.orderTime).format('MMMM D')}</div>
      </div>
      <div class="order-details">
        <div class="order-title">Total:</div>
        <div class="order-value">$${formatCurrency(order.totalCostCents)}</div>
      </div>
      <div class="order-details">
        <div class="order-title">Order ID:</div>
        <div class="order-value">${order.id}</div>
      </div>
    </div>
    `
    order.products.forEach((product)=>{
      let orderPId = product.productId
      let matchingProduct = getProduct(orderPId);
      prodHtml += 
      `
        <div class="order-item-grid">
          <div class="order-image"> 
            <img class="image" src="${matchingProduct.image}">
          </div>
          <div class="order-desc"> 
            <div class="item-name">
            ${matchingProduct.name}
            </div>
            <div class="item-date">
              Arriving on: ${dayjs(product.estimatedDeliveryTime).format('MMMM D')}
            </div>
            <div class="item-quantity">
              Quantity: ${product.quantity}
            </div>
            <button class="bia-button" data-product-id="${product.productId}">
              <img class="bia-icon" src="images/icons/buy-again.png">
              Buy it Again
            </button>
          </div>
          <div class="track-button">
            <a href = "tracking.html?orderId=${order.id}&productId=${product.productId}">
            <button class="track-pack-button">
              Track Package
            </button>
            </a>
          </div>
        </div>
      `
    })
  orderDetails += html + prodHtml + "</div>";
  prodHtml = '<div class="order-container">';
  html = ''
  });
  // console.log(orderDetails);
  document.querySelector(`.js-order`).innerHTML = orderDetails;
  document.querySelectorAll('.track-button').forEach((button)=>{
    button.addEventListener('click', ()=>{
      window.location.href = 'tracking.html';
    })
  })
  document.querySelectorAll('.bia-button').forEach((button)=>{
    button.addEventListener('click', ()=>{
      const {productId} = button.dataset;
      // console.log(productId);
      amazonCart.addToCart(productId,1);
      let totalCart = amazonCart.totalCartQuantity();
  
      document.querySelector('.js-cart-text').innerHTML = totalCart;
    })
  })
  // document.querySelector('.js-order-container').innerHTML = prodDetails;
}

async function loadPage(){
  
  try{
    await Promise.all([
      loadProductsFetch()
    ])
  }
  catch(error){
    console.log('Error occured. Please try later')
  }
  
loadOrderDetails();
let totalCart = amazonCart.totalCartQuantity();
document.querySelector('.js-cart-text').innerHTML = totalCart;
} 
loadPage();