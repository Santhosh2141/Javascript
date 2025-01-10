// we can save the delivery options in the cart directly but 
// multiple things can have the same delivery date so we have it separately
// and use an ID to reference it.

export const deliveryOptions = [{
  id: '1',
  deliveryDate: '7',
  priceCents: 0
},{
  id: '2',
  deliveryDate: '3',
  priceCents: 499
},{
  id: '3',
  deliveryDate: '1',
  priceCents: 999
}]