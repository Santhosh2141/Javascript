import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import isSatSun from './isWeekend.js';

const today = dayjs();
const todayAdd5D = today.add('5','days');
const todayAdd5M = today.add('5','months');
const todaySub1m = today.subtract('1','months');

console.log(todayAdd5D.format('MMMM D'));
console.log(todayAdd5M.format('MMMM D'));
console.log(todaySub1m.format('MMMM D'));

console.log(todayAdd5D.format('dddd'));
console.log(todayAdd5M.format('dddd'));
console.log(todaySub1m.format('dddd'));

console.log(isSatSun(today.format('dddd')));
console.log(isSatSun(todayAdd5D.format('dddd')));