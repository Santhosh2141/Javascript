import { cart,addToCart, loadFromStorage } from "../../data/cart.js";

describe ("Test suite: Add to cart", () =>{
  it("adds exisitng item to cart", ()=> {

    spyOn(localStorage, 'setItem');
    spyOn(localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    
    });

    loadFromStorage();
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6',1);
    expect(cart[0].quantity).toEqual(2);
  });

  it("adds new product to the cart", () =>{
    spyOn(localStorage, 'setItem');
    // as we save to storage at end, we use setItem fake value
    spyOn(localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([]);
    });
    console.log(localStorage.getItem('cart'));
    loadFromStorage();
    // we make localStorage.getItem to do some fake task to run test to satisfy our scenario
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6',1);
    expect(cart.length).toEqual(1);
    // this fails cuz of FLAKY TEST
    // FLAKY Test means sometimes passes sometimes fails.
    // here local stoarge might by 0. but we set a default value to 2 for cart Items when nothing is present.
    // so we use MOCKS.
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1);
  });
})