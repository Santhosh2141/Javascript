export let formatCurrency = (priceCents) => (Math.round(priceCents)/100).toFixed(2);

/* this is same as
function formatCurrency (priceCents){
  return (priceCents/100).toFixed(2)
} */


export default formatCurrency; 