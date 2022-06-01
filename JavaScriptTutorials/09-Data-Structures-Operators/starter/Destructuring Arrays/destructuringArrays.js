"use strict";
// console.log("working");

const restaurant = {
  name: "Classico Italiano",
  location: "Via Angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
};

const arr = [2, 3, 4];
const a = arr[0];
const b = arr[1];
const c = arr[2];

const [x, y, z] = arr; //destructuring the arrays
console.log(x, y, z);
console.log(arr);

let [primary, , secondary] = restaurant.categories;
console.log(primary, secondary);

//swapping the variables without usind destructuring
// const temp= main;
// main = secondary;
// secondary=temp;

//swapping the variables using the destructuring
[primary, secondary] = [secondary, primary];
console.log(primary, secondary);

//Using destruction to make function return more then one value
const [starter, main] = restaurant.order(2, 0);
console.log(starter, main);

//destruction in nesting arrays and nested destructuring
const nested = [2, 4, [5, 6]];
// const [i, , j] = nested;
// console.log(i, j);
const [m, , [fl, ll]] = nested;
console.log(m, fl, ll);

//default values when the arrays are shorter then expecting
const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r);
