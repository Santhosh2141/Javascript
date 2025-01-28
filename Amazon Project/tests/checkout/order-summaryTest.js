import { renderOrderSumamry } from "../../scripts/checkout/order-summary.js";
import { cart, loadFromStorage } from "../../data/cart.js";
import { loadProducts,loadProductsFetch } from "../../data/products.js";

describe('Test suite: Render Order Summary', () => {

  // done waits till loadproducts is complete. so we need to call done to go to next step
  beforeAll((done)=>{
    loadProductsFetch().then(()=>{
      done();
    });
  })
  beforeEach (() => {
    spyOn(localStorage, 'setItem');

    document.querySelector('.js-test-container').innerHTML = `
    <div class= "js-checkout-header"></div>
    <div class = "js-order-details"></div>
    <div class= "js-payment-summary"></div>
    `;

    spyOn(localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 3,
        deliveryOptionId: '1'
      },{
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '2'
      }]);
    });

    loadFromStorage();
    renderOrderSumamry();

  });
  afterEach (() => {
    // document.querySelector('.js-test-container').innerHTML=``;
  })
  // it('Display the cart', () => {

  //   expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);

  //   // we use toContain as the whole block as multiple other HMTL. toCOntain check if that string alone is available.
  //   expect(document.querySelector('.js-cart-quantity-e43638ce-6aa0-4b85-b27f-e1d07eb678c6').innerText).toContain('Quantity: 3');

  //   expect(document.querySelector('.js-cart-quantity-15b6fc6f-327a-4ec4-896f-486349e85a3d').innerText).toContain('Quantity: 1');

  //   expect(document.querySelector('.js-cart-product-name-e43638ce-6aa0-4b85-b27f-e1d07eb678c6').innerHTML).toContain('Black and Gray Athletic Cotton Socks - 6 Pairs');

  //   expect(document.querySelector('.js-cart-product-price-e43638ce-6aa0-4b85-b27f-e1d07eb678c6').innerHTML).toContain('$10.90');

  // });

  it('removes a product', () => {

    document.querySelector('.js-delete-link-e43638ce-6aa0-4b85-b27f-e1d07eb678c6').click();
    expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);
    console.log(cart);
    expect(document.querySelector('.js-cart-container-e43638ce-6aa0-4b85-b27f-e1d07eb678c6')).toEqual(null);

    expect(document.querySelector('.js-cart-container-15b6fc6f-327a-4ec4-896f-486349e85a3d')).not.toEqual(null);

    expect(cart.length).toEqual(2);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

  });

  it('updates delivery option', () => {
    document.querySelector('.js-delivery-option-e43638ce-6aa0-4b85-b27f-e1d07eb678c6-3').click();
    expect(document.querySelector('.js-delivery-option-input-e43638ce-6aa0-4b85-b27f-e1d07eb678c6-3').checked).toEqual(true);
    expect(cart.length).toEqual(2);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].deliveryOptionId).toEqual('1');
    expect(document.querySelector('.js-shipping-e43638ce-6aa0-4b85-b27f-e1d07eb678c6').innerHTML).toContain('$14.98');
    expect(document.querySelector('.js-total-e43638ce-6aa0-4b85-b27f-e1d07eb678c6').innerHTML).toContain('$75.49');
  })
})