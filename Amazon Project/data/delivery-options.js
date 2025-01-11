// we can save the delivery options in the cart directly but 
// multiple things can have the same delivery date so we have it separately
// and use an ID to reference it.

import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import isWeekend from '../../scripts/isWeekend.js';

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

export function calculateDeliveryDate(chosenDay){
  let chosenDate = dayjs();

  while (chosenDay > 0){
    chosenDate =  chosenDate.add('1','days');
    if (!isWeekend(chosenDate)){
      chosenDay--;
    }
  }
  chosenDate = chosenDate.format('dddd, MMMM DD');
  return chosenDate;
}