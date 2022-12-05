// // Importing module
// import {
//   addToCart,
//   totalPrice as price, // renaming the imports
//   quantity, // renaming the imports
// } from './shoppingCart.js';

// //////+++++++++++++++++++++++++++++++++++++++++//////

// // importing every thing from the module
// // importing whole is done as a class and name is Capital
// import * as ShoppingCart from './shoppingCart.js';

// //////+++++++++++++++++++++++++++++++++++++++++//////

// // when we import the values from the default export of a module
// // we import it like this
import add from './shoppingCart.js';

// //////+++++++++++++++++++++++++++++++++++++++++//////

// // showing the live importing from the modules
// // we are importing an empty array from the cart
// // imports are not copy of the things in the modules
// // they are rather the live connection to the modules
import { cart } from './shoppingCart.js';

// //////+++++++++++++++++++++++++++++++++++++++++//////

// //////********************************//////

// console.log('Importing module');
// addToCart(20, 'Halwa');
// console.log(price, quantity);

// //////********************************//////

// console.log(ShoppingCart.quantity);
// console.log(ShoppingCart.totalPrice);

// //////********************************//////

add(200, 'Kesar Pista');
add(300, 'Dum Biryani');
add(500, 'Pista Badam');

// //////+++++++++++++++++++++++++++++++++++++++++//////

add(400, 'American Nuts');
add(300, 'Dum Biryani');
add(500, 'Pista Badam');

// // we exported an empty array but got a full array
console.log(cart);

///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////

// Importing from the lodash-es library that uses es-6 export import version
import cloneDeep from './node_modules/lodash-es/cloneDeep.js';

const state = {
  cart: [
    {
      product: 'Bread',
      price: 32,
      quantity: 5,
    },
    {
      product: 'Pizza',
      price: 300,
      quantity: 3,
    },
  ],
  user: { loggedIn: true },
};

const stateClone = Object.assign({}, state);
const stateCloneDepp = cloneDeep(state);
state.user.loggedIn = false;
console.log(stateClone);
console.log(stateCloneDepp);
