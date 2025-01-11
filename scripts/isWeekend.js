export let isWeekend = (date) => (date.format('dddd') === 'Saturday' || date.format('dddd') === 'Sunday') ? true : false;

export default isWeekend;