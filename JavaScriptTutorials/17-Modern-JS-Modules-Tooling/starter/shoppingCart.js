// Exporting Module
console.log('Exporting Module');

const shippingCost = 10;

// to show live importing we are exporting the cart
export const cart = [];

// named exports
export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} X ${product} , added to the cart`);
};

// export multiple things using named export
const totalPrice = 100;
const totalQuantity = 200;

// renaming the exports
export { totalPrice, totalQuantity as quantity };

// when we have to export one thing from the module by default
// we export the value itself rather than exporting a variable
export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} X ${product} , added to the cart`);
}

//Common Js Module System , i.e. used int the Nodejs
/*

// when we have to export something
export.addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} X ${product} , added to the cart`);
};

//when we have to import something
const { addToCart } = require('./shoppingCart.js');

*/
