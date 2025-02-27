// import formatCurrency from "../scripts/utils/money.js";
import formatCurrency from "../../scripts/utils/money.js"

console.log("Test suite: Format Currency")


console.log("Converts cents to dollars")
if (formatCurrency(2095) === '20.95'){
  console.log('passed');
} else {
  console.log('failed');
}


console.log("Works with 0 dollar")
if (formatCurrency(0) === '0.00'){
  console.log('passed');
} else {
  console.log('failed');
}

console.log("Rounds up to the nearest cent")
if (formatCurrency(2000.5) === '20.01'){
  console.log('passed');
} else {
  console.log('failed');
}

console.log("Rounds up to the nearest cent")
if (formatCurrency(2000.4) === '20.00'){
  console.log('passed');
} else {
  console.log('failed');
}

console.log("Rounds up to the nearest cent")
if (formatCurrency(2000.6) === '20.01'){
  console.log('passed');
} else {
  console.log('failed');
}

console.log("Test negative number")
if (formatCurrency(-100) === '-1.00'){
  console.log('passed');
} else {
  console.log('failed');
}